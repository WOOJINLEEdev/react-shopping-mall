import { atomFamily } from "recoil";

interface ICurBoardState {
  pageNumber: number;
}

export const curBoardState = atomFamily<ICurBoardState, string>({
  key: "#curBoardState",
  default: (type) => {
    return {
      type,
      pageNumber: 1,
    };
  },
});
