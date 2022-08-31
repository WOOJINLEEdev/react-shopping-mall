import { ChangeEvent, MouseEvent } from "react";

export interface ILineItem {
  image_src: string;
  product_id: number;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
  price: string;
}

type LineItem = Omit<ILineItem, "price">;
export interface IModifiedLineItem extends LineItem {
  variant_price: string;
}

export interface IDeliveryForm {
  deliveryClassName: string;
  deliveryClassName1: string;
  checkoutId: number;
  handleRequirementOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  deliverySecondRequirementOption: IDeliveryRequirementOption[];
  deliverySecondRequirementWrite: string;
}

export interface IOrderDeliveryForm extends IDeliveryForm {
  deliveryForm1: string;
  requirement1: string;
}

export interface IOrderDeliveryFormDeviceProps
  extends Omit<
    IDeliveryForm,
    "deliverySecondRequirementOption" | "deliverySecondRequirementWrite"
  > {
  deliveryWrapClass: string;
  handleDeliveryTabClick: (e: MouseEvent<HTMLUListElement>) => void;
  checkoutData: ICheckoutData;
  deliveryForm: string;
  deliveryFirstRequirementWrite: string;
  deliveryFirstRequirementOption: IDeliveryRequirementOption[];
  requirement: string;
}

export interface ICheckoutData {
  user: Partial<ICheckoutUser>;
}

export interface ICheckoutUser {
  shipping_address: ICheckoutShippingAddress;
  name?: string;
}

export interface ICheckoutShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  phone2?: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

export interface IDeliveryRequirementOption {
  no: string;
  label: string;
  value: string;
  selected?: string;
}

export interface IMyOrderDataType {
  shipping_address: Omit<ICheckoutShippingAddress, "phone2">;
}

type PickShippingAddress = Pick<
  ICheckoutShippingAddress,
  "address1" | "address2" | "recipient_name" | "phone1"
>;

export type ShippingAddress = Partial<PickShippingAddress>;

export interface IUsedCoupon {
  applied_amount: string;
  id: number;
  name: string;
  type: string;
  user_coupon_id: number;
}

export type UsedCouponAmount = Pick<IUsedCoupon, "applied_amount">;

export interface IOrderCouponCheckoutData {
  user: IOrderCouponUser;
}

export interface IOrderCouponUser {
  coupons?: ICoupon[];
  mileage: number;
}

export interface ICoupon {
  id: number;
  coupon_name: string;
  coupon_percent: number;
  coupon_type: "percent" | "amount";
  used: boolean;
}

export interface IOrderDeliveryCheckoutData {
  id: number;
  user: IOrderDeliveryUser;
}

export interface IOrderDeliveryUser {
  shipping_address?: Omit<ICheckoutShippingAddress, "phone2">;
}

export interface IPreexistenceSelectProps {
  margin?: string;
  color?: string;
}

export interface IOrderDeliveryHeadCheckoutData {
  id: number;
  user?: Partial<ICheckoutUser>;
}

export interface IOrderCheckoutData {
  created_at: string;
  id: number;
  line_items: IModifiedLineItem[];
  user: Pick<ICheckoutUser, "shipping_address">;
}

export interface IOrderCompletionData {
  created_at: string;
  line_items: ILineItem[];
  id: number;
  shipping_address: Omit<ICheckoutShippingAddress, "phone2">;
  payment_method: string;
  shipping_price: string;
  product_price: string;
  total_discount: string | number;
  total_price: string;
  used_coupon?: IUsedCoupon;
  used_point?: number;
}

export type MyOrderDataType = Omit<
  IOrderCompletionData,
  "created_at" | "line_items" | "id" | "shipping_address"
>;
