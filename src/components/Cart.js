import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuantityCounter from "./QuantityCounter";
import Loading from "./Loading";
import useMyCart from "../hooks/useMyCart";
import styled from "styled-components";
import { instance } from "../utils/http-client";

const Cart = () => {
  const [chkId, setChkId] = useState("");
  const [allChecked, setAllChecked] = useState(true);

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

  const onRemove = async (e) => {
    const targetName = e.target.name;

    await instance
      .delete(`/v1/me/cart/items/${targetName}`)
      .then(function (response) {
        console.log(response);

        mutateCart(null, true);
      });
  };

  const handleQuantity = async (itemId, quantity) => {
    try {
      await updateQuantityApi(itemId, quantity);
      mutateCart(
        {
          ...cart,
          items: items.map((cartItem, index) => ({
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

  function updateQuantityApi(itemId, quantity) {
    return instance.patch(`/v1/me/cart/items/${itemId}/quantity`, {
      quantity: quantity,
    });
  }

  const checkedItems = cart.items.filter((item) => item.checked);
  const numCheckedTotalItem = checkedItems.length;
  const totalPrice = checkedItems
    .map((item) => item.variant_price * item.quantity)
    .reduce((sum, itemPrice) => sum + itemPrice, 0);

  if (totalPrice < 70000) {
    localStorage.setItem("delivery", 3000);
  } else {
    localStorage.setItem("delivery", 0);
  }

  if (totalPrice === 0) {
    localStorage.setItem("delivery", 0);
  }

  const deliveryCharge = localStorage.getItem("delivery");
  const finalPrice = totalPrice + Number(deliveryCharge);

  const handleCartItemAllCheck = (allChecked) => {
    mutateCart(
      {
        ...cart,
        items: items.map((item) => {
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

  const handleCartItemCheck = (cartItemIndex) => {
    const newCart = {
      ...cart,
      items: items.map((cartItem, index) => ({
        ...cartItem,
        checked: cartItemIndex === index ? !cartItem.checked : cartItem.checked,
      })),
    };

    mutateCart(newCart, false);
    const isSomeUnchecked =
      newCart.items.filter((item) => !item.checked).length > 0;
    if (isSomeUnchecked) {
      setAllChecked(false);
    }

    const isAllChecked =
      newCart.items.filter((item) => item.checked).length ===
      newCart.items.length;
    if (isAllChecked) {
      setAllChecked(true);
    }
  };

  const handleBuyBtnClick = (item, quantity) => {
    const checkedLineItems = cart.items
      .filter((item) => item.checked)
      .map((item) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
      }));
    console.log("큰 구매버튼 클릭 ", checkedLineItems);

    instance
      .post("/v1/checkouts", {
        line_items: checkedLineItems,
      })
      .then(function (response) {
        setChkId(response.data.checkout_id);
        window.location.replace(`/checkout/${response.data.checkout_id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleListBuyBtnClick = (item, quantity) => {
    console.log("작은 구매버튼 클릭");

    if (item.variant_price * item.quantity < 70000) {
      localStorage.setItem("delivery", 3000);
    } else {
      localStorage.setItem("delivery", 0);
    }

    instance
      .post("/v1/checkouts", {
        line_items: [
          {
            variant_id: item.variant_id,
            quantity: quantity,
          },
        ],
      })
      .then(function (response) {
        window.location.replace(`/checkout/${response.data.checkout_id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChoiceItemRemove = () => {
    const chkItems = cart.items.filter((item) => item.checked);
    console.log(chkItems);

    for (let i = 0; i < chkItems.length; i++) {
      let cartItemId = chkItems[i].id;

      instance
        .delete(`/v1/me/cart/items/${cartItemId}`)
        .then(function (response) {
          console.log(response);
          mutateCart(null, true);
        });
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
            <li style={cartEmpty}>장바구니가 비었습니다.</li>
          ) : (
            items.map((item, idx) => {
              return (
                <li className="item" key={item.id}>
                  <div className="item_select">
                    <input
                      type="checkbox"
                      name="item_checkbox"
                      className="item_checkbox"
                      checked={item.checked}
                      onChange={() => handleCartItemCheck(idx)}
                    />
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
                    >
                      <img
                        className="cart_item_img"
                        alt=""
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
              {items.filter((item) => item.checked).length}
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

const cartEmpty = {
  height: "200px",
  border: "none",
  fontSize: "25px",
  fontWeight: "bold",
  textAlign: "center",
  lineHeight: "200px",
  color: "rgb(97, 95, 95)",
};

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
