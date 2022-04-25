import useCheckoutPaymentData from "hooks/useCheckoutPaymentData";
import useCheckoutTotalDetailData from "hooks/useCheckoutTotalDetailData";
import { validateCheckout } from "utils/checkout-validator";
import { submitCheckout } from "utils/order-submit-api";
import { OrderCheckoutButtonProps } from "types";
import { useRecoilValue } from "recoil";
import { deliveryInfoState } from "components/order/OrderDeliveryForm";

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
}: OrderCheckoutButtonProps) => {
  const checkoutDeliveryData = useRecoilValue(
    deliveryInfoState(checkoutData.id)
  );
  const { checkoutPaymentData, MutateCheckoutPaymentData } =
    useCheckoutPaymentData();
  const { checkoutTotalDetailData, MutateCheckoutTotalDetailData } =
    useCheckoutTotalDetailData();

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
          원 결제하기
        </button>
      )}
    </>
  );
};

export default OrderCheckoutButton;
