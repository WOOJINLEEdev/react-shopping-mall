import { useState, useEffect } from "react";
import OrderCheckoutButton from "components/order/OrderCheckoutButton";
import OrderAgreeCheck from "components/order/OrderAgreeCheck";
import useCheckoutCouponData from "hooks/useCheckoutCouponData";
import useCheckoutTotalDetailData from "hooks/useCheckoutTotalDetailData";
import { OrderTotalDetailProps } from "types";

const OrderTotalDetail = ({
  totalPrice,
  deliveryCharge,
  checkoutData,
  checkoutNumber,
  isPc,
  isTablet,
  isMobile,
}: OrderTotalDetailProps) => {
  const [agreeChecked, setAgreeChecked] = useState<boolean>(false);

  const { MutateCheckoutTotalDetailData } = useCheckoutTotalDetailData();
  const { checkoutCouponData } = useCheckoutCouponData();
  const { usedMileage, selectCouponId, selectOption } = checkoutCouponData;

  const finalPrice =
    totalPrice +
    Number(deliveryCharge) -
    Number(!usedMileage ? 0 : usedMileage) -
    (Number.isInteger(selectOption) === false
      ? totalPrice * selectOption
      : selectOption);

  useEffect(() => {
    MutateCheckoutTotalDetailData({
      selectCouponId,
      usedMileage,
      finalPrice,
      agreeChecked,
    });
  }, [selectCouponId, usedMileage, finalPrice, agreeChecked]);

  const handleAgreeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              {deliveryCharge?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                : usedMileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                ? (totalPrice * selectOption)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : selectOption.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              {(
                totalPrice +
                Number(deliveryCharge) -
                Number(!usedMileage ? 0 : usedMileage) -
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

      <OrderAgreeCheck
        agreeChecked={agreeChecked}
        handleAgreeCheck={handleAgreeCheck}
      />

      <OrderCheckoutButton
        checkoutData={checkoutData}
        checkoutNumber={checkoutNumber}
        totalPrice={totalPrice}
        deliveryCharge={deliveryCharge}
        usedMileage={usedMileage}
        selectOption={selectOption}
        isPc={isPc}
        isTablet={isTablet}
        isMobile={isMobile}
      />
    </div>
  );
};

export default OrderTotalDetail;
