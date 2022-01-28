import { instance } from "utils/http-client";

export function createCheckoutsApi({ lineItems }) {
  return instance.post("/v1/checkouts", { line_items: lineItems });
}

export function updateCheckoutsApi({
  checkoutNumber,
  shippingAddress,
  usercCouponIdToBeUsed,
  mileageToBeUsed,
  paymentMethod,
}) {
  return instance.put(`/v1/checkouts/${checkoutNumber}`, {
    shipping_address: shippingAddress,
    user_coupon_id_to_be_used: usercCouponIdToBeUsed,
    mileage_to_be_used: mileageToBeUsed,
    payment_method: paymentMethod,
  });
}
