import { atom, atomFamily, selector } from "recoil";

import {
  ICouponStateSelector,
  IDeliveryInfoState,
  ITotalDetailSelector,
} from "types";

export const selectOptionState = atom<number>({
  key: "#selectOptionState",
  default: 0,
});

export const selectCouponIdState = atom<number>({
  key: "#selectCouponIdState",
  default: 0,
});

export const usedMileageState = atom<number>({
  key: "#usedMileageState",
  default: 0,
});

export const paymentState = atom<string>({
  key: "#paymentState",
  default: "",
});

export const finalPriceState = atom<number>({
  key: "#finalPriceState",
  default: 0,
});

export const agreeCheckedState = atom<boolean>({
  key: "#agreeCheckedState",
  default: false,
});

export const deliveryInfoState = atomFamily<IDeliveryInfoState, number>({
  key: "#deliveryInfoState",
  default: (id) => {
    return {
      id,
      designation: "",
      recipient: "",
      address1: "",
      addressDetail1: "",
      addressDetail2: "",
      tel1: "",
      tel2: "",
      tel3: "",
      tel4: "",
      tel5: "",
      tel6: "",
      requirement: "",
      requirement1: "",
      deliveryClassName: "",
      deliveryClassName1: "",
    };
  },
});

export const couponStateSelector = selector<ICouponStateSelector>({
  key: "#couponStateSelector",
  get: ({ get }) => {
    const selectOption = get(selectOptionState);
    const selectCouponId = get(selectCouponIdState);
    const usedMileage = get(usedMileageState);

    return { selectOption, selectCouponId, usedMileage };
  },
});

export const totalDetailSelector = selector<ITotalDetailSelector>({
  key: "#totalDetailSelector",
  get: ({ get }) => {
    const couponData = get(couponStateSelector);
    const agreeChecked = get(agreeCheckedState);
    const finalPrice = get(finalPriceState);

    return {
      selectCouponId: couponData.selectCouponId,
      usedMileage: couponData.usedMileage,
      agreeChecked: agreeChecked,
      finalPrice: finalPrice,
    };
  },
});
