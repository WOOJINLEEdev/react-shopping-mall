import CheckoutValidator from "./checkout-validator";

describe("CheckoutValidator", () => {
  describe("validateWhenExistOrderHistory", () => {
    it("만약 결제수단이 비어있으면, invalid하고 '결제방법을 선택해주세요'는 메시지를 반환해야 한다.", () => {
      // given
      const checkoutTotalData = {};

      // when
      const { valid, invalidMsg } =
        CheckoutValidator.validateWhenExistOrderHistory(checkoutTotalData);

      // then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe("결제방법을 선택해주세요.");
    });

    it("만약 주문 동의에 체크하지 않았으면, invalid하고 '주문 동의에 체크를 하셔야 주문이 가능합니다'는 메시지를 반환해야 한다.", () => {
      // given
      const checkoutTotalData = {
        paymentName: "신용/체크카드",
        agreeChecked: false,
      };

      // when
      const { valid, invalidMsg } =
        CheckoutValidator.validateWhenExistOrderHistory(checkoutTotalData);

      // then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe("주문 동의에 체크를 하셔야 주문이 가능합니다.");
    });

    it("만약 개인정보 동의에 체크하지 않았으면, invalid하고 '개인정보 동의에 체크를 하셔야 주문이 가능합니다'는 메시지를 반환해야 한다.", () => {
      // given
      const checkoutTotalData = {
        paymentName: "신용/체크카드",
        agreeChecked: true,
        privateAgreeChecked: false,
      };

      // when
      const { valid, invalidMsg } =
        CheckoutValidator.validateWhenExistOrderHistory(checkoutTotalData);

      // then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe(
        "개인정보 동의에 체크를 하셔야 주문이 가능합니다."
      );
    });

    it("만약 유효하면, valid를 반환해야 한다.", () => {
      // given
      const checkoutTotalData = {
        paymentName: "신용/체크카드",
        agreeChecked: true,
      };

      // when
      const { valid } =
        CheckoutValidator.validateWhenExistOrderHistory(checkoutTotalData);

      // then
      expect(valid).toBeTruthy();
    });
  });
});
