import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import styled from "styled-components";
import QuantityCounter from "components/common/QuantityCounter";
import Loading from "components/common/Loading";
import useMyCart from "hooks/useMyCart";
import { instance } from "utils/http-client";
import {
  deleteCartItemApi,
  updateCartItemQuantityApi,
  createCheckoutsApi,
} from "api";

const Cart = () => {
  const [chkId, setChkId] = useState("");
  const [allChecked, setAllChecked] = useState<boolean>(true);
  const history = useHistory();

  const { cart, loadingCart, cartError, mutateCart } = useMyCart();

  if (cartError)
    return (
      <CartErrorMessage>
        로그인 후 이용해주세요!
        <Link to="/login" style={linkStyle}>
          로그인
        </Link>
      </CartErrorMessage>
    );
  if (loadingCart) return <Loading />;

  const items = cart.items;

  const onRemove = async (e: any) => {
    const cartItemId = e.target.name;

    try {
      const res = await deleteCartItemApi({ cartItemId });
      console.log(res);
      mutateCart(null, true);
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
          items: items.map((cartItem: any, index: number) => ({
            ...cartItem,
            quantity: cartItem.id === itemId ? quantity : cartItem.quantity,
          })),
        },
        false
      );
    } catch (error) {
      console.log(error);
    }
  };

  const checkedItems = cart.items.filter((item: any) => item.checked);
  const numCheckedTotalItem = checkedItems.length;
  const totalPrice = checkedItems
    .map((item: any) => item.variant_price * item.quantity)
    .reduce((sum: any, itemPrice: any) => sum + itemPrice, 0);

  if (totalPrice < 70000) {
    localStorage.setItem("delivery", "3000");
  } else {
    localStorage.setItem("delivery", "0");
  }

  if (totalPrice === 0) {
    localStorage.setItem("delivery", "0");
  }

  const deliveryCharge: any = localStorage.getItem("delivery");
  const finalPrice = totalPrice + Number(deliveryCharge);

  const handleCartItemAllCheck = (allChecked: boolean) => {
    mutateCart(
      {
        ...cart,
        items: items.map((item: any) => {
          const newItem = { ...item };
          newItem.checked = !allChecked;

          return newItem;
        }),
      },
      false
    );
  };

  const handleCheck = () => {
    handleCartItemAllCheck(allChecked);
    setAllChecked((value) => !value);
  };

  const handleCartItemCheck = (cartItemIndex: any) => {
    const newCart = {
      ...cart,
      items: items.map((cartItem: any, index: number) => ({
        ...cartItem,
        checked: cartItemIndex === index ? !cartItem.checked : cartItem.checked,
      })),
    };

    mutateCart(newCart, false);
    const isSomeUnchecked =
      newCart.items.filter((item: any) => !item.checked).length > 0;
    if (isSomeUnchecked) {
      setAllChecked(false);
    }

    const isAllChecked =
      newCart.items.filter((item: any) => item.checked).length ===
      newCart.items.length;
    if (isAllChecked) {
      setAllChecked(true);
    }
  };

  const handleBuyBtnClick = async () => {
    const checkedLineItems = cart.items
      .filter((item: any) => item.checked)
      .map((item: any) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
      }));
    console.log("큰 구매버튼 클릭 ", checkedLineItems);

    try {
      const res = await createCheckoutsApi({
        lineItems: checkedLineItems,
      });
      setChkId(res.data.checkout_id);
      history.push(`/checkout/${res.data.checkout_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleListBuyBtnClick = async (item: any, quantity: any) => {
    console.log("작은 구매버튼 클릭");

    if (item.variant_price * item.quantity < 70000) {
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
      history.push(`/checkout/${res.data.checkout_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoiceItemRemove = async () => {
    const chkItems = cart.items.filter((item: any) => item.checked);
    console.log(chkItems);

    for (let i = 0; i < chkItems.length; i++) {
      let cartItemId: number = chkItems[i].id;

      try {
        const res = await deleteCartItemApi({ cartItemId });
        console.log(res);
        mutateCart(null, true);
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
                onChange={handleCheck}
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
              onClick={handleChoiceItemRemove}
            />
          </div>
        </div>

        <ul className="item_group">
          {items.length < 1 ? (
            <CartEmpty>장바구니가 비었습니다.</CartEmpty>
          ) : (
            items.map((item: any, idx: number) => {
              return (
                <li className="item" key={item.id}>
                  <div className="item_select">
                    <>
                      <input
                        type="checkbox"
                        name="item_checkbox"
                        id={`itemCheckbox${item.product_id}`}
                        className="item_checkbox"
                        checked={item.checked}
                        onChange={() => handleCartItemCheck(idx)}
                      />
                      <label
                        htmlFor={`itemCheckbox${item.product_id}`}
                        className="visually_hidden"
                      >{`${item.product_name} 선택`}</label>
                    </>
                    <input
                      type="button"
                      value="삭제"
                      className="item_remove"
                      key={item.id}
                      name={item.id}
                      onClick={onRemove}
                    />
                  </div>

                  <div className="info_wrap">
                    <Link
                      to={`/products/${item.product_id}`}
                      className="info_img_box"
                      aria-label={`${item.product_name} 상품 페이지로 이동`}
                    >
                      <img
                        className="cart_item_img"
                        alt={`${item.product_name}_이미지`}
                        src={item.product_image_src}
                      />
                    </Link>
                    <div className="info_box">
                      <div className="info_text">
                        <p className="goods itemName">{item.product_name}</p>
                      </div>

                      <div className="info_text">
                        <p className="price_area">
                          <span className="price_zone">
                            {item.variant_price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                            {(item.variant_price * item.quantity)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              {items.filter((item: any) => item.checked).length}
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
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              {deliveryCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              {finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
    line-height: 250px;
    max-height: calc(100vh - 808px);
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

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 25px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 30px;
  }
`;

const linkStyle = {
  background: "linear-gradient(to left bottom, #efefef, #333)",
  color: "transparent",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  height: "100px",
  margin: "0 auto",
  fontSize: "20px",
  lineHeight: "20px",
  textDecoration: "none",
};
