import { atomFamily } from "recoil";

import { IDeliveryInfoState } from "state/order";

export const myDeliveryInfoState = atomFamily<IDeliveryInfoState, number>({
  key: "#myDeliveryInfoState",
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
