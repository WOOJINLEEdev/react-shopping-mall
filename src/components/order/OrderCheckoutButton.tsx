import { useRecoilValue } from "recoil";

import useDevice from "hooks/useDevice";
import useHttpClient from "hooks/useHttpClient";
import { validateCheckout } from "utils/checkout-validator";
import { submitCheckout } from "utils/order-submit-api";
import { formatPrice } from "utils/money";

import { IOrderCheckoutData } from "components/order/types";

import {
  deliveryInfoState,
  paymentState,
  totalDetailSelector,
  finalPriceState,
} from "state";

interface IOrderCheckoutButtonProps {
  checkoutData: IOrderCheckoutData;
  checkoutNumber: number;
}

const OrderCheckoutButton = ({
  checkoutData,
  checkoutNumber,
}: IOrderCheckoutButtonProps) => {
  const { isPc, isTablet, isMobile } = useDevice();
  const instance = useHttpClient();

  const checkoutDeliveryData = useRecoilValue(
    deliveryInfoState(checkoutData.id),
  );
  const checkoutPaymentData = useRecoilValue(paymentState);
  const checkoutTotalDetailData = useRecoilValue(totalDetailSelector);
  const finalPrice = useRecoilValue(finalPriceState);

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
      instance,
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
          {formatPrice(finalPrice.toString())}원 결제하기
        </button>
      )}
    </>
  );
};

export default OrderCheckoutButton;
