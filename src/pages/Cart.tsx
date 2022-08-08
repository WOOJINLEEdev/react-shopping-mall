import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import useMyCart, { ICartItem } from "hooks/api/useMyCart";
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

export interface IItem extends ICartItem {
  checked: boolean;
}

const Cart = () => {
  const [chkId, setChkId] = useState("");
  const [allChecked, setAllChecked] = useState(true);
  const [open, setOpen] = useState(false);

  const message = "선택하신 상품이 삭제되었습니다.";

  const navigate = useNavigate();
  const { cart, mutateCart } = useMyCart();

  const items: IItem[] = cart.items;

  const handleItemRemoveBtnClick = async (e: MouseEvent<HTMLInputElement>) => {
    const cartItemId = Number((e.currentTarget as HTMLInputElement).name);

    try {
      await deleteCartItemApi({ cartItemId });
      mutateCart(null, true);
      setOpen((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuantity = async (itemId: number, quantity: number) => {
    try {
      await updateCartItemQuantityApi({ itemId, quantity });
      mutateCart(
        {
          ...cart,
          items: items.map((cartItem: IItem) => ({
            ...cartItem,
            quantity: cartItem.id === itemId ? quantity : cartItem.quantity,
          })),
        },
        false,
      );
    } catch (err) {
      console.log(err);
    }
  };

  const checkedItems: IItem[] = cart.items.filter(
    (item: IItem) => item.checked,
  );
  const numCheckedTotalItem = checkedItems.length;
  const totalPrice = checkedItems
    .map((item: IItem) => Number(item.variant_price) * item.quantity)
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
        items: items.map((item: IItem) => {
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
      items: items.map((cartItem: IItem, index: number) => ({
        ...cartItem,
        checked: cartItemIndex === index ? !cartItem.checked : cartItem.checked,
      })),
    };

    mutateCart(newCart, false);
    const isSomeUnchecked =
      newCart.items.filter((item: IItem) => !item.checked).length > 0;
    if (isSomeUnchecked) {
      setAllChecked(false);
    }

    const isAllChecked =
      newCart.items.filter((item: IItem) => item.checked).length ===
      newCart.items.length;
    if (isAllChecked) {
      setAllChecked(true);
    }
  };

  const handleBuyBtnClick = async () => {
    const checkedLineItems = cart.items
      .filter((item: IItem) => item.checked)
      .map((item: IItem) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
      }));

    try {
      const res = await createCheckoutsApi({
        lineItems: checkedLineItems,
      });
      setChkId(res.data.checkout_id);
      navigate(`/checkout/${res.data.checkout_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleListBuyBtnClick = async (item: IItem, quantity: number) => {
    if (Number(item.variant_price) * item.quantity < 70000) {
      localStorage.setItem("delivery", "3000");
    } else {
      localStorage.setItem("delivery", "0");
    }

    try {
      const res = await createCheckoutsApi({
        lineItems: [
          {
            variant_id: item.variant_id,
            quantity: quantity,
          },
        ],
      });
      navigate(`/checkout/${res.data.checkout_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoiceItemRemoveBtnClick = async () => {
    const chkItems = cart.items.filter((item: IItem) => item.checked);

    for (const chkItem of chkItems) {
      let cartItemId: number = chkItem.id;

      try {
        await deleteCartItemApi({ cartItemId });
        mutateCart(null, true);
        setAllChecked(true);
        setOpen((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
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
