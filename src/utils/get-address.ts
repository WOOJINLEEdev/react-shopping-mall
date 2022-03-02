import { Address } from "types";

export const getFullAddress = (data: Address) => {
  let fullAddress = data.address;
  let extraAddress = "";

  if (data.buildingName !== "") {
    extraAddress =
      data.bname !== ""
        ? `${data.bname}, ${data.buildingName}`
        : data.buildingName;

    fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  }

  console.log("get address", data);

  return fullAddress;
};
