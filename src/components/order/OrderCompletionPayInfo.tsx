import { useState } from "react";
import styled from "styled-components";
import downArrow from "images/down-arrow.png";
import upArrow from "images/up-arrow-icon.png";
import { OrderCompletionPayInfoProps } from "types";

const OrderCompletionPayInfo = ({ orderData }: OrderCompletionPayInfoProps) => {
  const [arrowImg, setArrowImg] = useState(upArrow);
  const [payInfoClass, setPayInfoClass] = useState("order_pay_info_wrap");
  const [infoHeadPayment, setInfoHeadPayment] = useState("hide");

  const handleOpenCloseBtn = () => {
    if (arrowImg === downArrow) {
      setArrowImg(upArrow);
      setInfoHeadPayment("hide");
      return setPayInfoClass("order_pay_info_wrap");
    }

    if (arrowImg === upArrow) {
      setArrowImg(downArrow);
      setInfoHeadPayment("order_check_head_payment");
      return setPayInfoClass("hide");
    }
  };

  return (
    <PayInfoWrap>
      <div className="order_info_head_wrap">
        <h2 className="order_info_header">결제 정보</h2>

        <PaymentBtnWrap>
          <div className={infoHeadPayment}>
            {orderData[0].payment_method} /{" "}
            {orderData[0].total_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
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
        </PaymentBtnWrap>
      </div>
      <ul className={payInfoClass}>
        <li className="order_pay_info">
          <div className="order_pay_info_label">결제 수단</div>
          <div>{orderData[0].payment_method}</div>
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
            {orderData[0].shipping_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </li>
        <li className="order_pay_info">
          <div className="order_pay_info_label">할인금액</div>
          <div className="pay_info_discount_wrap">
            <span className="pay_info_total_discount">
              {orderData[0].total_discount > 0 ? "-" : ""}
              {orderData[0].total_discount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <ul className="coupon_mileage_wrap">
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
            {orderData[0].total_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </li>
      </ul>
    </PayInfoWrap>
  );
};

export default OrderCompletionPayInfo;

const PayInfoWrap = styled.div`
  border-bottom: 3px solid #333;

  & .pay_info_discount_wrap {
    display: flex;
    flex-direction: column;
    width: 50%;
    text-align: right;
  }

  & .pay_info_total_discount {
    padding-bottom: 10px;
  }

  & .coupon_mileage_wrap {
    width: 100%;
  }
`;

const UsedCouponMileage = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 13px;
  color: rgb(82, 82, 82);
`;

const CouponTitle = styled.div`
  width: 45%;
`;

const MileageTitle = styled.div`
  width: 45%;
`;

const PaymentBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;
