import { instance } from "utils/http-client";

export function submitCheckout(
  checkoutDeliveryData,
  checkoutPaymentData,
  checkoutTotalDetailData,
  checkoutData,
  checkoutNumber
) {
  if (checkoutDeliveryData.deliveryClassName === "delivery_write old") {
    instance
      .put(`/v1/checkouts/${checkoutNumber}`, {
        shipping_address: {
          name: checkoutDeliveryData.designation,
          recipient_name: checkoutData.user.shipping_address.recipient_name,
          postal_code: checkoutData.user.shipping_address.postal_code,
          address1: checkoutData.user.shipping_address.address1,
          address2: checkoutData.user.shipping_address.address2,
          note: checkoutDeliveryData.requirement,
          phone1: checkoutData.user.shipping_address.phone1,
          request_note: checkoutDeliveryData.requirement,
        },
        user_coupon_id_to_be_used: checkoutTotalDetailData.selectCouponId,
        mileage_to_be_used: Number(checkoutTotalDetailData.usedMileage),
        payment_method: checkoutPaymentData.paymentName,
      })
      .then(function (response) {
        console.log(response);
        console.log("주문성공");

        window.location.replace(`/orderCheck/${checkoutNumber}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (checkoutDeliveryData.deliveryClassName === "delivery_write new") {
    instance
      .put(`/v1/checkouts/${checkoutNumber}`, {
        shipping_address: {
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
        user_coupon_id_to_be_used: checkoutTotalDetailData.selectCouponId,
        mileage_to_be_used: Number(checkoutTotalDetailData.usedMileage),
        payment_method: checkoutPaymentData.paymentName,
      })
      .then(function (response) {
        console.log(response);
        console.log("주문성공");

        window.location.replace(`/orderCheck/${checkoutNumber}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
