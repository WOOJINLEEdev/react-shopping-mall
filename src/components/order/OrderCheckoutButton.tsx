import { useRecoilValue } from "recoil";

import { validateCheckout } from "utils/checkout-validator";
import { submitCheckout } from "utils/order-submit-api";
import { formatPrice } from "utils/money";

import { deliveryInfoState, paymentState, totalDetailSelector } from "state";
import { IOrderCheckoutButtonProps } from "types";

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
}: IOrderCheckoutButtonProps) => {
  const checkoutDeliveryData = useRecoilValue(
    deliveryInfoState(checkoutData.id)
  );
  const checkoutPaymentData = useRecoilValue(paymentState);
  const checkoutTotalDetailData = useRecoilValue(totalDetailSelector);

  const handleCheckoutBtnClick = () => {
    const { valid, invalidMsg } = validateCheckout({
      checkoutDeliveryData,
      checkoutPaymentData,
      checkoutTotalDetailData,
    });

    if (!valid) {
      return alert(invalidMsg);
    }

    submitCheckout({
      checkoutDeliveryData,
      checkoutPaymentData,
      checkoutTotalDetailData,
      checkoutData,
      checkoutNumber,
    });
  };

  return (
    <>
      {isPc && (
        <button
          type="submit"
          className="checkout_btn"
          onClick={handleCheckoutBtnClick}
        >
          CHECK OUT
        </button>
      )}
      {isTablet && (
        <button
          type="submit"
          className="checkout_btn"
          onClick={handleCheckoutBtnClick}
        >
          CHECK OUT
        </button>
      )}
      {isMobile && (
        <button
          type="submit"
          className="checkout_btn"
          onClick={handleCheckoutBtnClick}
          tabIndex={0}
        >
          {formatPrice(
            (
              totalPrice +
              Number(deliveryCharge) -
              Number(!usedMileage ? 0 : usedMileage) -
              (Number.isInteger(selectOption) === false
                ? totalPrice * selectOption
                : selectOption)
            ).toString()
          )}
          원 결제하기
        </button>
      )}
    </>
  );
};

export default OrderCheckoutButton;
