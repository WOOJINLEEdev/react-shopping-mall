import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import QuantityCounter from "./QuantityCounter";
import Loading from "./Loading";
import useMyCart from "../Hooks/useMyCart";
import styled from "styled-components";
import useCheckout from "../Hooks/useCheckout";

const Cart = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [chkId, setChkId] = useState("");
  const [allChecked, setAllChecked] = useState(true);
  // const [checkList, setCheckList] = useState(false);
  // const [listId, setListId] = useState([]);

  const checkoutNumber = chkId;
  const { checkoutData, loadingCheckout, checkoutError, mutateCheckout } =
    useCheckout(checkoutNumber);

  // if (checkoutError) return <div>failed to load...</div>;
  // if (loadingCheckout) return <div>loading...</div>;

  const { cart, loadingCart, cartError, mutateCart } = useMyCart();
  console.log("swr cart:", cart);

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

  const handleQuantityIncrement = (itemId, quantity) => {
    axios
      .patch(
        `http://localhost:8282/v1/me/cart/items/${itemId}/quantity`,
        {
          quantity: quantity + 1,
        },
        config
      )
      .then(function (response) {
        console.log(response);
        console.log("수량 증가");
        mutateCart(
          {
            ...cart,
            items: items.map((cartItem, index) => ({
              ...cartItem,
              quantity:
                cartItem.id === itemId ? quantity + 1 : cartItem.quantity,
            })),
          },
          false
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleQuantityDecrement = (itemId, quantity) => {
    axios
      .patch(
        `http://localhost:8282/v1/me/cart/items/${itemId}/quantity`,
        {
          quantity: quantity - 1,
        },
        config
      )
      .then(function (response) {
        console.log(response);
        console.log("수량 감소");
        mutateCart(
          {
            ...cart,
            items: items.map((cartItem, index) => ({
              ...cartItem,
              quantity:
                cartItem.id === itemId ? quantity - 1 : cartItem.quantity,
            })),
          },
          false
        );
      })
      .catch(function (error) {
        console.log(error);
      });
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

  const handleBuyBtnClick = (item, quantity) => {
    const checkedLineItems = cart.items
      .filter((item) => item.checked)
      .map((item) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
      }));
    console.log("큰 구매버튼 클릭 ", checkedLineItems);

    axios
      .post(
        "http://localhost:8282/v1/checkouts",
        {
          line_items: checkedLineItems,
        },
        config
      )
      .then(function (response) {
        console.log(response);
        console.log(response.data.checkout_id);
        setChkId(response.data.checkout_id);
        // history.push("/order");
        history.push(`/checkout/${response.data.checkout_id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleListBuyBtnClick = (item, quantity) => {
    console.log("작은 구매버튼 클릭");

    axios
      .post(
        "http://localhost:8282/v1/checkouts",
        {
          line_items: [
            {
              variant_id: item.variant_id,
              quantity: quantity,
            },
          ],
        },
        config
      )
      .then(function (response) {
        console.log("리스폰스", response);
        console.log("체크아웃 아이디", response.data.checkout_id);
        // if (Number(item.variant_price) < 70000) {
        //   localStorage.setItem("delivery", 3000);
        // }
        // if (Number(item.variant_price) > 70000) {
        //   localStorage.setItem("delivery", 0);
        // }
        history.push(`/checkout/${response.data.checkout_id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
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
                          onIncrement={() =>
                            handleQuantityIncrement(item.id, item.quantity)
                          }
                          onDecrement={() =>
                            handleQuantityDecrement(item.id, item.quantity)
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
        <button type="button" className="buy_btn" onClick={handleBuyBtnClick}>
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
