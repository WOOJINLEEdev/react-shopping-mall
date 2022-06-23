import { atom } from "recoil";

export const headerItemState = atom<string>({
  key: "#headerItemState",
  default: "",
});

export const menuState = atom<boolean>({
  key: "#menuState",
  default: false,
});
