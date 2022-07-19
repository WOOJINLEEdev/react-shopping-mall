import * as Yup from "yup";

export function userId() {
  return Yup.string()
    .min(4, "4글자 이상 입력해주세요.")
    .required("아이디를 입력해주세요.");
}

export function userPassword() {
  let pw1 = /^(?=.*[a-z])(?=.*[0-9]).{8,16}$/;
  let pw2 = /^(?=.*[a-z])(?=.*[^a-z0-9]).{8,16}$/;
  let pw3 = /^(?=.*[a-z0-9])(?=.*[0-9]).{8,16}$/;

  return Yup.string()
    .matches(pw1 || pw2 || pw3, {
      message: "비밀번호는 영문숫자 조합 8~16자리 입니다.",
    })
    .required("비밀번호를 입력해주세요.");
}

export function userPasswordCheck() {
  return Yup.string()
    .oneOf([Yup.ref("password1"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호를 입력해주세요.");
}

export function userName() {
  return Yup.string().required("이름을 입력해주세요.");
}

export function userMonth() {
  return Yup.number()
    .moreThan(0, "최소 1 이상 입력해주세요.")
    .lessThan(13, "월은 최대 12까지만 입력할 수 있습니다.")
    .required("월을 입력해주세요.");
}

export function userDate() {
  return Yup.number()
    .moreThan(0, "최소 1 이상 입력해주세요.")
    .lessThan(32, "일은 최대 31까지만 입력할 수 있습니다.")
    .required("일을 입력해주세요.");
}

export function userEmail() {
  const regexEmail =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  return Yup.string()
    .matches(regexEmail, {
      message: "유효하지 않은 이메일 주소입니다.",
    })
    .required("이메일을 입력해주세요.");
}
