import { useState } from "react";
import styled from "styled-components";

import { formatPrice, formatPriceWithUnit } from "utils/money";

import { MyOrderDataType, UsedCouponAmount } from "components/order/types";

import downArrow from "assets/images/down-arrow.png";
import upArrow from "assets/images/up-arrow-icon.png";

export interface IOrderCompletionPayInfoProps {
  myOrderData: MyOrderDataType[];
}

const OrderCompletionPayInfo = ({
  myOrderData,
}: IOrderCompletionPayInfoProps) => {
  const [arrowImg, setArrowImg] = useState(upArrow);
  const [payInfoClass, setPayInfoClass] = useState("order_pay_info_wrap");
  const [infoHeadPayment, setInfoHeadPayment] = useState("hide");

  const handleOpenCloseBtnClick = () => {
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

  function getUsedCouponAmount(usedCoupon?: UsedCouponAmount) {
    if (!usedCoupon) {
      return 0;
    }

    return formatPrice(usedCoupon.applied_amount.toString());
  }

  function getUsedMileage(usedPoint: number | undefined) {
    if (!usedPoint) {
      return 0;
    }

    return formatPrice(usedPoint.toString());
  }

  return (
    <PayInfoWrap>
      <div className="order_info_head_wrap">
        <h2 className="order_info_header">결제 정보</h2>

        <PaymentBtnWrap>
          <div className={infoHeadPayment}>
            {myOrderData[0].payment_method} /{" "}
            {formatPrice(myOrderData[0].total_price.toString())}
          </div>
          <button
            type="button"
            className="order_pay_info_btn"
            onClick={handleOpenCloseBtnClick}
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
          <div>{myOrderData[0].payment_method}</div>
        </li>
        <li className="order_pay_info">
          <div className="order_pay_info_label">총 상품금액</div>
          <div>{formatPrice(myOrderData[0].product_price.toString())}</div>
        </li>
        <li className="order_pay_info">
          <div className="order_pay_info_label">배송비</div>
          <div>{formatPriceWithUnit(myOrderData[0].shipping_price, "+")}</div>
        </li>
        <li className="order_pay_info">
          <div className="order_pay_info_label">할인금액</div>
          <div className="pay_info_discount_wrap">
            <span className="pay_info_total_discount">
              {formatPriceWithUnit(myOrderData[0].total_discount)}
            </span>
            <ul className="coupon_mileage_wrap">
              <UsedCouponMileage>
                <CouponTitle>쿠폰</CouponTitle>
                <div>{getUsedCouponAmount(myOrderData[0].used_coupon)}</div>
              </UsedCouponMileage>
              <UsedCouponMileage>
                <MileageTitle>마일리지</MileageTitle>
                <div>{getUsedMileage(myOrderData[0].used_point)}</div>
              </UsedCouponMileage>
            </ul>
          </div>
        </li>
        <li className="order_pay_info">
          <div className="order_pay_info_label order_final_price">
            총 결제금액
          </div>
          <div className="order_final_price">
            {formatPrice(myOrderData[0].total_price.toString())}
          </div>
        </li>
      </ul>
    </PayInfoWrap>
  );
};

export default OrderCompletionPayInfo;

const PayInfoWrap = styled.div`
  border-bottom: 3px solid #333;

  .pay_info_discount_wrap {
    display: flex;
    flex-direction: column;
    width: 50%;
    text-align: right;
  }

  .pay_info_total_discount {
    padding-bottom: 10px;
  }

  .coupon_mileage_wrap {
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
