import { instance } from "utils/http-client";

export function addToCartApi({ items }) {
  return instance.put("/v1/me/cart", items);
}

export function deleteCartItemApi({ targetName }) {
  return instance.delete(`/v1/me/cart/items/${targetName}`);
}

export function updateCartItemQuantityApi({ itemId, quantity }) {
  return instance.patch(`/v1/me/cart/items/${itemId}/quantity`, {
    quantity: quantity,
  });
}
