import { updateCheckoutsApi } from "api";

interface SubmitCheckoutProps {
  checkoutDeliveryData: CheckoutDeliveryData;
  checkoutPaymentData: CheckoutPaymentData;
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

interface CheckoutDeliveryData {
  address1: string;
  addressDetail1: string;
  addressDetail2: string;
  deliveryClassName: "delivery_write old" | "delivery_write new";
  deliveryClassName1: "delivery_write old" | "delivery_write new";
  designation: string;
  recipient: string;
  requirement: string;
  requirement1: string;
  tel1: string;
  tel2: string;
  tel3: string;
  tel4: string;
  tel5: string;
  tel6: string;
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
  if (checkoutDeliveryData.deliveryClassName === "delivery_write old") {
    try {
      const res = await updateCheckoutsApi({
        checkoutNumber,
        shippingAddress: {
          name: checkoutDeliveryData.designation,
          recipient_name: checkoutData.user.shipping_address.recipient_name,
          postal_code: Number(checkoutData.user.shipping_address.postal_code),
          address1: checkoutData.user.shipping_address.address1,
          address2: checkoutData.user.shipping_address.address2,
          note: checkoutDeliveryData.requirement,
          phone1: checkoutData.user.shipping_address.phone1,
          request_note: checkoutDeliveryData.requirement,
        },
        userCouponIdToBeUsed: checkoutTotalDetailData.selectCouponId,
        mileageToBeUsed: Number(checkoutTotalDetailData.usedMileage),
        paymentMethod: checkoutPaymentData.paymentName,
      });
      console.log("주문성공", res);

      window.location.replace(`/orderCheck/${checkoutNumber}`);
    } catch (err) {
      console.log(err);
    }
  }

  if (checkoutDeliveryData.deliveryClassName === "delivery_write new") {
    try {
      const res = await updateCheckoutsApi({
        checkoutNumber,
        shippingAddress: {
          name: checkoutDeliveryData.designation,
          recipient_name: checkoutDeliveryData.recipient,
          postal_code: Number(checkoutDeliveryData.address1),
          address1: checkoutDeliveryData.addressDetail1,
          address2: checkoutDeliveryData.addressDetail2,
          note: checkoutDeliveryData.requirement1,
          phone1:
            checkoutDeliveryData.tel1 +
            checkoutDeliveryData.tel2 +
            checkoutDeliveryData.tel3,
          phone2:
            checkoutDeliveryData.tel4 +
            checkoutDeliveryData.tel5 +
            checkoutDeliveryData.tel6,
          request_note: checkoutDeliveryData.requirement1,
        },
        userCouponIdToBeUsed: checkoutTotalDetailData.selectCouponId,
        mileageToBeUsed: Number(checkoutTotalDetailData.usedMileage),
        paymentMethod: checkoutPaymentData.paymentName,
      });
      console.log("주문성공", res);
      window.location.replace(`/orderCheck/${checkoutNumber}`);
    } catch (err) {
      console.log(err);
    }
  }
}
