import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import QuantityCounter from "./QuantityCounter";
import Loading from "./Loading";
import useMyCart from "../Hooks/useMyCart";

const Cart = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [allChecked, setAllChecked] = useState(true);
  // const [checkList, setCheckList] = useState(false);
  // const [listId, setListId] = useState([]);

  const { cart, loadingCart, cartError, mutateCart } = useMyCart();
  console.log("swr cart:", cart);

  const errorMsgStyle = {
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(to right top, #861657, #ffa69e)",
    color: "transparent",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    width: "100%",
    height: "500px",
    alignItems: "center",
    textAlign: "center",
    lineHeight: "300px",
    fontSize: "40px",
    fontWeight: "bold",
    margin: "0 auto",
    textDecoration: "none",
  };

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

  if (cartError)
    return (
      <div style={errorMsgStyle}>
        <p style={{ display: "inline-block" }}>로그인 후 이용해주세요.</p>
        <Link to="/login" style={linkStyle}>
          로그인
        </Link>
      </div>
    );
  if (loadingCart) return <Loading />;

  const items = cart.items;

  const onRemove = async (e) => {
    const targetName = e.target.name;

    await axios
      .delete(`http://localhost:8282/v1/me/cart/items/${targetName}`, config)
      .then(function (response) {
        console.log(response);
        window.location.replace("/cart");
      });
  };

  const cartEmpty = {
    height: "200px",
    border: "none",
    fontSize: "25px",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "200px",
    color: "rgb(97, 95, 95)",
  };

  // const requestUpdateQuantity = (quantity) => {
  //   return quantity + 1;
  // };

  const handleQuantityIncrement = async (cartItemIndex) => {
    mutateCart(
      {
        ...cart,
        items: items.map((cartItem, index) => ({
          ...cartItem,
          quantity:
            cartItemIndex === index ? cartItem.quantity + 1 : cartItem.quantity,
        })),
      },
      false
    );
  };

  const handleQuantityDecrement = async (cartItemIndex) => {
    mutateCart(
      {
        ...cart,
        items: items.map((cartItem, index) => ({
          ...cartItem,
          quantity:
            cartItemIndex === index ? cartItem.quantity - 1 : cartItem.quantity,
        })),
      },
      false
    );
  };

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

  return (
    <section className="order_info">
      <div className="order_item_info">
        <div className="info_title">
          <h2 className="info_head orderInfo">
            ■ 주문상품 정보 / 총 <span className="total">{items.length}</span>개
          </h2>
          <div className="info_allCheck">
            <input
              type="checkbox"
              name="allCheck"
              className="check_all"
              onChange={handleCheck}
              checked={allChecked}
            />
            <span className="allCheck_text">전체 선택</span>
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
                          onIncrement={() => handleQuantityIncrement(idx)}
                          onDecrement={() => handleQuantityDecrement(idx)}
                        />

                        <div>
                          <span className="item_price_qty">
                            {(item.variant_price * item.quantity)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            원
                          </span>
                        </div>
                        <button type="button" className="list_buy_btn">
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
            <label>주문 상품 수</label>
          </div>
          <p className="price_unit">
            <span className="total_qty">
              {items.filter((item) => item.checked).length}
            </span>
            개
          </p>
        </div>

        <div className="detail_box">
          <div className="label_box">
            <label>총 주문금액</label>
          </div>
          <p className="price_unit">
            <span className="total_price_zone">
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            원
          </p>
        </div>

        <div className="detail_box">
          <div className="label_box">
            <label>배송비</label>
          </div>
          <p className="price_unit">
            <span className="delivery_charge_zone">
              {deliveryCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            원
          </p>
        </div>

        <div className="detail_box">
          <div className="label_box">
            <label className="final_price">총 결제금액</label>
          </div>
          <p className="price_unit final">
            <span className="final_price_zone">
              {finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            원
          </p>
        </div>
      </div>

      <div className="order_check"></div>

      {numCheckedTotalItem >= 1 ? (
        <button
          type="button"
          className="buy_btn"
          onClick={() => history.push("/order")}
        >
          BUY NOW
        </button>
      ) : (
        <button
          type="button"
          className="buy_btn"
          style={{ backgroundColor: "rgb(230, 230, 230)" }}
          disalbed
        >
          BUY NOW
        </button>
      )}
    </section>
  );
};

export default Cart;
