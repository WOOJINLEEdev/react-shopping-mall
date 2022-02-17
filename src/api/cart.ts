import { instance } from "utils/http-client";

interface AddToCartPayload {
  items: CartItem[];
}

interface CartItem {
  product_id: number;
  variant_id: number | string;
  quantity: number;
}

export function addToCartApi({ items }: AddToCartPayload) {
  return instance.put("/v1/me/cart", { items });
}

interface DeleteCartItemPayload {
  cartItemId: number;
}

export function deleteCartItemApi({ cartItemId }: DeleteCartItemPayload) {
  return instance.delete(`/v1/me/cart/items/${cartItemId}`);
}

interface UpdateCartItemQuantityPayload {
  itemId: number;
  quantity: number;
}

export function updateCartItemQuantityApi({
  itemId,
  quantity,
}: UpdateCartItemQuantityPayload) {
  return instance.patch(`/v1/me/cart/items/${itemId}/quantity`, {
    quantity: quantity,
  });
}
