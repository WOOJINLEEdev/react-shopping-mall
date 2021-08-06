import * as Yup from "yup";

export function userId() {
  return Yup.string("")
    .min(4, "4글자 이상 입력해주세요")
    .required("아이디를 입력해주세요.");
}

export function userPassword() {
  let pw1 = /^(?=.*[a-z])(?=.*[0-9]).{8,16}$/;
  let pw2 = /^(?=.*[a-z])(?=.*[^a-z0-9]).{8,16}$/;
  let pw3 = /^(?=.*[a-z0-9])(?=.*[0-9]).{8,16}$/;

  return Yup.string("")
    .matches(pw1 || pw2 || pw3, {
      message: "비밀번호는 영문숫자 조합 8~16자리 입니다.",
    })
    .required("비밀번호를 입력해주세요.");
}

export function userName() {
  return Yup.string("").required("이름을 입력해주세요.");
}

export function userBirthDay(dateType) {
  return Yup.string("").max(2).required(`${dateType}을 입력해주세요.`);
}

export function userEmail() {
  return Yup.string("")
    .email("유효하지 않은 이메일 주소입니다.")
    .required("이메일을 입력해주세요.");
}
