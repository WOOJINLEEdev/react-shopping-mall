import React, { useState } from "react";
import styled from "styled-components";
import downArrow from "../images/down-arrow.png";
import upArrow from "../images/up-arrow-icon.png";

const OrderCompletionPayInfo = ({ orderData }) => {
  const [arrowImg, setArrowImg] = useState(downArrow);
  const [payInfoClass, setPayInfoClass] = useState("hide");

  const handleOpenCloseBtn = () => {
    if (arrowImg === downArrow) {
      setArrowImg(upArrow);
      return setPayInfoClass("order_pay_info_wrap");
    }

    if (arrowImg === upArrow) {
      setArrowImg(downArrow);
      return setPayInfoClass("hide");
    }
  };

  return (
    <div style={{ borderBottom: "3px solid #333" }}>
      <div className="order_info_head_wrap">
        <h2 className="order_info_header">결제 정보</h2>
        <button
          type="button"
          className="order_pay_info_btn"
          onClick={handleOpenCloseBtn}
        >
          <img
            src={arrowImg}
            alt="buttonArrow"
            className="order_pay_info_btn_img"
          />
        </button>
      </div>
      <ul className={payInfoClass}>
        <li className="order_pay_info">
          <div className="order_pay_info_label">결제 수단</div>
          <div>{orderData[0].payment.payment_method.type}</div>
        </li>
        <li className="order_pay_info">
          <div className="order_pay_info_label">총 상품금액</div>
          <div>
            {orderData[0].product_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </li>
        <li className="order_pay_info">
          <div className="order_pay_info_label">배송비</div>
          <div>
            {orderData[0].shipping_price !== "0" ? "+" : ""}
            {orderData[0].shipping_price}
          </div>
          {/* <div>{orderData[0].total_price < 70000 ? "+3,000" : "0"}</div> */}
        </li>
        <li className="order_pay_info">
          <div className="order_pay_info_label">할인금액</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              textAlign: "right",
            }}
          >
            <span style={{ paddingBottom: "10px" }}>
              {orderData[0].total_discount > 0 ? "-" : ""}
              {orderData[0].total_discount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <ul style={{ width: "100%" }}>
              <UsedCouponMileage>
                <CouponTitle>쿠폰</CouponTitle>
                <div>
                  {!orderData[0].used_coupon
                    ? 0
                    : orderData[0].used_coupon.applied_amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              </UsedCouponMileage>
              <UsedCouponMileage>
                <MileageTitle>마일리지</MileageTitle>
                <div>
                  {!orderData[0].used_point
                    ? "0"
                    : orderData[0].used_point
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              </UsedCouponMileage>
            </ul>
          </div>
        </li>
        <li className="order_pay_info">
          <div className="order_pay_info_label order_final_price">
            총 결제금액
          </div>
          <div className="order_final_price">
            {orderData[0].payment.amount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OrderCompletionPayInfo;

const UsedCouponMileage = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 13px;
  color: rgb(82, 82, 82);
`;

const CouponTitle = styled.li`
  width: 40%;
`;

const MileageTitle = styled.li`
  width: 40%;
`;
