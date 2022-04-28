import { updateCheckoutsApi } from "api";
import { DeliveryInfoState } from "components/order/OrderDeliveryForm";

interface SubmitCheckoutProps {
  checkoutDeliveryData: DeliveryInfoState;
  checkoutPaymentData: string;
  checkoutTotalDetailData: CheckoutTotalDetailData;
  checkoutData: CheckoutData;
  checkoutNumber: number;
}

interface CheckoutData {
  user: User;
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

interface CheckoutPaymentData {
  paymentName: string;
}

interface CheckoutTotalDetailData {
  agreeChecked: boolean;
  finalPrice: number;
  selectCouponId: number;
  usedMileage: number;
}

export async function submitCheckout({
  checkoutDeliveryData,
  checkoutPaymentData,
  checkoutTotalDetailData,
  checkoutData,
  checkoutNumber,
}: SubmitCheckoutProps) {
  if (checkoutDeliveryData.deliveryClassName === "delivery_write selected") {
    try {
      const res = await updateCheckoutsApi({
        checkoutNumber,
        shippingAddress: {
          name: checkoutDeliveryData.designation,
          recipient_name: checkoutData.user.shipping_address.recipient_name,
          postal_code: checkoutData.user.shipping_address.postal_code,
          address1: checkoutData.user.shipping_address.address1,
          address2: checkoutData.user.shipping_address.address2,
          note: checkoutDeliveryData.requirement
            ? checkoutDeliveryData.requirement
            : "",
          phone1: checkoutData.user.shipping_address.phone1,
          request_note: checkoutDeliveryData.requirement,
        },
        userCouponIdToBeUsed: checkoutTotalDetailData.selectCouponId,
        mileageToBeUsed: Number(checkoutTotalDetailData.usedMileage),
        paymentMethod: checkoutPaymentData,
      });
      console.log("주문성공", res);

      window.location.replace(`/orderCheck/${checkoutNumber}`);
    } catch (err) {
      console.log(err);
    }
  }

  if (checkoutDeliveryData.deliveryClassName1 === "delivery_write selected") {
    try {
      const res = await updateCheckoutsApi({
        checkoutNumber,
        shippingAddress: {
          name: checkoutDeliveryData.designation,
          recipient_name: checkoutDeliveryData.recipient,
          postal_code: checkoutDeliveryData.address1,
          address1: checkoutDeliveryData.addressDetail1,
          address2: checkoutDeliveryData.addressDetail2,
          note: checkoutDeliveryData.requirement1
            ? checkoutDeliveryData.requirement1
            : "",
          phone1:
            checkoutDeliveryData.tel1 +
            checkoutDeliveryData.tel2 +
            checkoutDeliveryData.tel3,
          phone2: checkoutDeliveryData.tel4
            ? checkoutDeliveryData.tel4 +
              checkoutDeliveryData.tel5 +
              checkoutDeliveryData.tel6
            : "",
          request_note: checkoutDeliveryData.requirement1,
        },
        userCouponIdToBeUsed: checkoutTotalDetailData.selectCouponId,
        mileageToBeUsed: Number(checkoutTotalDetailData.usedMileage),
        paymentMethod: checkoutPaymentData,
      });
      console.log("주문성공", res);
      window.location.replace(`/orderCheck/${checkoutNumber}`);
    } catch (err) {
      console.log(err);
    }
  }
}
