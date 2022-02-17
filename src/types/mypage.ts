// AddDeliveryAddressModal
export interface AddDeliveryAddressModalProps {
  addDeliveryClassName: string;
}

export interface Address {
  zonecode: string;
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

// MyOrderCheckModal
export interface MyOrderCheckModalProps {
  isOpen3: boolean;
  onRequestClose3: () => void;
  myOrderList: MyOrderList[];
  orderItemId?: number;
}

export interface MyOrderList {
  checkout_id: number;
  created_at: string;
  line_items: LineItems[];
  id: number;
  payment_method: string;
  shipping_address: MyOrderCheckModalAddress;
  shipping_price: string;
  product_price: string;
  total_discount: string | number;
  total_price: string;
}

export interface LineItems {
  image_src: string;
  price: string;
  product_id: number;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
}

export interface MyShippingAddressBasic {
  address1: string;
  address2: string;
  phone1: string;
  recipient_name: string;
}

export interface MyOrderCheckModalAddress extends MyShippingAddressBasic {
  name?: string;
  note?: string;
  postal_code: string;
  request_note?: string;
}

// MyPageChart
export interface MyPageChartProps {
  userName: string;
}

export interface VisitData {
  visit_count: number;
  visit_date: string;
}

// MyPageCouponModal
export interface MyPageCouponModalProps {
  isOpen2: boolean;
  onRequestClose2: () => void;
  myCoupon?: CouponInfo[];
}

export interface CouponInfo {
  id: string | number;
  coupon_name: string;
}

// MyPageDeliveryModal
export interface MyPageDeliveryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  myDeliveryAddress: MyDeliveryAddress;
}

export interface MyDeliveryAddress {
  address1: string;
  address2: string;
  phone1: string;
  recipient_name: string;
}

export interface DeliveryAddressItemProps {
  display: string;
}

export interface AddBtnProps {
  display: string;
}

export interface CancelRegistrationBtnProps {
  display: string;
}

export interface CloseBtnProps {
  display: string;
}

// MyPageInfo
export interface MyPageInfoProps {
  myData: MyData;
}

export interface MyData {
  coupons?: CouponInfo[];
  email: string;
  id: number;
  mileage: number;
  name: string;
  social_user_id: 0 | string;
  user_id: string;
}

// MyPageInfoDetail
export interface MyDetailData extends MyData {
  shipping_address: MyShippingAddressBasic;
  rating: number;
}

export interface MyPageInfoDetailProps {
  myData: MyDetailData;
}

export interface StarRatingProps {
  myRating: number;
}
