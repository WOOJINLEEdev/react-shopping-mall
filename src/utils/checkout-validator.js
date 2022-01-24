export function validateCheckout(
  checkoutDeliveryData,
  checkoutPaymentData,
  checkoutTotalDetailData
) {
  if (checkoutDeliveryData.deliveryClassName === "delivery_write old") {
    if (!checkoutPaymentData.paymentName) {
      return {
        valid: false,
        invalidMsg: "결제방법을 선택해주세요.",
      };
    }

    if (checkoutTotalDetailData.agreeChecked === false) {
      return {
        valid: false,
        invalidMsg: "주문 동의에 체크를 하셔야 주문이 가능합니다.",
      };
    }
  }

  if (
    checkoutDeliveryData.deliveryClassName === "delivery_write new" ||
    checkoutDeliveryData.deliveryClassName === "delivery_write disabled"
  ) {
    if (
      !checkoutDeliveryData.recipient ||
      checkoutDeliveryData.recipient === undefined
    ) {
      return {
        valid: false,
        invalidMsg: "수령인을 입력해주세요.",
      };
    }

    if (
      checkoutDeliveryData.recipient &&
      checkoutDeliveryData.recipient.length < 2
    ) {
      return {
        valid: false,
        invalidMsg: "수령인은 2자 이상만 가능합니다.",
      };
    }

    if (!checkoutDeliveryData.addressDetail1) {
      return {
        valid: false,
        invalidMsg: "주소를 입력해주세요.",
      };
    }

    if (!checkoutDeliveryData.addressDetail2) {
      return {
        valid: false,
        invalidMsg: "상세주소를 입력해주세요.",
      };
    }

    if (checkoutDeliveryData.tel1.length < 2) {
      return {
        valid: false,
        invalidMsg: "연락처 첫번째 칸은 2자리 이상 입력해주세요.",
      };
    }

    if (checkoutDeliveryData.tel2.length < 4) {
      return {
        valid: false,
        invalidMsg: "연락처 두번째 칸은 4자리를 입력해주세요.",
      };
    }

    if (checkoutDeliveryData.tel3.length < 4) {
      return {
        valid: false,
        invalidMsg: "연락처 세번째 칸은 4자리를 입력해주세요.",
      };
    }

    if (!checkoutPaymentData.paymentName) {
      return {
        valid: false,
        invalidMsg: "결제방법을 선택해주세요.",
      };
    }

    if (checkoutTotalDetailData.agreeChecked === false) {
      return {
        valid: false,
        invalidMsg: "주문 동의에 체크를 하셔야 주문이 가능합니다.",
      };
    }
  }

  return {
    valid: true,
  };
}
