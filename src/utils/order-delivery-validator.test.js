import OrderDeliveryValidator from "./order-delivery-validator";

describe("OrderDeliveryValidator", () => {
  describe("validateDeliveryInputCheck", () => {
    it("수령인 정보가 없으면, invalid하고 '수령인을 입력해주세요.' 메시지를 반환해야 한다.", () => {
      // given
      const checkoutTotalData = {};

      // when
      const { valid, invalidMsg } =
        OrderDeliveryValidator.validateDeliveryInputCheck(checkoutTotalData);

      // then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe("수령인을 입력해주세요.");
    });

    it("수령인 글자 수가 2자 미만이면, invalid하고 '수령인은 2자 이상만 가능합니다.' 메시지를 반환해야 한다.", () => {
      //given
      const checkoutTotalData = { recipient: "이" };

      //when
      const { valid, invalidMsg } =
        OrderDeliveryValidator.validateDeliveryInputCheck(checkoutTotalData);

      //then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe("수령인은 2자 이상만 가능합니다.");
    });

    it("주소 정보가 없으면, invalid하고 '주소를 입력해주세요.' 메시지를 반환해야 한다.", () => {
      //given
      const checkoutTotalData = { recipient: "이이" };

      //when
      const { valid, invalidMsg } =
        OrderDeliveryValidator.validateDeliveryInputCheck(checkoutTotalData);

      //then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe("주소를 입력해주세요.");
    });

    it("상세주소 정보가 없으면, invalid하고 '상세주소를 입력해주세요.' 메시지를 반환해야 한다.", () => {
      //given
      const checkoutTotalData = {
        recipient: "이이",
        addressDetail1: "서울특별시 xx구 xx동 xx-xx",
      };

      //when
      const { valid, invalidMsg } =
        OrderDeliveryValidator.validateDeliveryInputCheck(checkoutTotalData);

      //then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe("상세주소를 입력해주세요.");
    });

    it("연락처1 첫번째 칸이 한 글자면, invalid하고 '연락처 첫번째 칸은 2자리 이상 입력해주세요.' 메시지를 반환해야 한다.", () => {
      //given
      const checkoutTotalData = {
        recipient: "이이",
        addressDetail1: "서울특별시 xx구 xx동 xx-xx",
        addressDetail2: " ",
        tel1: "0",
      };

      //when
      const { valid, invalidMsg } =
        OrderDeliveryValidator.validateDeliveryInputCheck(checkoutTotalData);

      //then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe("연락처 첫번째 칸은 2자리 이상 입력해주세요.");
    });

    it("연락처1 두번째 칸이 세 자리면, invalid하고 '연락처 두번째 칸은 4자리를 입력해주세요.' 메시지를 반환해야 한다.", () => {
      //given
      const checkoutTotalData = {
        recipient: "이이",
        addressDetail1: "서울특별시 xx구 xx동 xx-xx",
        addressDetail2: " ",
        tel1: "02",
        tel2: "123",
      };

      //when
      const { valid, invalidMsg } =
        OrderDeliveryValidator.validateDeliveryInputCheck(checkoutTotalData);

      //then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe("연락처 두번째 칸은 4자리를 입력해주세요.");
    });

    it("연락처1 세번째 칸이 세 자리면, invalid하고 '연락처 세번째 칸은 4자리를 입력해주세요.' 메시지를 반환해야 한다.", () => {
      //given
      const checkoutTotalData = {
        recipient: "이이",
        addressDetail1: "서울특별시 xx구 xx동 xx-xx",
        addressDetail2: " ",
        tel1: "02",
        tel2: "1234",
        tel3: "567",
      };

      //when
      const { valid, invalidMsg } =
        OrderDeliveryValidator.validateDeliveryInputCheck(checkoutTotalData);

      //then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe("연락처 세번째 칸은 4자리를 입력해주세요.");
    });

    it("선택된 결제 정보가 없으면, invalid하고 '결제방법을 선택해주세요.' 메시지를 반환해야 한다.", () => {
      //given
      const checkoutTotalData = {
        recipient: "이이",
        addressDetail1: "서울특별시 xx구 xx동 xx-xx",
        addressDetail2: " ",
        tel1: "02",
        tel2: "1234",
        tel3: "5678",
      };

      //when
      const { valid, invalidMsg } =
        OrderDeliveryValidator.validateDeliveryInputCheck(checkoutTotalData);

      //then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe("결제방법을 선택해주세요.");
    });

    it("주문 동의에 체크가 안 돼있다면, invalid하고 '주문 동의에 체크를 하셔야 주문이 가능합니다.' 메시지를 반환해야 한다.", () => {
      //given
      const checkoutTotalData = {
        recipient: "이이",
        addressDetail1: "서울특별시 xx구 xx동 xx-xx",
        addressDetail2: " ",
        tel1: "02",
        tel2: "1234",
        tel3: "5678",
        paymentName: "토스",
        agreeChecked: false,
      };

      //when
      const { valid, invalidMsg } =
        OrderDeliveryValidator.validateDeliveryInputCheck(checkoutTotalData);

      //then
      expect(valid).toBeFalsy();
      expect(invalidMsg).toBe("주문 동의에 체크를 하셔야 주문이 가능합니다.");
    });

    it("배송정보 관련 필수 값이 모두 유효하다면 valid를 반환해야 한다.", () => {
      //given
      const checkoutTotalData = {
        recipient: "이이",
        addressDetail1: "서울특별시 xx구 xx동 xx-xx",
        addressDetail2: " ",
        tel1: "02",
        tel2: "1234",
        tel3: "5678",
        paymentName: "토스",
        agreeChecked: true,
      };

      //when
      const { valid } =
        OrderDeliveryValidator.validateDeliveryInputCheck(checkoutTotalData);

      //then
      expect(valid).toBeTruthy();
    });
  });
});
