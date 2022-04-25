//---------------------------------------------- OrderAgreeCheck
export interface OrderAgreeCheckProps {
  agreeChecked: boolean;
  handleAgreeCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

//---------------------------------------------- OrderCheckoutButton
export interface OrderCheckoutButtonProps {
  checkoutData: OrderCheckoutButtonData;
  checkoutNumber: number;
  totalPrice: number;
  deliveryCharge: string;
  usedMileage: string | number;
  selectOption: number;
  isPc: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

export interface OrderCheckoutButtonData {
  created_at: string;
  id: number;
  line_items: LineItem[];
  user: OrderCheckoutButtonUser;
}

export interface LineItem {
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
export interface OrderCompletionDeliveryInfoProps {
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

//---------------------------------------------- OrderCompletionItemInfo
export interface OrderCompletionItemInfoProps {
  items: OrderItemType[];
  firstItem: OrderItemType;
  remainder: OrderItemType[];
  remainderClass: string;
  handleOpenCloseBtn: () => void;
  handleInfoOpenBtn: () => void;
  itemInfoHeadClass: string;
  itemInfoClass: string;
  arrowImg: string;
  arrowImg1: string;
  closeText: string;
  sum: number;
  isPc: boolean;
  isTablet: boolean;
  isMobile: boolean;
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
export interface OrderCompletionPayInfoProps {
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

//---------------------------------------------- OrderCoupon
export interface OrderCouponProps {
  checkoutData: OrderCouponCheckoutData;
  isMobile: boolean;
  isTablet: boolean;
}

export interface OrderCouponCheckoutData {
  user: OrderCouponUser;
}

export interface OrderCouponUser {
  coupons?: Coupon[];
  mileage: number;
}

export interface Coupon {
  id: number;
  coupon_name: string;
}

//---------------------------------------------- OrderDelivery
export interface OrderDeliveryProps {
  checkoutData: OrderDeliveryCheckoutData;
  isPc: boolean;
  isTablet: boolean;
  isMobile: boolean;
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

export interface DeliveryRequirementOption {
  no: string;
  label: string;
  value: string;
  selected?: string;
}

//---------------------------------------------- OrderDeliveryForm
export interface OrderDeliveryFormProps {
  deliveryForm1: string;
  deliveryClassName: string;
  deliveryClassName1: string;
  checkoutId: number;
  handleRequirementOptionChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  deliverySecondRequirementOption: DeliveryRequirementOption[];
  deliverySecondRequirementWrite: string;
  requirement1: string;
}

export interface PreexistenceSelectProps {
  margin?: string;
  color?: string;
}

//---------------------------------------------- OrderDeliveryFormMobile
export interface OrderDeliveryFormMobileProps {
  deliveryWrapClass: string;
  handleDeliveryTabClick: (e: React.MouseEvent<HTMLUListElement>) => void;
  deliveryClassName: string;
  deliveryClassName1: string;
  checkoutData: DeliveryFormMobileCheckoutData;
  deliveryForm: string;
  handleRequirementOptionChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  deliveryFirstRequirementWrite: string;
  deliveryFirstRequirementOption: DeliveryRequirementOption[];
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
export interface OrderDeliveryFormPcProps {
  deliveryWrapClass: string;
  handleDeliveryTabClick: (e: React.MouseEvent<HTMLUListElement>) => void;
  deliveryClassName: string;
  deliveryClassName1: string;
  checkoutData: DeliveryFormPcCheckoutData;
  deliveryForm: string;
  handleRequirementOptionChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  deliveryFirstRequirementOption: DeliveryRequirementOption[];
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
export interface OrderDeliveryFormTabletProps {
  deliveryWrapClass: string;
  handleDeliveryTabClick: (e: React.MouseEvent<HTMLUListElement>) => void;
  deliveryClassName: string;
  deliveryClassName1: string;
  checkoutData: DeliveryFormTabletCheckoutData;
  deliveryForm: string;
  handleRequirementOptionChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  deliveryFirstRequirementWrite: string;
  deliveryFirstRequirementOption: DeliveryRequirementOption[];
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
export interface OrderDeliveryHeadProps {
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
export interface OrderPaymentItemProps {
  i: number;
  selected: boolean;
  item: Payment;
  handlePaymentMethod: (e: React.MouseEvent<HTMLLIElement>) => void;
  basePaymentClass: string;
  selectedPaymentClass: string;
}

export interface Payment {
  id: string;
  payment: string;
}

//---------------------------------------------- OrderTotal
export interface OrderTotalProps {
  checkoutData: OrderTotalCheckoutData;
  checkoutNumber: number;
  isPc: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

export interface OrderTotalCheckoutData {
  created_at: string;
  id: number;
  line_items: LineItem[];
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
export interface OrderTotalDetailProps {
  totalPrice: number;
  deliveryCharge: string;
  checkoutData: OrderTotalDetailCheckoutData;
  checkoutNumber: number;
  isPc: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

interface OrderTotalDetailCheckoutData {
  created_at: string;
  id: number;
  line_items: LineItem[];
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
