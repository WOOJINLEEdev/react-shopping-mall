import { atomFamily } from "recoil";

import { ICurBoardState } from "types";

export const curBoardState = atomFamily<ICurBoardState, string>({
  key: "#curBoardState",
  default: (type) => {
    return {
      type,
      pageNumber: 1,
    };
  },
});
