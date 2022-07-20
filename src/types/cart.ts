import { MouseEvent } from "react";

import { IItem } from "pages/Cart";

// CartHead
export interface ICartHead {
  items: IItem[];
  allChecked: boolean;
  handleAllCheckChange: () => void;
  handleChoiceItemRemoveBtnClick: () => Promise<void>;
}

// CartList
export interface ICartList {
  items: IItem[];
  handleCartItemCheck: (cartItemIndex: number) => void;
  handleItemRemoveBtnClick: (e: MouseEvent<HTMLInputElement>) => Promise<void>;
  handleQuantity: (itemId: number, quantity: number) => Promise<void>;
  handleListBuyBtnClick: (item: IItem, quantity: number) => Promise<void>;
}

// CartDetail
export interface ICartDetail {
  items: IItem[];
  totalPrice: number;
  finalPrice: number;
  deliveryCharge: string;
}

// CartBuyBt
export interface ICartBuyBtn {
  handleBuyBtnClick: () => Promise<void>;
  disabled?: boolean;
}
