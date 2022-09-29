import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import * as Sentry from "@sentry/react";

import useMyCart from "hooks/api/useMyCart";
import useHttpClient from "hooks/useHttpClient";
import { SentryError } from "utils/error";
import {
  deleteCartItemApi,
  updateCartItemQuantityApi,
  createCheckoutsApi,
} from "api";

import CartHead from "components/cart/CartHead";
import CartList from "components/cart/CartList";
import CartDetail from "components/cart/CartDetail";
import CartBuyBtn from "components/cart/CartBuyBtn";
import SnackBar from "components/common/SnackBar";
import { IAddedCartItem } from "components/cart/types";

const Cart = () => {
  const [chkId, setChkId] = useState("");
  const [allChecked, setAllChecked] = useState(true);
  const [open, setOpen] = useState(false);

  const message = "선택하신 상품이 삭제되었습니다.";

  const navigate = useNavigate();
  const { cart, mutateCart } = useMyCart();
  const instance = useHttpClient();

  const items: IAddedCartItem[] = cart.items;

  const handleItemRemoveBtnClick = async (e: MouseEvent<HTMLInputElement>) => {
    const cartItemId = Number((e.currentTarget as HTMLInputElement).name);

    try {
      await deleteCartItemApi({ instance, cartItemId });
      mutateCart(null, true);
      setOpen((prev) => !prev);
    } catch (err) {
      Sentry.captureException(new SentryError(err as Error));
    }
  };

  const handleQuantity = async (itemId: number, quantity: number) => {
    try {
      await updateCartItemQuantityApi({ instance, itemId, quantity });
      mutateCart(
        {
          ...cart,
          items: items.map((cartItem: IAddedCartItem) => ({
            ...cartItem,
            quantity: cartItem.id === itemId ? quantity : cartItem.quantity,
          })),
        },
        false,
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        err = err as AxiosError;

        if (err.response?.status === 400 || err.response?.status === 500) {
          alert(err.response?.data.error.message);
        }
      }

      Sentry.captureException(new SentryError(err as Error));
    }
  };

  const checkedItems: IAddedCartItem[] = cart.items.filter(
    (item: IAddedCartItem) => item.checked,
  );
  const numCheckedTotalItem = checkedItems.length;
  const totalPrice = checkedItems
    .map((item: IAddedCartItem) => Number(item.variant_price) * item.quantity)
    .reduce((sum: number, itemPrice: number) => sum + itemPrice, 0);

  if (totalPrice < 70000) {
    localStorage.setItem("delivery", "3000");
  } else {
    localStorage.setItem("delivery", "0");
  }

  if (totalPrice === 0) {
    localStorage.setItem("delivery", "0");
  }

  const deliveryCharge = localStorage.getItem("delivery") || "";
  const finalPrice = totalPrice + Number(deliveryCharge);

  const handleCartItemAllCheck = (checked: boolean) => {
    mutateCart(
      {
        ...cart,
        items: items.map((item: IAddedCartItem) => {
          const newItem = { ...item };
          newItem.checked = !checked;

          return newItem;
        }),
      },
      false,
    );
  };

  const handleAllCheckChange = () => {
    handleCartItemAllCheck(allChecked);
    setAllChecked((value) => !value);
  };

  const handleCartItemCheck = (cartItemIndex: number) => {
    const newCart = {
      ...cart,
      items: items.map((cartItem: IAddedCartItem, index: number) => ({
        ...cartItem,
        checked: cartItemIndex === index ? !cartItem.checked : cartItem.checked,
      })),
    };

    mutateCart(newCart, false);
    const isSomeUnchecked =
      newCart.items.filter((item: IAddedCartItem) => !item.checked).length > 0;
    if (isSomeUnchecked) {
      setAllChecked(false);
    }

    const isAllChecked =
      newCart.items.filter((item: IAddedCartItem) => item.checked).length ===
      newCart.items.length;
    if (isAllChecked) {
      setAllChecked(true);
    }
  };

  const handleBuyBtnClick = async () => {
    const checkedLineItems = cart.items
      .filter((item: IAddedCartItem) => item.checked)
      .map((item: IAddedCartItem) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
      }));

    try {
      const res = await createCheckoutsApi({
        instance,
        lineItems: checkedLineItems,
      });
      setChkId(res.data.checkout_id);
      navigate(`/checkout/${res.data.checkout_id}`);
    } catch (err) {
      Sentry.captureException(new SentryError(err as Error));
    }
  };

  const handleListBuyBtnClick = async (
    item: IAddedCartItem,
    quantity: number,
  ) => {
    if (Number(item.variant_price) * item.quantity < 70000) {
      localStorage.setItem("delivery", "3000");
    } else {
      localStorage.setItem("delivery", "0");
    }

    try {
      const res = await createCheckoutsApi({
        instance,
        lineItems: [
          {
            variant_id: item.variant_id,
            quantity: quantity,
          },
        ],
      });
      navigate(`/checkout/${res.data.checkout_id}`);
    } catch (err) {
      Sentry.captureException(new SentryError(err as Error));
    }
  };

  const handleChoiceItemRemoveBtnClick = async () => {
    const chkItems = cart.items.filter((item: IAddedCartItem) => item.checked);

    const chkItemIds = chkItems.map((item: IAddedCartItem) => item.id);
    try {
      await Promise.all(
        chkItemIds.map((cartItemId: number) =>
          deleteCartItemApi({ instance, cartItemId }),
        ),
      );
      mutateCart(null, true);
      setAllChecked(true);
      setOpen((prev) => !prev);
    } catch (err) {
      Sentry.captureException(new SentryError(err as Error));
    }
  };

  return (
    <section className="order_info">
      <CartHead
        items={items}
        allChecked={allChecked}
        handleAllCheckChange={handleAllCheckChange}
        handleChoiceItemRemoveBtnClick={handleChoiceItemRemoveBtnClick}
      />

      <CartList
        items={items}
        handleCartItemCheck={handleCartItemCheck}
        handleItemRemoveBtnClick={handleItemRemoveBtnClick}
        handleQuantity={handleQuantity}
        handleListBuyBtnClick={handleListBuyBtnClick}
      />

      <CartDetail
        items={items}
        totalPrice={totalPrice}
        finalPrice={finalPrice}
        deliveryCharge={deliveryCharge}
      />

      <CartBuyBtn
        handleBuyBtnClick={handleBuyBtnClick}
        disabled={!(numCheckedTotalItem >= 1)}
      />

      <SnackBar
        open={open}
        autoHideDuration={3000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </section>
  );
};

export default Cart;
