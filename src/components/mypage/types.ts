export interface IAddress {
  zonecode: string;
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

export interface IMyOrderList {
  checkout_id: number;
  created_at: string;
  line_items: ILineItem[];
  id: number;
  payment_method: string;
  shipping_address: IMyOrderCheckModalAddress;
  shipping_price: string;
  product_price: string;
  total_discount: string | number;
  total_price: string;
}

export interface ILineItem {
  image_src: string;
  product_id: number;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
  price: string;
}

export interface IMyShippingAddress {
  address1: string;
  address2: string;
  phone1: string;
  recipient_name: string;
  id: number;
}

export interface IMyOrderCheckModalAddress extends IMyShippingAddress {
  name?: string;
  note?: string;
  postal_code: string;
  request_note?: string;
}

export interface IDailyVisit {
  visit_count: number;
  visit_date: string;
}

export interface ICouponInfo {
  id: string | number;
  coupon_name: string;
}

export interface IMyData {
  coupons?: ICouponInfo[];
  email: string;
  id: number;
  mileage: number;
  name: string;
  social_user_id: 0 | string;
  user_id: string;
}

export interface IMyDetailData extends IMyData {
  shipping_address: IMyShippingAddress;
  rating: number;
}
