import { AxiosInstance } from "axios";

interface IAddToCartPayload {
  instance: AxiosInstance;
  items: ICartItem[];
}

interface ICartItem {
  product_id: number;
  variant_id: number | string;
  quantity: number;
}

export function addToCartApi({ instance, items }: IAddToCartPayload) {
  return instance.put("/v1/me/cart", { items });
}

interface IDeleteCartItemPayload {
  instance: AxiosInstance;
  cartItemId: number;
}

export function deleteCartItemApi({
  instance,
  cartItemId,
}: IDeleteCartItemPayload) {
  return instance.delete(`/v1/me/cart/items/${cartItemId}`);
}

interface IUpdateCartItemQuantityPayload {
  instance: AxiosInstance;
  itemId: number;
  quantity: number;
}

export function updateCartItemQuantityApi({
  instance,
  itemId,
  quantity,
}: IUpdateCartItemQuantityPayload) {
  return instance.patch(`/v1/me/cart/items/${itemId}/quantity`, {
    quantity: quantity,
  });
}
