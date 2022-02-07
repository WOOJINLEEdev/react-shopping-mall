import { updateCheckoutsApi } from "api";

export async function submitCheckout(
  checkoutDeliveryData: any,
  checkoutPaymentData: any,
  checkoutTotalDetailData: any,
  checkoutData: any,
  checkoutNumber: any
) {
  if (checkoutDeliveryData.deliveryClassName === "delivery_write old") {
    try {
      const res = await updateCheckoutsApi({
        checkoutNumber,
        shippingAddress: {
          name: checkoutDeliveryData.designation,
          recipient_name: checkoutData.user.shipping_address.recipient_name,
          postal_code: checkoutData.user.shipping_address.postal_code,
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
          postal_code: checkoutDeliveryData.address1,
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
