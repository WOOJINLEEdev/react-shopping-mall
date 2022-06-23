interface IValidateCheckoutProps {
  checkoutDeliveryData: IDeliveryData;
  checkoutPaymentData: string;
  checkoutTotalDetailData: ITotalDetailData;
}

interface IDeliveryData {
  address1?: string;
  addressDetail1?: string;
  addressDetail2?: string;
  deliveryClassName?: string;
  deliveryClassName1?: string;
  designation?: string;
  recipient?: string;
  requirement?: string;
  requirement1?: string;
  tel1?: string;
  tel2?: string;
  tel3?: string;
  tel4?: string;
  tel5?: string;
  tel6?: string;
}

interface ITotalDetailData {
  agreeChecked?: boolean;
  finalPrice?: string | number;
  selectCouponId?: number;
  usedMileage?: string | number;
}

export function validateCheckout({
  checkoutDeliveryData,
  checkoutPaymentData,
  checkoutTotalDetailData,
}: IValidateCheckoutProps) {
  if (checkoutDeliveryData.deliveryClassName === "delivery_write selected") {
    if (!checkoutPaymentData) {
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
    checkoutDeliveryData.deliveryClassName === "delivery_write" ||
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

    if (!checkoutDeliveryData.tel1) {
      return {
        valid: false,
        invalidMsg: "연락처 첫번째 칸을 입력해주세요.",
      };
    }

    if (checkoutDeliveryData.tel1.length < 2) {
      return {
        valid: false,
        invalidMsg: "연락처 첫번째 칸은 2자리 이상 입력해주세요.",
      };
    }

    if (!checkoutDeliveryData.tel2) {
      return {
        valid: false,
        invalidMsg: "연락처 두번째 칸을 입력해주세요.",
      };
    }

    if (checkoutDeliveryData.tel2.length < 4) {
      return {
        valid: false,
        invalidMsg: "연락처 두번째 칸은 4자리를 입력해주세요.",
      };
    }

    if (!checkoutDeliveryData.tel3) {
      return {
        valid: false,
        invalidMsg: "연락처 세번째 칸을 입력해주세요.",
      };
    }

    if (checkoutDeliveryData.tel3.length < 4) {
      return {
        valid: false,
        invalidMsg: "연락처 세번째 칸은 4자리를 입력해주세요.",
      };
    }

    if (!checkoutPaymentData) {
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
