import { ChangeEvent, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { formatPrice } from "utils/money";

import OrderCheckoutButton from "components/order/OrderCheckoutButton";
import OrderAgreeCheck from "components/order/OrderAgreeCheck";
import { IOrderCheckoutData } from "components/order/types";

import { finalPriceState, agreeCheckedState, couponStateSelector } from "state";

interface IOrderTotalDetailProps {
  totalPrice: number;
  deliveryCharge: string;
  checkoutData: IOrderCheckoutData;
  checkoutNumber: number;
}

const OrderTotalDetail = ({
  totalPrice,
  deliveryCharge,
  checkoutData,
  checkoutNumber,
}: IOrderTotalDetailProps) => {
  const couponState = useRecoilValue(couponStateSelector);
  const { usedMileage, selectOption } = couponState;
  const [agreeChecked, setAgreeChecked] = useRecoilState(agreeCheckedState);
  const setFinalPrice = useSetRecoilState(finalPriceState);

  const countFinalPrice =
    totalPrice +
    Number(deliveryCharge) -
    Number(!usedMileage ? 0 : usedMileage) -
    (Number.isInteger(selectOption) === false
      ? totalPrice * selectOption
      : selectOption);

  useEffect(() => {
    setFinalPrice(countFinalPrice);
  }, [countFinalPrice, setFinalPrice]);

  const handleAgreeCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setAgreeChecked(true);
    } else {
      setAgreeChecked(false);
    }
  };

  return (
    <div className="detail_wrap">
      <div className="detail_box_wrap">
        <div className="detail_box">
          <div className="label_box">
            <label htmlFor="totalPriceDetail">총 상품금액</label>
          </div>
          <p className="price_unit">
            <span className="total_price_zone" id="totalPriceDetail">
              {formatPrice(totalPrice.toString())}
            </span>
            원
          </p>
        </div>

        <div className="detail_box">
          <div className="label_box">
            <label htmlFor="deliveryChargeDetail">배송비</label>
          </div>
          <p className="price_unit">
            {deliveryCharge === "0" ? "" : "+"}
            <span className="delivery_charge_zone" id="deliveryChargeDetail">
              {formatPrice(deliveryCharge?.toString())}
            </span>
            원
          </p>
        </div>

        <div className="detail_box">
          <div className="label_box">
            <label htmlFor="usedMileageDetail">마일리지 사용</label>
          </div>
          <p className="price_unit">
            {usedMileage > 0 ? "-" : ""}
            <span className="mileage_in_zone" id="usedMileageDetail">
              {!usedMileage || usedMileage === 0
                ? 0
                : formatPrice(usedMileage.toString())}
            </span>
            원
          </p>
        </div>

        <div className="detail_box">
          <div className="label_box">
            <label htmlFor="usedCouponDetail">쿠폰 사용</label>
          </div>
          <p className="price_unit">
            {totalPrice * selectOption > 0 || selectOption > 0 ? "-" : ""}
            <span className="coupon_in_zone" id="usedCouponDetail">
              {Number.isInteger(selectOption) === false
                ? formatPrice((totalPrice * selectOption).toString())
                : formatPrice(selectOption.toString())}
            </span>
            원
          </p>
        </div>

        <div className="detail_box">
          <div className="label_box">
            <label htmlFor="finalPriceDetail" className="final_price">
              총 결제금액
            </label>
          </div>
          <p className="price_unit final">
            <span className="final_price_zone" id="finalPriceDetail">
              {formatPrice(countFinalPrice.toString())}
            </span>
            원
          </p>
        </div>
      </div>

      <OrderAgreeCheck
        agreeChecked={agreeChecked}
        handleAgreeCheckChange={handleAgreeCheckChange}
      />

      <OrderCheckoutButton
        checkoutData={checkoutData}
        checkoutNumber={checkoutNumber}
      />
    </div>
  );
};

export default OrderTotalDetail;
