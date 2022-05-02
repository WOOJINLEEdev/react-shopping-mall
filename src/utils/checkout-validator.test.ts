import { validateCheckout } from "utils/checkout-validator";

describe("CheckoutValidator", () => {
  describe("validateCheckout", () => {
    describe("기존 배송지 선택", () => {
      it("만약 결제수단이 비어있으면, invalid하고 '결제방법을 선택해주세요'는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write selected",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("결제방법을 선택해주세요.");
      });
      it("만약 주문 동의에 체크하지 않았으면, invalid하고 '주문 동의에 체크를 하셔야 주문이 가능합니다'는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write selected",
        };
        const checkoutPaymentData = "신용/체크카드";
        const checkoutTotalDetailData = { agreeChecked: false };

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("주문 동의에 체크를 하셔야 주문이 가능합니다.");
      });

      it("만약 유효하면, valid를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write selected",
        };
        const checkoutPaymentData = "신용/체크카드";
        const checkoutTotalDetailData = { agreeChecked: true };

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeTruthy();
      });
    });

    describe("신규 입력 선택", () => {
      it("만약 수령인을 입력하지 않았다면, invalid하고 '수령인을 입력해주세요.'라는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("수령인을 입력해주세요.");
      });
      it("만약 수령인을 2글자 이상 입력하지 않았다면, invalid하고 '수령인은 2자 이상만 가능합니다.'라는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("수령인은 2자 이상만 가능합니다.");
      });
      it("만약 주소를 입력하지 않았다면, invalid하고 '주소를 입력해주세요.'라는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이이",
          addressDetail1: "",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("주소를 입력해주세요.");
      });
      it("만약 상세주소를 입력하지 않았다면, invalid하고 '상세주소를 입력해주세요.'라는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이이",
          addressDetail1: "서울특별시 ㅇㅇ구 ㅇㅇ동",
          addressDetail2: "",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("상세주소를 입력해주세요.");
      });
      it("만약 연락처 첫번째 칸을 입력하지 않았다면, invalid하고 '연락처 첫번째 칸은 2자리 이상 입력해주세요.'라는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이이",
          addressDetail1: "서울특별시 ㅇㅇ구 ㅇㅇ동",
          addressDetail2: "ㅇㅇㅇ",
          tel1: "",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("연락처 첫번째 칸을 입력해주세요.");
      });
      it("만약 연락처 첫번째 칸을 숫자 하나만 입력했다면, invalid하고 '연락처 첫번째 칸은 2자리 이상 입력해주세요.'라는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이이",
          addressDetail1: "서울특별시 ㅇㅇ구 ㅇㅇ동",
          addressDetail2: "ㅇㅇㅇ",
          tel1: "1",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("연락처 첫번째 칸은 2자리 이상 입력해주세요.");
      });
      it("만약 연락처 두번째 칸을 입력하지 않았다면, invalid하고 '연락처 두번째 칸은 4자리를 입력해주세요.'라는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이이",
          addressDetail1: "서울특별시 ㅇㅇ구 ㅇㅇ동",
          addressDetail2: "ㅇㅇㅇ",
          tel1: "02",
          tel2: "",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("연락처 두번째 칸을 입력해주세요.");
      });
      it("만약 연락처 두번째 칸을 3자리로 입력했을 경우, invalid하고 '연락처 두번째 칸은 4자리를 입력해주세요.'라는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이이",
          addressDetail1: "서울특별시 ㅇㅇ구 ㅇㅇ동",
          addressDetail2: "ㅇㅇㅇ",
          tel1: "02",
          tel2: "111",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("연락처 두번째 칸은 4자리를 입력해주세요.");
      });
      it("만약 연락처 세번째 칸을 입력하지 않았다면, invalid하고 '연락처 세번째 칸은 4자리를 입력해주세요.'라는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이이",
          addressDetail1: "서울특별시 ㅇㅇ구 ㅇㅇ동",
          addressDetail2: "ㅇㅇㅇ",
          tel1: "02",
          tel2: "1111",
          tel3: "",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("연락처 세번째 칸을 입력해주세요.");
      });
      it("만약 연락처 세번째 칸을 3자리로 입력했을 경우, invalid하고 '연락처 세번째 칸은 4자리를 입력해주세요.'라는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이이",
          addressDetail1: "서울특별시 ㅇㅇ구 ㅇㅇ동",
          addressDetail2: "ㅇㅇㅇ",
          tel1: "02",
          tel2: "1111",
          tel3: "111",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("연락처 세번째 칸은 4자리를 입력해주세요.");
      });

      it("만약 결제수단이 비어있으면, invalid하고 '결제방법을 선택해주세요'는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이이",
          addressDetail1: "서울특별시 ㅇㅇ구 ㅇㅇ동",
          addressDetail2: "ㅇㅇㅇ",
          tel1: "02",
          tel2: "1111",
          tel3: "1111",
        };
        const checkoutPaymentData = "";
        const checkoutTotalDetailData = {};

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("결제방법을 선택해주세요.");
      });
      it("만약 주문 동의에 체크하지 않았으면, invalid하고 '주문 동의에 체크를 하셔야 주문이 가능합니다'는 메시지를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이이",
          addressDetail1: "서울특별시 ㅇㅇ구 ㅇㅇ동",
          addressDetail2: "ㅇㅇㅇ",
          tel1: "02",
          tel2: "1111",
          tel3: "1111",
        };
        const checkoutPaymentData = "신용/체크카드";
        const checkoutTotalDetailData = { agreeChecked: false };

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeFalsy();
        expect(invalidMsg).toBe("주문 동의에 체크를 하셔야 주문이 가능합니다.");
      });

      it("만약 유효하면, valid를 반환해야 한다.", () => {
        // given
        const checkoutDeliveryData = {
          deliveryClassName: "delivery_write",
          recipient: "이이",
          addressDetail1: "서울특별시 ㅇㅇ구 ㅇㅇ동",
          addressDetail2: "ㅇㅇㅇ",
          tel1: "02",
          tel2: "1111",
          tel3: "1111",
        };
        const checkoutPaymentData = "신용/체크카드";
        const checkoutTotalDetailData = { agreeChecked: true };

        // when
        const { valid, invalidMsg } = validateCheckout({
          checkoutDeliveryData,
          checkoutPaymentData,
          checkoutTotalDetailData,
        });

        // then
        expect(valid).toBeTruthy();
      });
    });
  });
});
