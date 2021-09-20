import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useMediaQuery } from "react-responsive";
import OrderDelivery from "./OrderDelivery";
import OrderCoupon from "./OrderCoupon";
import OrderPayments from "./OrderPayments";
import OrderTotal from "./OrderTotal";
import {
  deliveryAddress,
  deliveryName,
  phoneNumber,
} from "./DeliveryValidation";
import OrderTotalDetail from "./OrderTotalDetail";
import useCheckout from "../Hooks/useCheckout";
import useCheckoutData from "../Hooks/useCheckoutData";
import axios from "axios";

const Order = ({ match }) => {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const availableMileage = decoded.user.mileage;
  const [mileage, setMileage] = useState(decoded.user.mileage);
  const [coupons, setCoupons] = useState(decoded.user.coupons);
  const [selectCouponId, setSelectCouponId] = useState(0);
  const [usedMileage, setUsedMileage] = useState(0);
  const [selectOption, setSelectOption] = useState(0);
  const [checkout, setCheckout] = useState({});
  const checkoutNumber = Number(match.params.checkoutId);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [chkDat, setChkDat] = useState("");

  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width:767px)",
  });

  const { checkoutData, loadingCheckout, checkoutError, mutateCheckout } =
    useCheckout(checkoutNumber);
  const { checkoutTotalData, MutateCheckoutTotalData } = useCheckoutData();

  useEffect(() => {
    console.log("쳌아웃 훅테스트중1:::", checkoutTotalData);

    return MutateCheckoutTotalData({
      ...checkoutTotalData,
      checkoutData,
      selectCouponId,
    });
  }, [checkoutTotalData]);

  if (checkoutError) return <div>failed to load...</div>;
  if (loadingCheckout) return <div>loading...</div>;

  if (checkoutData.line_items.length <= 1) {
    if (
      checkoutData.line_items[0].variant_price *
        checkoutData.line_items[0].quantity <
      70000
    ) {
      console.log("7만원 이하이므로 배송비 3천원이 붙습니다.");
      localStorage.setItem("delivery", "3000");
    } else {
      console.log("7만원 이상이므로 배송비가 무료입니다.");
      localStorage.setItem("delivery", "0");
    }
  }

  // MutateCheckoutTotalData({
  //   ...checkoutTotalData,
  //   checkoutData,
  //   selectCouponId,
  // });
  console.log("쳌아웃 훅테스트중2:::", checkoutTotalData);
  // setChkDat(checkoutData);
  // console.log("쳌 테스트중:::", chkDat);

  const items = checkoutData.line_items;
  const totalPrice = items
    .map((item) => item.variant_price * item.quantity)
    .reduce((sum, itemPrice) => sum + itemPrice, 0);
  const deliveryCharge = localStorage.getItem("delivery");

  if (checkoutData.line_items.length > 1) {
    if (totalPrice > 70000) {
      localStorage.setItem("delivery", "0");
    }
    if (totalPrice < 70000) {
      localStorage.setItem("delivery", "3000");
    }
  }

  const handleOrderSubmit = () => {
    console.log("오더버튼 테스트", checkoutTotalData);

    // ----- 주문한 이력이 있는 회원이 주문할 때 -----
    if (
      (checkoutTotalData.checkoutData.user.shipping_address &&
        !checkoutTotalData.deliveryClassName) ||
      (checkoutTotalData.checkoutData.user.shipping_address &&
        checkoutTotalData.deliveryClassName === "delivery_write old")
    ) {
      if (!checkoutTotalData.paymentName) {
        return alert("결제방법을 선택해주세요.");
      }

      if (checkoutTotalData.agreeChecked === false) {
        return alert("주문 동의에 체크를 하셔야 주문이 가능합니다.");
      }

      axios
        .put(
          `http://localhost:8282/v1/checkouts/${checkoutNumber}`,
          {
            shipping_address: {
              name: checkoutTotalData.designation,
              recipient_name: checkoutData.user.shipping_address.recipient_name,
              postal_code: checkoutData.user.shipping_address.postal_code,
              address1: checkoutData.user.shipping_address.address1,
              address2: checkoutData.user.shipping_address.address2,
              note: checkoutTotalData.requirement,
              phone1: checkoutData.user.shipping_address.phone1,
              request_note: checkoutTotalData.requirement,
            },
            user_coupon_id_to_be_used: checkoutTotalData.selectCouponId,
            mileage_to_be_used: checkoutTotalData.usedMileage,
            payment: {
              payment_method: {
                type: checkoutTotalData.paymentName,
              },
              amount: checkoutTotalData.finalPrice,
            },
          },
          config
        )
        .then(function (response) {
          console.log(response);
          console.log("주문성공");

          window.location.replace("/orderCheck");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    //----- 주문이력이 있는 회원이 새로운 배송지를 입력하고 주문할 때 -----
    if (
      checkoutData.user.shipping_address &&
      checkoutTotalData.deliveryClassName === "delivery_write new"
    ) {
      if (
        !checkoutTotalData.recipient ||
        checkoutTotalData.recipient === undefined
      ) {
        return alert("수령인을 입력해주세요.");
      }

      if (
        checkoutTotalData.recipient &&
        checkoutTotalData.recipient.length < 2
      ) {
        return alert("수령인은 2자 이상만 가능합니다.");
      }

      if (
        !checkoutTotalData.addressDetail1 ||
        checkoutTotalData.addressDetail1 === undefined
      ) {
        return alert("주소를 입력해주세요.");
      }

      if (
        !checkoutTotalData.addressDetail2 ||
        checkoutTotalData.addressDetail2 === undefined
      ) {
        return alert("상세주소를 입력해주세요.");
      }

      if (
        !checkoutTotalData.tel1 ||
        checkoutTotalData.tel1 === undefined ||
        checkoutTotalData.tel2 === undefined ||
        checkoutTotalData.tel3 === undefined
      ) {
        return alert("연락처1을 입력해주세요.");
      }

      if (checkoutTotalData.tel1.length < 2) {
        return alert("연락처 첫번째 칸은 2자리 이상 입력해주세요.");
      }

      if (checkoutTotalData.tel2.length < 4) {
        return alert("연락처 두번째 칸은 4자리를 입력해주세요.");
      }

      if (checkoutTotalData.tel3.length < 4) {
        return alert("연락처 세번째 칸은 4자리를 입력해주세요.");
      }

      if (!checkoutTotalData.paymentName) {
        return alert("결제방법을 선택해주세요.");
      }

      if (checkoutTotalData.agreeChecked === false) {
        return alert("주문 동의에 체크를 하셔야 주문이 가능합니다.");
      }

      axios
        .put(
          `http://localhost:8282/v1/checkouts/${checkoutNumber}`,
          {
            shipping_address: {
              name: checkoutTotalData.designation,
              recipient_name: checkoutTotalData.recipient,
              postal_code: checkoutTotalData.address1,
              address1: checkoutTotalData.addressDetail1,
              address2: checkoutTotalData.addressDetail2,
              note: checkoutTotalData.requirement,
              phone1:
                checkoutTotalData.te1 +
                checkoutTotalData.tel2 +
                checkoutTotalData.tel3,
              phone2:
                checkoutTotalData.te4 +
                checkoutTotalData.tel5 +
                checkoutTotalData.tel6,
              request_note: checkoutTotalData.requirement,
            },
            user_coupon_id_to_be_used: checkoutTotalData.selectCouponId,
            mileage_to_be_used: checkoutTotalData.usedMileage,
            payment: {
              payment_method: {
                type: checkoutTotalData.paymentName,
              },
              amount: checkoutTotalData.finalPrice,
            },
          },
          config
        )
        .then(function (response) {
          console.log(response);
          console.log("주문성공");

          window.location.replace("/orderCheck");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    //----- 신규가입자가 처음 주문할 때 -----
    if (
      (!checkoutData.user.shipping_address &&
        checkoutTotalData.deliveryClassName === "delivery_write new") ||
      (!checkoutData.user.shipping_address &&
        !checkoutTotalData.deliveryClassName) ||
      !checkoutData.user.shipping_address
    ) {
      if (
        !checkoutTotalData.recipient ||
        checkoutTotalData.recipient === undefined
      ) {
        return alert("수령인을 입력해주세요.");
      }

      if (
        checkoutTotalData.recipient &&
        checkoutTotalData.recipient.length < 2
      ) {
        return alert("수령인은 2자 이상만 가능합니다.");
      }

      if (
        !checkoutTotalData.addressDetail1 ||
        checkoutTotalData.addressDetail1 === undefined
      ) {
        return alert("주소를 입력해주세요.");
      }

      if (
        !checkoutTotalData.addressDetail2 ||
        checkoutTotalData.addressDetail2 === undefined
      ) {
        return alert("상세주소를 입력해주세요.");
      }

      if (
        !checkoutTotalData.tel1 ||
        checkoutTotalData.tel1 === undefined ||
        checkoutTotalData.tel2 === undefined ||
        checkoutTotalData.tel3 === undefined
      ) {
        return alert("연락처1을 입력해주세요.");
      }

      if (checkoutTotalData.tel1.length < 2) {
        return alert("연락처 첫번째 칸은 2자리 이상 입력해주세요.");
      }

      if (checkoutTotalData.tel2.length < 4) {
        return alert("연락처 두번째 칸은 4자리를 입력해주세요.");
      }

      if (checkoutTotalData.tel3.length < 4) {
        return alert("연락처 세번째 칸은 4자리를 입력해주세요.");
      }

      if (!checkoutTotalData.paymentName) {
        return alert("결제방법을 선택해주세요.");
      }

      if (checkoutTotalData.agreeChecked === false) {
        return alert("주문 동의에 체크를 하셔야 주문이 가능합니다.");
      }

      axios
        .put(
          `http://localhost:8282/v1/checkouts/${checkoutNumber}`,
          {
            shipping_address: {
              name: checkoutTotalData.designation,
              recipient_name: checkoutTotalData.recipient,
              postal_code: checkoutTotalData.address1,
              address1: checkoutTotalData.addressDetail1,
              address2: checkoutTotalData.addressDetail2,
              note: checkoutTotalData.requirement,
              phone1:
                checkoutTotalData.te1 +
                checkoutTotalData.tel2 +
                checkoutTotalData.tel3,
              phone2:
                checkoutTotalData.te4 +
                checkoutTotalData.tel5 +
                checkoutTotalData.tel6,
              request_note: checkoutTotalData.requirement,
            },
            user_coupon_id_to_be_used: checkoutTotalData.selectCouponId,
            mileage_to_be_used: checkoutTotalData.usedMileage,
            payment: {
              payment_method: {
                type: checkoutTotalData.paymentName,
              },
              amount: checkoutTotalData.finalPrice,
            },
          },
          config
        )
        .then(function (response) {
          console.log(response);
          console.log("주문성공");

          window.location.replace("/orderCheck");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleMileage = (e) => {
    if (e.target.value > availableMileage) {
      alert("보유 마일리지보다 많이 사용할 수 없습니다.");
      e.target.value = availableMileage;
      setMileage(0);
      setUsedMileage(availableMileage);
    }
    setMileage(availableMileage - e.target.value);
    setUsedMileage(e.target.value);
  };

  const allMileage = (e) => {
    if (e.target.name === "allMileage") {
      console.log("모두사용 버튼 클릭");
      setMileage(0);
      setUsedMileage(availableMileage);
      e.target.name = "mile";
    } else if (e.target.name === "mile") {
      setMileage(availableMileage);
      setUsedMileage(0);
      e.target.name = "allMileage";
    }
  };

  const handleSelect = (e) => {
    if (e.target.value === "가입축하 20% 할인") {
      console.log("20퍼센트 할인");
      setSelectCouponId(coupons[0].id);
      return setSelectOption(0.2);
    } else if (e.target.value === "가입축하 5,000원 할인") {
      console.log("5천원 할인");
      setSelectCouponId(coupons[1].id);
      return setSelectOption(5000);
    } else {
      setSelectCouponId(0);
      return setSelectOption(0);
    }
  };

  const handleChangeDelivery = (delivery) => {
    console.log("handleChangeDelivery delivery ", delivery);
    setCheckout({
      ...checkout,
      delivery: deliveryName,
      deliveryAddress,
      phoneNumber,
    });
    console.log("handleChangeDelivery checkout ", checkout);
  };

  console.log("오더 데이터 확인", checkoutData);

  return (
    <div className="order_wrapper">
      {isPc && (
        <div className="delivery_coupon_pay_wrap">
          <OrderDelivery
            checkoutNumber={checkoutNumber}
            checkoutData={checkoutData}
            onChange={handleChangeDelivery}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderCoupon
            mileage={mileage}
            usedMileage={usedMileage}
            selectOption={selectOption}
            isMobile={isMobile}
            isTablet={isTablet}
            onChangeMileageInput={handleMileage}
            handleSelectOption={handleSelect}
            allMileage={allMileage}
            value={usedMileage}
          />
          <OrderPayments />
        </div>
      )}
      {isPc && (
        <OrderTotal
          usedMileage={usedMileage}
          selectOption={selectOption}
          handleChangeDelivery={handleChangeDelivery}
          itemCheckout={checkoutData}
          checkoutNumber={checkoutNumber}
          isPc={isPc}
          isTablet={isTablet}
          isMobile={isMobile}
          handleOrderSubmit={handleOrderSubmit}
        />
      )}

      {isTablet && (
        <div>
          <OrderDelivery
            checkoutNumber={checkoutNumber}
            checkoutData={checkoutData}
            onChange={handleChangeDelivery}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderTotal
            usedMileage={usedMileage}
            selectOption={selectOption}
            handleChangeDelivery={handleChangeDelivery}
            itemCheckout={checkoutData}
            checkoutNumber={checkoutNumber}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderCoupon
            mileage={mileage}
            usedMileage={usedMileage}
            selectOption={selectOption}
            isTablet={isTablet}
            isMobile={isMobile}
            onChangeMileageInput={handleMileage}
            handleSelectOption={handleSelect}
            allMileage={allMileage}
            value={usedMileage}
          />
          <OrderPayments />
          <OrderTotalDetail
            totalPrice={totalPrice}
            deliveryCharge={deliveryCharge}
            usedMileage={usedMileage}
            selectOption={selectOption}
            handleOrderSubmit={handleOrderSubmit}
            selectCouponId={selectCouponId}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
        </div>
      )}
      {isMobile && (
        <div>
          <OrderDelivery
            checkoutNumber={checkoutNumber}
            checkoutData={checkoutData}
            onChange={handleChangeDelivery}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderTotal
            usedMileage={usedMileage}
            selectOption={selectOption}
            handleChangeDelivery={handleChangeDelivery}
            itemCheckout={checkoutData}
            checkoutNumber={checkoutNumber}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderCoupon
            mileage={mileage}
            usedMileage={usedMileage}
            selectOption={selectOption}
            isTablet={isTablet}
            isMobile={isMobile}
            onChangeMileageInput={handleMileage}
            handleSelectOption={handleSelect}
            allMileage={allMileage}
            value={usedMileage}
          />
          <OrderPayments />
          <OrderTotalDetail
            totalPrice={totalPrice}
            deliveryCharge={deliveryCharge}
            usedMileage={usedMileage}
            selectOption={selectOption}
            handleOrderSubmit={handleOrderSubmit}
            selectCouponId={selectCouponId}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
        </div>
      )}
    </div>
  );
};

export default Order;
