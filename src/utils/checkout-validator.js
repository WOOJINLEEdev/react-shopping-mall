export function validateWhenExistOrderHistory(checkoutTotalData) {
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

  if (checkoutTotalData.privateAgreeChecked === false) {
    return {
      valid: false,
      invalidMsg: "개인정보 동의에 체크를 하셔야 주문이 가능합니다.",
    };
  }

  return {
    valid: true,
  };
}
