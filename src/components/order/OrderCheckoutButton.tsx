import useCheckoutDeliveryData from "hooks/useCheckoutDeliveryData";
import useCheckoutPaymentData from "hooks/useCheckoutPaymentData";
import useCheckoutTotalDetailData from "hooks/useCheckoutTotalDetailData";
import { validateCheckout } from "utils/checkout-validator";
import { submitCheckout } from "utils/order-submit-api";

interface OrderCheckoutButtonProps {
  checkoutData: CheckoutData;
  checkoutNumber: number;
  totalPrice: number;
  deliveryCharge: string;
  usedMileage: string | number;
  selectOption: number;
  isPc: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

interface CheckoutData {
  created_at: string;
  id: number;
  line_items: LineItem[];
  user: User;
}

interface LineItem {
  image_src: string;
  product_id: number;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
  variant_price: string;
}

interface User {
  shipping_address: ShippingAddress;
}

interface ShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

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
  const { checkoutDeliveryData, MutateCheckoutDeliveryData } =
    useCheckoutDeliveryData();
  const { checkoutPaymentData, MutateCheckoutPaymentData } =
    useCheckoutPaymentData();
  const { checkoutTotalDetailData, MutateCheckoutTotalDetailData } =
    useCheckoutTotalDetailData();

  const handleOrderSubmit = () => {
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
