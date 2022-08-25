import { instance } from "utils/http-client";

interface IAddToCartPayload {
  items: ICartItem[];
}

interface ICartItem {
  product_id: number;
  variant_id: number | string;
  quantity: number;
}

export function addToCartApi({ items }: IAddToCartPayload) {
  return instance.put("/v1/me/cart", { items });
}

interface IDeleteCartItemPayload {
  cartItemId: number;
}

export function deleteCartItemApi({ cartItemId }: IDeleteCartItemPayload) {
  return instance.delete(`/v1/me/cart/items/${cartItemId}`);
}

interface IUpdateCartItemQuantityPayload {
  itemId: number;
  quantity: number;
}

export function updateCartItemQuantityApi({
  itemId,
  quantity,
}: IUpdateCartItemQuantityPayload) {
  return instance.patch(`/v1/me/cart/items/${itemId}/quantity`, {
    quantity: quantity,
  });
}
