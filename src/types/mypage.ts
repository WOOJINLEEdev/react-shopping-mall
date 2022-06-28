// AddDeliveryAddressModal
export interface IAddDeliveryAddressModalProps {
  addDeliveryClassName: string;
  myDeliveryAddressId: number;
}

export interface IAddress {
  zonecode: string;
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

// MyOrderCheckModal
export interface IMyOrderCheckModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  myOrderList: IMyOrderList[];
  orderItemId?: number;
}

export interface IMyOrderList {
  checkout_id: number;
  created_at: string;
  line_items: ILineItems[];
  id: number;
  payment_method: string;
  shipping_address: MyOrderCheckModalAddress;
  shipping_price: string;
  product_price: string;
  total_discount: string | number;
  total_price: string;
}

export interface ILineItems {
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
  id: number;
}

export interface MyOrderCheckModalAddress extends MyShippingAddressBasic {
  name?: string;
  note?: string;
  postal_code: string;
  request_note?: string;
}

// MyPageChart
export interface IMyPageChartProps {
  userName: string;
}

export interface IDailyVisit {
  visit_count: number;
  visit_date: string;
}

// MyPageCouponModal
export interface IMyPageCouponModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  myCoupon?: ICouponInfo[];
}

export interface ICouponInfo {
  id: string | number;
  coupon_name: string;
}

// MyPageDeliveryModal
export interface IMyPageDeliveryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  myDeliveryAddress?: MyDeliveryAddress;
}

export interface MyDeliveryAddress {
  address1: string;
  address2: string;
  phone1: string;
  recipient_name: string;
  id: number;
}

export interface IDeliveryAddressItemProps {
  display: string;
}

export interface IAddBtnProps {
  display: string;
}

export interface ICancelRegistrationBtnProps {
  display: string;
}

export interface ICloseBtnProps {
  display: string;
}

// MyPageInfo
export interface IMyPageInfoProps {
  myData: IMyData;
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

// MyPageInfoDetail
export interface MyDetailData extends IMyData {
  shipping_address: MyShippingAddressBasic;
  rating: number;
}

export interface IMyPageInfoDetailProps {
  myData: MyDetailData;
}

export interface IStarRatingProps {
  myRating: number;
}
