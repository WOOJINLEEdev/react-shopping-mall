import { MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import useMyCart from "hooks/api/useMyCart";
import { getSizedImageUrl } from "utils/image";
import { formatPrice } from "utils/money";
import {
  deleteCartItemApi,
  updateCartItemQuantityApi,
  createCheckoutsApi,
} from "api";

import QuantityCounter from "components/common/QuantityCounter";
import Loading from "components/common/Loading";
import SnackBar from "components/common/SnackBar";

interface IItem {
  cart_id: number;
  checked: boolean;
  id: number;
  product_id: number;
  product_image_src: string;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
  variant_price: string;
}

const SOURCE_LIST = [
  { id: "0", media: "(max-width:849px)", size: "_150x200.jpg" },
  { id: "1", media: "(min-width:850px)", size: "_200x200.jpg" },
];

const Cart = () => {
  const [chkId, setChkId] = useState<string>("");
  const [allChecked, setAllChecked] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  const message = "선택하신 상품이 삭제되었습니다.";

  const navigate = useNavigate();
  const { cart, loadingCart, cartError, mutateCart } = useMyCart();

  if (cartError)
    return (
      <CartErrorMessage>
        로그인 후 이용해주세요!
        <Link to="/login" className="login_link">
          로그인
        </Link>
      </CartErrorMessage>
    );
  if (loadingCart) return <Loading />;

  const items = cart.items;

  const handleItemRemoveBtnClick = async (e: MouseEvent<HTMLInputElement>) => {
    const cartItemId = Number((e.currentTarget as HTMLInputElement).name);

    try {
      await deleteCartItemApi({ cartItemId });
      mutateCart(null, true);
      setOpen((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuantity = async (itemId: number, quantity: number) => {
    try {
      await updateCartItemQuantityApi({ itemId, quantity });
      mutateCart(
        {
          ...cart,
          items: items.map((cartItem: IItem) => ({
            ...cartItem,
            quantity: cartItem.id === itemId ? quantity : cartItem.quantity,
          })),
        },
        false
      );
    } catch (err) {
      console.log(err);
    }
  };

  const checkedItems = cart.items.filter((item: IItem) => item.checked);
  const numCheckedTotalItem = checkedItems.length;
  const totalPrice = checkedItems
    .map((item: IItem) => Number(item.variant_price) * item.quantity)
    .reduce((sum: number, itemPrice: number) => sum + itemPrice, 0);

  if (totalPrice < 70000) {
    localStorage.setItem("delivery", "3000");
  } else {
    localStorage.setItem("delivery", "0");
  }

  if (totalPrice === 0) {
    localStorage.setItem("delivery", "0");
  }

  const deliveryCharge = localStorage.getItem("delivery") || "";
  const finalPrice = totalPrice + Number(deliveryCharge);

  const handleCartItemAllCheck = (allChecked: boolean) => {
    mutateCart(
      {
        ...cart,
        items: items.map((item: IItem) => {
          const newItem = { ...item };
          newItem.checked = !allChecked;

          return newItem;
        }),
      },
      false
    );
  };

  const handleAllCheckChange = () => {
    handleCartItemAllCheck(allChecked);
    setAllChecked((value) => !value);
  };

  const handleCartItemCheck = (cartItemIndex: number) => {
    const newCart = {
      ...cart,
      items: items.map((cartItem: IItem, index: number) => ({
        ...cartItem,
        checked: cartItemIndex === index ? !cartItem.checked : cartItem.checked,
      })),
    };

    mutateCart(newCart, false);
    const isSomeUnchecked =
      newCart.items.filter((item: IItem) => !item.checked).length > 0;
    if (isSomeUnchecked) {
      setAllChecked(false);
    }

    const isAllChecked =
      newCart.items.filter((item: IItem) => item.checked).length ===
      newCart.items.length;
    if (isAllChecked) {
      setAllChecked(true);
    }
  };

  const handleBuyBtnClick = async () => {
    const checkedLineItems = cart.items
      .filter((item: IItem) => item.checked)
      .map((item: IItem) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
      }));

    try {
      const res = await createCheckoutsApi({
        lineItems: checkedLineItems,
      });
      setChkId(res.data.checkout_id);
      navigate(`/checkout/${res.data.checkout_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleListBuyBtnClick = async (item: IItem, quantity: number) => {
    if (Number(item.variant_price) * item.quantity < 70000) {
      localStorage.setItem("delivery", "3000");
    } else {
      localStorage.setItem("delivery", "0");
    }

    try {
      const res = await createCheckoutsApi({
        lineItems: [
          {
            variant_id: item.variant_id,
            quantity: quantity,
          },
        ],
      });
      navigate(`/checkout/${res.data.checkout_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoiceItemRemoveBtnClick = async () => {
    const chkItems = cart.items.filter((item: IItem) => item.checked);

    for (const chkItem of chkItems) {
      let cartItemId: number = chkItem.id;

      try {
        await deleteCartItemApi({ cartItemId });
        mutateCart(null, true);
        setAllChecked(true);
        setOpen((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="order_info">
      <div className="order_item_info">
        <div className="info_title">
          <h2 className="info_head orderInfo">
            ■ 주문상품 정보 / 총 <span className="total">{items.length}</span>개
          </h2>
          <div className="info_allCheck">
            <div className="allCheck_wrap">
              <input
                type="checkbox"
                name="allCheck"
                id="allCheck"
                className="check_all"
                onChange={handleAllCheckChange}
                checked={allChecked}
              />
              <label htmlFor="allCheck" className="allCheck_text">
                전체 선택
              </label>
            </div>
            <input
              type="button"
              className="choice_item_remove_btn"
              value="선택 삭제"
              onClick={handleChoiceItemRemoveBtnClick}
            />
          </div>
        </div>

        <ul className="item_group">
          {items.length < 1 ? (
            <CartEmpty>장바구니가 비었습니다.</CartEmpty>
          ) : (
            items.map((item: IItem, index: number) => {
              return (
                <li className="item" key={item.id}>
                  <div className="item_select">
                    <>
                      <input
                        type="checkbox"
                        name="item_checkbox"
                        id={`itemCheckbox${item.product_id}`}
                        className="item_checkbox"
                        value={item.product_name}
                        checked={item.checked}
                        onChange={() => handleCartItemCheck(index)}
                      />
                      <label
                        htmlFor={`itemCheckbox${item.product_id}`}
                        className="visually_hidden"
                      >{`${item.product_name} 선택`}</label>
                    </>
                    <input
                      type="button"
                      value="삭제"
                      className="item_remove_btn"
                      key={item.id}
                      name={item.id.toString()}
                      onClick={handleItemRemoveBtnClick}
                    />
                  </div>

                  <div className="info_wrap">
                    <Link
                      to={`/products/${item.product_id}`}
                      className="info_img_box"
                      aria-label={`${item.product_name} 상품 페이지로 이동`}
                    >
                      <picture className="cart_item_picture">
                        {SOURCE_LIST.map((cartItem) => {
                          return (
                            <source
                              key={`cart_item_picture_${cartItem.id}`}
                              media={cartItem.media}
                              srcSet={getSizedImageUrl(
                                item.product_image_src,
                                cartItem.size
                              )}
                            />
                          );
                        })}
                        <img
                          className="cart_item_img"
                          src={getSizedImageUrl(
                            item.product_image_src,
                            "_200x200.jpg"
                          )}
                          alt={`${item.product_name}_상품 이미지`}
                        />
                      </picture>
                    </Link>
                    <div className="info_box">
                      <div className="info_text">
                        <p className="goods itemName">{item.product_name}</p>
                      </div>

                      <div className="info_text">
                        <p className="price_area">
                          <span className="price_zone">
                            {formatPrice(item.variant_price.toString())}
                          </span>
                          원
                        </p>
                      </div>

                      <div className="info_text">
                        <p className="goods option">
                          옵션 :
                          <span className="option_zone">
                            {item.variant_name}
                          </span>
                        </p>
                      </div>

                      <div className="info_text priceAndQuantity">
                        <QuantityCounter
                          flexEnd={false}
                          quantity={item.quantity}
                          productId={item.product_id}
                          onIncrement={() =>
                            handleQuantity(item.id, item.quantity + 1)
                          }
                          onDecrement={() =>
                            handleQuantity(item.id, item.quantity - 1)
                          }
                        />

                        <div>
                          <span className="item_price_qty">
                            {formatPrice(
                              (
                                Number(item.variant_price) * item.quantity
                              ).toString()
                            )}
                            원
                          </span>
                        </div>
                        <button
                          type="button"
                          className="list_buy_btn"
                          onClick={() =>
                            handleListBuyBtnClick(item, item.quantity)
                          }
                        >
                          BUY NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>

      <div className="detail_wrap">
        <div className="detail_box">
          <div className="label_box">
            <label htmlFor="totalQty">주문 상품 수</label>
          </div>
          <p className="price_unit">
            <span className="total_qty" id="totalQty">
              {items.filter((item: IItem) => item.checked).length}
            </span>
            개
          </p>
        </div>

        <div className="detail_box">
          <div className="label_box">
            <label htmlFor="totalPrice">총 주문금액</label>
          </div>
          <p className="price_unit">
            <span className="total_price_zone" id="totalPrice">
              {formatPrice(totalPrice.toString())}
            </span>
            원
          </p>
        </div>

        <div className="detail_box">
          <div className="label_box">
            <label htmlFor="deliveryCharge">배송비</label>
          </div>
          <p className="price_unit">
            <span className="delivery_charge_zone" id="deliveryCharge">
              {formatPrice(deliveryCharge)}
            </span>
            원
          </p>
        </div>

        <div className="detail_box">
          <div className="label_box">
            <label className="final_price" htmlFor="finalPrice">
              총 결제금액
            </label>
          </div>
          <p className="price_unit final">
            <span className="final_price_zone" id="finalPrice">
              {formatPrice(finalPrice.toString())}
            </span>
            원
          </p>
        </div>
      </div>

      <div className="order_check"></div>

      {numCheckedTotalItem >= 1 ? (
        <button type="button" className="buy_btn" onClick={handleBuyBtnClick}>
          BUY NOW
        </button>
      ) : (
        <button
          type="button"
          className="buy_btn"
          style={{ backgroundColor: "rgb(230, 230, 230)" }}
          disabled
        >
          BUY NOW
        </button>
      )}
      <SnackBar
        open={open}
        autoHideDuration={3000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </section>
  );
};

export default Cart;

const CartEmpty = styled.li`
  min-height: 300px;
  line-height: 300px;
  border: 0;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: rgb(97, 95, 95);

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    min-height: 200px;
    line-height: 200px;
    font-size: 18px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    min-height: 250px;
    max-height: calc(100vh - 808px);
    line-height: 250px;
  }
`;

const CartErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right bottom, #efefef, #333);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  width: 100%;
  height: 600px;
  align-items: center;
  text-align: center;
  line-height: 300px;
  font-size: 40px;
  font-weight: bold;
  margin: 0 auto;
  text-decoration: none;

  & .login_link {
    height: 100px;
    margin: 0 auto;
    line-height: 20px;
    font-size: 20px;
    color: transparent;
    background: linear-gradient(to left bottom, #efefef, #333);
    background-clip: text;
    -webkit-background-clip: text;
    text-decoration: none;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 25px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 30px;
  }
`;
