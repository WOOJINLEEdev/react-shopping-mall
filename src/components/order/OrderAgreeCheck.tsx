import React from "react";

const OrderAgreeCheck = ({ agreeChecked, handleAgreeCheck }) => {
  return (
    <div className="order_check">
      <input
        type="checkbox"
        className="order_agree"
        id="agreeCheck"
        checked={agreeChecked}
        onChange={handleAgreeCheck}
      />
      <label htmlFor="agreeCheck" className="agree_label">
        주문하실 상품 및 결제, 주문정보를 확인하였으며, 이에 동의합니다.
      </label>
    </div>
  );
};

export default OrderAgreeCheck;
