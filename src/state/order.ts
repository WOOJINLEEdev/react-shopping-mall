import { atom, atomFamily, selector } from "recoil";

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

export interface IDeliveryInfoState {
  designation?: string;
  recipient: string;
  address1: string;
  addressDetail1: string;
  addressDetail2: string;
  tel1: string;
  tel2: string;
  tel3: string;
  tel4?: string;
  tel5?: string;
  tel6?: string;
  requirement?: string;
  requirement1?: string;
  deliveryClassName: string;
  deliveryClassName1: string;
}

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

interface ICouponStateSelector {
  selectOption: number;
  selectCouponId: number;
  usedMileage: number;
}

export const couponStateSelector = selector<ICouponStateSelector>({
  key: "#couponStateSelector",
  get: ({ get }) => {
    const selectOption = get(selectOptionState);
    const selectCouponId = get(selectCouponIdState);
    const usedMileage = get(usedMileageState);

    return { selectOption, selectCouponId, usedMileage };
  },
});

interface ITotalDetailSelector {
  selectCouponId: number;
  usedMileage: number;
  agreeChecked: boolean;
  finalPrice: number;
}

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
