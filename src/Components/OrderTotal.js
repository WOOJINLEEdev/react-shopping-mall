import React from "react";
import { Link } from "react-router-dom";
import useMyCart from "../Hooks/useMyCart";

const OrderTotal = ({ usedMileage, selectOption, handleChangeDelivery }) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { cart, loadingCart, cartError, mutateCart } = useMyCart();

  if (cartError) return <div>failed to load</div>;
  if (loadingCart) return <div>loading...</div>;

  const items = cart.items;
  const totalPrice = items
    .map((item) => item.variant_price * item.quantity)
    .reduce((sum, itemPrice) => sum + itemPrice, 0);

  const deliveryCharge = localStorage.getItem("delivery");

  const handleOrderSubmit = () => {
    console.log("오더버튼 클릭");
  };

  const timer = new Date();

  console.log(timer);

  return (
    <section className="order_total_info">
      <div className="order_item_info">
        <h2 className="info_header">
          주문상품 정보 / 총 <span className="total">{items.length}</span>개
        </h2>
        <ul className="info_group">
          {items.map((item, index) => (
            <li key={index} className="info_list_wrap">
              <Link
                to={`/products/${item.product_id}`}
                className="info_list_box"
              >
                <img
                  className="info_list_img"
                  alt=""
                  src={item.product_image_src}
                />
              </Link>

              <div className="list_info">
                <div className="list_info_text infoHead">
                  <label className="list_info_name">제품명</label>
                  <p className="list_goods name">{item.product_name}</p>
                </div>

                <div className="list_info_text">
                  <label className="list_info_name opt">옵션 : </label>
                  <p className="list_goods option">{item.variant_name}</p>
                </div>

                <div className="list_info_text priceAndQuantity">
                  <label className="list_info_name pAndq">
                    가격 / 수량
                    <span className="list_price_quantity">
                      {" "}
                      {item.quantity}
                    </span>
                    개
                  </label>
                  <p className="list_price_text">
                    <span className="list_price_dollar"></span>
                    <span className="list_goods price">
                      {item.variant_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                    원
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="detail_wrap">
        <div className="detail_box">
          <div className="label_box">
            <label>총 상품금액</label>
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
            <label>마일리지 사용</label>
          </div>
          <p className="price_unit">
            {usedMileage > 0 ? "-" : ""}
            <span className="mileage_in_zone">
              {usedMileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            원
          </p>
        </div>

        <div className="detail_box">
          <div className="label_box">
            <label>쿠폰 사용</label>
          </div>
          <p className="price_unit">
            {totalPrice * selectOption > 0 || selectOption > 0 ? "-" : ""}
            <span className="coupon_in_zone">
              {Number.isInteger(selectOption) === false
                ? (totalPrice * selectOption)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : selectOption}
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
              {(
                totalPrice +
                Number(deliveryCharge) -
                usedMileage -
                (Number.isInteger(selectOption) === false
                  ? totalPrice * selectOption
                  : selectOption)
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            원
          </p>
        </div>
      </div>

      <div className="order_check">
        <input type="checkbox" className="order_agree" id="agreeCheck" />
        <label htmlFor="agreeCheck" className="agree_label">
          주문하실 상품 및 결제, 주문정보를 확인하였으며, 이에 동의합니다.(필수)
        </label>
      </div>

      <button
        type="submit"
        className="checkout_btn"
        onClick={handleOrderSubmit}
      >
        CHECK OUT
      </button>
    </section>
  );
};

export default OrderTotal;
