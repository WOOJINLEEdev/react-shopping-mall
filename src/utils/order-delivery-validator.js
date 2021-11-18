export function validateDeliveryInputCheck(checkoutTotalData) {
  if (
    !checkoutTotalData.recipient ||
    checkoutTotalData.recipient === undefined
  ) {
    return {
      valid: false,
      invalidMsg: "수령인을 입력해주세요.",
    };
  }

  if (checkoutTotalData.recipient && checkoutTotalData.recipient.length < 2) {
    return {
      valid: false,
      invalidMsg: "수령인은 2자 이상만 가능합니다.",
    };
  }

  if (
    !checkoutTotalData.addressDetail1 ||
    checkoutTotalData.addressDetail1 === undefined
  ) {
    return {
      valid: false,
      invalidMsg: "주소를 입력해주세요.",
    };
  }

  if (
    !checkoutTotalData.addressDetail2 ||
    checkoutTotalData.addressDetail2 === undefined
  ) {
    return {
      valid: false,
      invalidMsg: "상세주소를 입력해주세요.",
    };
  }

  if (
    !checkoutTotalData.tel1 ||
    checkoutTotalData.tel1 === undefined ||
    checkoutTotalData.tel2 === undefined ||
    checkoutTotalData.tel3 === undefined
  ) {
    return {
      valid: false,
      invalidMsg: "연락처1을 입력해주세요.",
    };
  }

  if (checkoutTotalData.tel1.length < 2) {
    return {
      valid: false,
      invalidMsg: "연락처 첫번째 칸은 2자리 이상 입력해주세요.",
    };
  }

  if (checkoutTotalData.tel2.length < 4) {
    return {
      valid: false,
      invalidMsg: "연락처 두번째 칸은 4자리를 입력해주세요.",
    };
  }

  if (checkoutTotalData.tel3.length < 4) {
    return {
      valid: false,
      invalidMsg: "연락처 세번째 칸은 4자리를 입력해주세요.",
    };
  }

  if (!checkoutTotalData.paymentName) {
    return {
      valid: false,
      invalidMsg: "결제방법을 선택해주세요.",
    };
  }

  if (checkoutTotalData.agreeChecked === false) {
    return {
      valid: false,
      invalidMsg: "주문 동의에 체크를 하셔야 주문이 가능합니다.",
    };
  }

  return {
    valid: true,
  };
}
