import { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";

import useMyCart from "hooks/useMyCart";
import useTokenStatus from "hooks/useTokenStatus";
import { instance } from "utils/http-client";
import { getSizedImageUrl } from "utils/image";
import { addToCartApi, createCheckoutsApi } from "api";

import Loading from "components/common/Loading";
import CommonModal from "components/common/CommonModal";
import QuantityCounter from "components/common/QuantityCounter";

interface Option {
  id: number;
  name: string;
  option1?: string;
  option2?: string;
  option3?: string;
  price: string;
  product_id: number;
}

const SOURCE_LIST = [
  {
    id: "0",
    media: "(max-width: 440px)",
    size: "_400x300.jpg",
  },
  {
    id: "1",
    media: "(max-width: 767px)",
    size: "_500x300.jpg",
  },
  {
    id: "2",
    media: "(max-width: 1016px)",
    size: "_400x300.jpg",
  },
];

const ItemDetail = () => {
  const navigate = useNavigate();
  const matchParams = useParams();

  const [quantity, setQuantity] = useState<number>(1);
  const [itemOption, setItemOption] = useState<number | string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [onOverlayClick, setOnOverlayClick] = useState<boolean>(false);
  const [onEsc, setOnEsc] = useState<boolean>(false);

  const modalText = "장바구니에 상품이 추가되었습니다.";
  const yesBtnText = "장바구니 이동";
  const noBtnText = "쇼핑 계속하기";
  const btnWidth = "40%";
  const contentPadding = "50px 0";

  const productUrl = `/v1/products/${matchParams.productId}`;
  const fetcher = (url: string) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error } = useSWR(productUrl, fetcher);
  const { loadingCart, cartError, mutateCart } = useMyCart();
  const { token } = useTokenStatus();

  if (error) return <div>에러 발생...</div>;
  if (!data) return <Loading />;

  if (loadingCart) return <Loading />;
  if (cartError) return <div>에러 발생...</div>;

  const selectOptions = data.variants;

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      setItemOption("");
    }

    selectOptions.map((variant: Option) => {
      if (e.target.value === variant.name) {
        setItemOption(variant.id);
        return variant.id;
      }
    });
  };

  async function putItem() {
    if (!token) {
      return alert("로그인 후 이용해주세요!");
    }

    if (itemOption === "") {
      return alert("옵션을 선택해주세요.");
    }

    try {
      const res = await addToCartApi({
        items: [
          {
            product_id: data.id,
            variant_id: itemOption,
            quantity: quantity,
          },
        ],
      });
      mutateCart(res.data, false);
      setIsOpen(true);
    } catch (err) {
      console.log(err);
    }
  }

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const handleModalBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLButtonElement).name === "yes") {
      navigate("/cart");
    } else {
      setIsOpen(false);
    }
  };

  const itemCheckout = async () => {
    if (!token) {
      return alert("로그인 후 이용해주세요!");
    }

    if (itemOption === "") {
      return alert("옵션을 선택해주세요.");
    }

    if (data.variants[0].price * quantity >= 70000) {
      localStorage.setItem("delivery", "0");
    }

    if (data.variants[0].price * quantity < 70000) {
      localStorage.setItem("delivery", "3000");
    }

    try {
      const res = await createCheckoutsApi({
        lineItems: [
          {
            variant_id: itemOption,
            quantity: quantity,
          },
        ],
      });
      navigate(`/checkout/${res.data.checkout_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="list_element_detail">
      <CommonModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        modalText={modalText}
        yesBtnText={yesBtnText}
        noBtnText={noBtnText}
        yesBtnClick={handleModalBtnClick}
        noBtnClick={handleModalBtnClick}
        btnWidth={btnWidth}
        contentPadding={contentPadding}
        onOverlayClick={onOverlayClick}
        onEsc={onEsc}
      />
      <div className="image_wrapper">
        <picture className="image_picture">
          {SOURCE_LIST.map((item) => {
            return (
              <source
                key={`item_detail_${item.id}`}
                media={item.media}
                srcSet={getSizedImageUrl(data.images[0].src, item.size)}
              />
            );
          })}
          <img
            className="image"
            src={getSizedImageUrl(data.images[0].src, "_400x300.jpg")}
            alt={`${data.name}_상품 이미지`}
          />
        </picture>
      </div>

      <div className="image_text_wrap" id="imageTextWrap">
        <table className="list_table">
          <colgroup>
            <col className="col_width" />
            <col className="col_width" />
          </colgroup>
          <thead>
            <tr>
              <th className="thead_th" colSpan={2} id="imageTextHead">
                {data.name}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="tbody_th">Price</th>
              <td className="tbody_td">
                <span id="imageTextBody">
                  {data.variants[0].price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                원
              </td>
            </tr>
            <tr>
              <th className="tbody_th">size</th>
              <td className="tbody_td">
                <select className="td_select" onChange={handleSelectChange}>
                  <option value="">- [필수] 옵션을 선택해주세요 -</option>
                  {selectOptions.map((option: Option) => (
                    <option key={option.option1}>{option.option1}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="tbody_td_qty">
                <QuantityCounter
                  margin
                  flexEnd={false}
                  quantity={quantity}
                  onIncrement={() => setQuantity((qty) => qty + 1)}
                  onDecrement={() => setQuantity((qty) => qty - 1)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <table className="list_btn_table">
          <tbody>
            <tr>
              <td className="btn_td">
                <input
                  type="button"
                  className="list_btn cart"
                  value="장바구니"
                  onClick={putItem}
                />
              </td>
              <td className="btn_td">
                <input
                  type="button"
                  className="list_btn buy"
                  value="구매하기"
                  onClick={itemCheckout}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemDetail;
