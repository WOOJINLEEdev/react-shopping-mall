import { atom } from "recoil";

export const searchWrapState = atom<boolean>({
  key: "#searchWrapState",
  default: false,
});
