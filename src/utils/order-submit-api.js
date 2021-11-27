import { instance } from "../utils/http-client";

export function orderExistedDeliverySubmit(
  checkoutTotalData,
  checkoutData,
  checkoutNumber
) {
  instance
    .put(`/v1/checkouts/${checkoutNumber}`, {
      shipping_address: {
        name: checkoutTotalData.designation,
        recipient_name: checkoutData.user.shipping_address.recipient_name,
        postal_code: checkoutData.user.shipping_address.postal_code,
        address1: checkoutData.user.shipping_address.address1,
        address2: checkoutData.user.shipping_address.address2,
        note: checkoutTotalData.requirement,
        phone1: checkoutData.user.shipping_address.phone1,
        request_note: checkoutTotalData.requirement,
      },
      user_coupon_id_to_be_used: checkoutTotalData.selectCouponId,
      mileage_to_be_used: Number(checkoutTotalData.usedMileage),
      payment_method: checkoutTotalData.paymentName,
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

export function orderNewDeliverySubmit(checkoutTotalData, checkoutNumber) {
  instance
    .put(`/v1/checkouts/${checkoutNumber}`, {
      shipping_address: {
        name: checkoutTotalData.designation,
        recipient_name: checkoutTotalData.recipient,
        postal_code: checkoutTotalData.address1,
        address1: checkoutTotalData.addressDetail1,
        address2: checkoutTotalData.addressDetail2,
        note: checkoutTotalData.requirement1,
        phone1:
          checkoutTotalData.tel1 +
          checkoutTotalData.tel2 +
          checkoutTotalData.tel3,
        phone2:
          checkoutTotalData.tel4 +
          checkoutTotalData.tel5 +
          checkoutTotalData.tel6,
        request_note: checkoutTotalData.requirement1,
      },
      user_coupon_id_to_be_used: checkoutTotalData.selectCouponId,
      mileage_to_be_used: Number(checkoutTotalData.usedMileage),
      payment_method: checkoutTotalData.paymentName,
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
