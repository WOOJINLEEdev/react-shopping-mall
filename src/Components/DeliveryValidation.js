import * as Yup from "yup";

export function deliveryName() {
  return Yup.string("")
    .min(2, "2자 이상 입력해주세요.")
    .max(6, "최대 6자 입력할 수 있습니다.")
    .required("수령인을 입력해주세요.");
}

export function deliveryAddress() {
  return Yup.string("").min(1).required("주소를 입력해주세요.");
}

export function phoneNumber() {
  Yup.string("")
    .matches(
      /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
      "Invalid phone number"
    )
    .required("Phone number is required");
}
