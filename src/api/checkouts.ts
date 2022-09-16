import { AxiosInstance } from "axios";

interface ICreateCheckoutsPayload {
  instance: AxiosInstance;
  lineItems: ILineItem[];
}

interface ILineItem {
  variant_id: number | string;
  quantity: number;
}

export function createCheckoutsApi({
  instance,
  lineItems,
}: ICreateCheckoutsPayload) {
  return instance.post("/v1/checkouts", { line_items: lineItems });
}

interface IUpdateCheckoutsPayload {
  instance: AxiosInstance;
  checkoutNumber: number;
  shippingAddress: CheckoutShippingAddress;
  userCouponIdToBeUsed: number;
  mileageToBeUsed: number;
  paymentMethod: string;
}

interface CheckoutShippingAddress {
  name?: string;
  recipient_name: string;
  postal_code: string;
  address1: string;
  address2: string;
  note: string;
  phone1: string;
  phone2?: string;
  request_note?: string;
}

export function updateCheckoutsApi({
  instance,
  checkoutNumber,
  shippingAddress,
  userCouponIdToBeUsed,
  mileageToBeUsed,
  paymentMethod,
}: IUpdateCheckoutsPayload) {
  return instance.put(`/v1/checkouts/${checkoutNumber}`, {
    shipping_address: shippingAddress,
    user_coupon_id_to_be_used: userCouponIdToBeUsed,
    mileage_to_be_used: mileageToBeUsed,
    payment_method: paymentMethod,
  });
}
