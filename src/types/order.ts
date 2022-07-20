import { ChangeEvent, MouseEvent } from "react";

//---------------------------------------------- OrderAgreeCheck
export interface IOrderAgreeCheckProps {
  agreeChecked: boolean;
  handleAgreeCheckChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

//---------------------------------------------- OrderCheckoutButton
export interface IOrderCheckoutButtonProps {
  checkoutData: IOrderCheckoutButtonData;
  checkoutNumber: number;
}

export interface IOrderCheckoutButtonData {
  created_at: string;
  id: number;
  line_items: ILineItem[];
  user: OrderCheckoutButtonUser;
}

export interface ILineItem {
  image_src: string;
  product_id: number;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
  variant_price: string;
}

export interface OrderCheckoutButtonUser {
  shipping_address: OrderCheckoutButtonShippingAddress;
}

export interface OrderCheckoutButtonShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

//---------------------------------------------- OrderCompletionDeliveryInfo
export interface IOrderCompletionDeliveryInfoProps {
  orderData: OrderDataType[];
}
export interface OrderDataType {
  shipping_address: OrderDeliveryShippingAddress;
}

export interface OrderDeliveryShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

export interface IShippingAddress {
  address1?: string;
  address2?: string;
  recipient_name?: string;
  phone1?: string;
}

//---------------------------------------------- OrderCompletionItemInfo
export interface IOrderCompletionItemInfoProps {
  items: OrderItemType[];
  firstItem: OrderItemType;
  remainder: OrderItemType[];
  remainderClass: string;
  handleOpenCloseBtnClick: () => void;
  handleInfoOpenBtnClick: () => void;
  itemInfoHeadClass: string;
  itemInfoClass: string;
  arrowImg: string;
  arrowImg1: string;
  closeText: string;
  sum: number;
}

export interface OrderItemType {
  image_src: string;
  price: string;
  product_id: number;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
}

//---------------------------------------------- OrderCompletionPayInfo
export interface IOrderCompletionPayInfoProps {
  orderData: Order[];
}

export interface Order {
  payment_method: string;
  shipping_price: string;
  product_price: string;
  total_discount: string | number;
  total_price: string;
  used_coupon?: PayInfoCoupon;
  used_point?: number;
}

export interface PayInfoCoupon {
  applied_amount: string;
  id: number;
  name: string;
  type: string;
  user_coupon_id: number;
}

export interface IUsedCoupon {
  applied_amount: string;
}

//---------------------------------------------- OrderCoupon
export interface IOrderCouponProps {
  checkoutData: OrderCouponCheckoutData;
}

export interface OrderCouponCheckoutData {
  user: OrderCouponUser;
}

export interface OrderCouponUser {
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

export interface ICouponStateSelector {
  selectOption: number;
  selectCouponId: number;
  usedMileage: number;
}

//---------------------------------------------- OrderDelivery
export interface IOrderDeliveryProps {
  checkoutData: OrderDeliveryCheckoutData;
}

export interface OrderDeliveryCheckoutData {
  id: number;
  user: OrderDeliveryUser;
}

export interface OrderDeliveryUser {
  shipping_address?: OrderDeliveryShippingAddress;
}

export interface OrderDeliveryShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
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

//---------------------------------------------- OrderDeliveryForm
export interface IOrderDeliveryFormProps {
  deliveryForm1: string;
  deliveryClassName: string;
  deliveryClassName1: string;
  checkoutId: number;
  handleRequirementOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  deliverySecondRequirementOption: IDeliveryRequirementOption[];
  deliverySecondRequirementWrite: string;
  requirement1: string;
}

export interface IPreexistenceSelectProps {
  margin?: string;
  color?: string;
}

export interface IDeliveryInfoState {
  designation?: string;
  recipient: string;
  address1: string;
  addressDetail1: string;
  addressDetail2: string;
  tel1: string;
  tel2: string;
  tel3: string;
  tel4?: string;
  tel5?: string;
  tel6?: string;
  requirement?: string;
  requirement1?: string;
  deliveryClassName: string;
  deliveryClassName1: string;
}

//---------------------------------------------- OrderDeliveryFormMobile
export interface IOrderDeliveryFormMobileProps {
  deliveryWrapClass: string;
  handleDeliveryTabClick: (e: MouseEvent<HTMLUListElement>) => void;
  deliveryClassName: string;
  deliveryClassName1: string;
  checkoutData: DeliveryFormMobileCheckoutData;
  deliveryForm: string;
  handleRequirementOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  deliveryFirstRequirementWrite: string;
  deliveryFirstRequirementOption: IDeliveryRequirementOption[];
  checkoutId: number;
  requirement: string;
}

export interface DeliveryFormMobileCheckoutData {
  user: DeliveryFormMobileUser;
}

export interface DeliveryFormMobileUser {
  shipping_address?: DeliveryFormMobileShippingAddress;
  name?: string;
}

export interface DeliveryFormMobileShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

//---------------------------------------------- OrderDeliveryFormPc
export interface IOrderDeliveryFormPcProps {
  deliveryWrapClass: string;
  handleDeliveryTabClick: (e: MouseEvent<HTMLUListElement>) => void;
  deliveryClassName: string;
  deliveryClassName1: string;
  checkoutData: DeliveryFormPcCheckoutData;
  deliveryForm: string;
  handleRequirementOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  deliveryFirstRequirementOption: IDeliveryRequirementOption[];
  deliveryFirstRequirementWrite: string;
  checkoutId: number;
  requirement: string;
}

export interface DeliveryFormPcCheckoutData {
  user: DeliveryFormPcUser;
}

export interface DeliveryFormPcUser {
  shipping_address?: DeliveryFormPcShippingAddress;
  name?: string;
}

export interface DeliveryFormPcShippingAddress {
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

export interface LiProps {
  disabled?: string | boolean;
}

//---------------------------------------------- OrderDeliveryFormTablet
export interface IOrderDeliveryFormTabletProps {
  deliveryWrapClass: string;
  handleDeliveryTabClick: (e: MouseEvent<HTMLUListElement>) => void;
  deliveryClassName: string;
  deliveryClassName1: string;
  checkoutData: DeliveryFormTabletCheckoutData;
  deliveryForm: string;
  handleRequirementOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  deliveryFirstRequirementWrite: string;
  deliveryFirstRequirementOption: IDeliveryRequirementOption[];
  checkoutId: number;
  requirement: string;
}

export interface DeliveryFormTabletCheckoutData {
  user: DeliveryFormTabletUser;
}

export interface DeliveryFormTabletUser {
  shipping_address?: DeliveryFormTabletShippingAddress;
  name?: string;
}

export interface DeliveryFormTabletShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

//---------------------------------------------- OrderDeliveryHead
export interface IOrderDeliveryHeadProps {
  isPc: boolean;
  isTablet: boolean;
  isMobile: boolean;
  deliveryWrite: string | undefined;
  infoHeadAddress: string;
  checkoutData: OrderDeliveryHeadCheckoutData;
  handleAddressBtnClick: () => void;
  arrowImg: string;
}

export interface OrderDeliveryHeadCheckoutData {
  id: number;
  user?: OrderDeliveryHeadUser;
}

export interface OrderDeliveryHeadUser {
  shipping_address?: OrderDeliveryHeadShippingAddress;
}

export interface OrderDeliveryHeadShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

//---------------------------------------------- OrderPayments
export interface IOrderPaymentItemProps {
  i: number;
  selected: boolean;
  item: IPayment;
  handlePaymentMethodClick: (e: MouseEvent<HTMLLIElement>) => void;
  basePaymentClass: string;
  selectedPaymentClass: string;
}

export interface IPayment {
  id: string;
  payment: string;
}

//---------------------------------------------- OrderTotal
export interface IOrderTotalProps {
  checkoutData: OrderTotalCheckoutData;
  checkoutNumber: number;
}

export interface OrderTotalCheckoutData {
  created_at: string;
  id: number;
  line_items: ILineItem[];
  user: OrderTotalUser;
}

export interface OrderTotalUser {
  shipping_address: OrderTotalShippingAddress;
}

export interface OrderTotalShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

//---------------------------------------------- OrderTotalDetail
export interface IOrderTotalDetailProps {
  totalPrice: number;
  deliveryCharge: string;
  checkoutData: OrderTotalDetailCheckoutData;
  checkoutNumber: number;
}

interface OrderTotalDetailCheckoutData {
  created_at: string;
  id: number;
  line_items: ILineItem[];
  user: OrderTotalDetailUser;
}

interface OrderTotalDetailUser {
  shipping_address: OrderTotalDetailShippingAddress;
}

interface OrderTotalDetailShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

export interface ITotalDetailSelector {
  selectCouponId: number;
  usedMileage: number;
  agreeChecked: boolean;
  finalPrice: number;
}

//---------------------------------------------- OrderItemLink
export interface IOrderItemLinkProps {
  item: IItem;
}

interface IItem {
  product_id: number;
  product_name: string;
  image_src: string;
}

//---------------------------------------------- OrderItemInfoHeadQty
export interface IOrderItemInfoHeadQtyProps {
  sum: number;
}
