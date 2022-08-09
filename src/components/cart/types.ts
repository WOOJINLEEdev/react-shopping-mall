export interface ICartItem {
  cart_id: number;
  id: number;
  product_id: number;
  product_image_src: string;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
  variant_price: string;
}

export interface IAddedCartItem extends ICartItem {
  checked: boolean;
}
