import React from "react";
import useCheckoutDeliveryData from "hooks/useCheckoutDeliveryData";
import useCheckoutPaymentData from "hooks/useCheckoutPaymentData";
import useCheckoutTotalDetailData from "hooks/useCheckoutTotalDetailData";
import { validateCheckout } from "utils/checkout-validator";
import { submitCheckout } from "utils/order-submit-api";

const OrderCheckoutButton = ({
  checkoutData,
  checkoutNumber,
  totalPrice,
  deliveryCharge,
  usedMileage,
  selectOption,
  isPc,
  isTablet,
  isMobile,
}) => {
  const { checkoutDeliveryData, MutateCheckoutDeliveryData } =
    useCheckoutDeliveryData();
  const { checkoutPaymentData, MutateCheckoutPaymentData } =
    useCheckoutPaymentData();
  const { checkoutTotalDetailData, MutateCheckoutTotalDetailData } =
    useCheckoutTotalDetailData();

  const handleOrderSubmit = () => {
    console.log("오더 Checkout 버튼 테스트");

    const { valid, invalidMsg } = validateCheckout(
      checkoutDeliveryData,
      checkoutPaymentData,
      checkoutTotalDetailData
    );

    if (!valid) {
      return alert(invalidMsg);
    }

    submitCheckout(
      checkoutDeliveryData,
      checkoutPaymentData,
      checkoutTotalDetailData,
      checkoutData,
      checkoutNumber
    );
  };

  return (
    <>
      {isPc && (
        <button
          type="submit"
          className="checkout_btn"
          onClick={handleOrderSubmit}
        >
          CHECK OUT
        </button>
      )}
      {isTablet && (
        <button
          type="submit"
          className="checkout_btn"
          onClick={handleOrderSubmit}
        >
          CHECK OUT
        </button>
      )}
      {isMobile && (
        <button
          type="submit"
          className="checkout_btn"
          onClick={handleOrderSubmit}
          tabIndex="0"
        >
          {(
            totalPrice +
            Number(deliveryCharge) -
            Number(usedMileage) -
            (Number.isInteger(selectOption) === false
              ? totalPrice * selectOption
              : selectOption)
          )
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원 결제하기
        </button>
      )}
    </>
  );
};

export default OrderCheckoutButton;
