import React, { useState } from "react";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import QuantityCounter from "components/common/QuantityCounter";
import Loading from "components/common/Loading";
import CommonModal from "components/common/CommonModal";
import { instance } from "utils/http-client";
import useMyCart from "hooks/useMyCart";
import useTokenStatus from "hooks/useTokenStatus";
import { addToCartApi } from "api/";

const ItemDetail = ({ match }) => {
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [itemOption, setItemOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] =
    useState("장바구니에 상품이 추가되었습니다.");
  const [btnText1, setBtnText1] = useState("장바구니 이동");
  const [btnText2, setBtnText2] = useState("쇼핑 계속하기");
  const [btnWidth, setBtnWidth] = useState("40%");
  const [contentPadding, setContentPadding] = useState("50px 0");

  const url = `/v1/products/${match.params.productId}`;
  const fetcher = (url) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error } = useSWR(url, fetcher);
  const { cart, loadingCart, cartError, mutateCart } = useMyCart();
  const { token, mutateToken } = useTokenStatus();

  if (error) return "에러 발생";
  if (!data) return <Loading />;

  if (loadingCart) return <Loading />;
  if (cartError) return <div>에러 발생...</div>;

  const selectOptions = data.variants;

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      setItemOption("");
    }

    selectOptions.map((variant) => {
      if (e.target.value === variant.name) {
        console.log(variant.id);
        setItemOption(variant.id);
        return variant.id;
      }
    });
  };

  async function putItem() {
    console.log("장바구니 버튼 클릭");

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
      console.log(res);
      setIsOpen(true);
    } catch (err) {
      console.log(error);
    }
  }

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const yesOrNo = (e) => {
    if (e.target.name === "yes") {
      console.log("yes");
      mutateCart(null, true);
      history.push("/cart");
    } else {
      console.log("no");
      mutateCart(null, true);
      setIsOpen(false);
    }
  };

  const itemCheckout = () => {
    console.log("구매하기 버튼 클릭");

    if (!token) {
      return alert("로그인 후 이용해주세요!");
    }

    if (itemOption === "") {
      return alert("옵션을 선택해주세요.");
    }

    if (data.variants[0].price * quantity >= 70000) {
      localStorage.setItem("delivery", 0);
    }

    if (data.variants[0].price * quantity < 70000) {
      localStorage.setItem("delivery", 3000);
    }

    instance
      .post("/v1/checkouts", {
        line_items: [
          {
            variant_id: itemOption,
            quantity: quantity,
          },
        ],
      })
      .then(function (response) {
        history.push(`/checkout/${response.data.checkout_id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="list_element_detail">
      <CommonModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        modalText={modalText}
        btnText1={btnText1}
        btnText2={btnText2}
        btnClick1={yesOrNo}
        btnClick2={yesOrNo}
        btnWidth={btnWidth}
        contentPadding={contentPadding}
      />
      <div className="image_wrapper">
        <img className="image" alt="" src={data.images[0].src} />
      </div>

      <div className="image_text_wrap" id="imageTextWrap">
        <table className="list_table">
          <colgroup>
            <col className="col_width" />
            <col className="col_width" />
          </colgroup>
          <thead>
            <tr>
              <th className="thead_th" colSpan="2" id="imageTextHead">
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
                  {selectOptions.map((option, i) => (
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
