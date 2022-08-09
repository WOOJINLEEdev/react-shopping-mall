import { IAddress } from "components/mypage/types";

export const getFullAddress = (data: IAddress) => {
  let fullAddress = data.address;
  let extraAddress = "";

  if (data.buildingName !== "") {
    extraAddress =
      data.bname !== ""
        ? `${data.bname}, ${data.buildingName}`
        : data.buildingName;

    fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  }

  return fullAddress;
};
