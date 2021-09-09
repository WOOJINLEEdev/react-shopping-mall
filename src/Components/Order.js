import React, { useState } from "react";
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

const Order = ({ match }) => {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const availableMileage = decoded.user.mileage;
  const [mileage, setMileage] = useState(decoded.user.mileage);
  const [usedMileage, setUsedMileage] = useState(0);
  const [selectOption, setSelectOption] = useState(0);
  const [checkout, setCheckout] = useState({});
  // const [validated, setValidated] = useState({});
  const checkoutNumber = Number(match.params.checkoutId);
  // const [chkNum, setChkNum] = useState(checkoutNumber);

  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width:767px)",
  });

  const { checkoutData, loadingCheckout, checkoutError, mutateCheckout } =
    useCheckout(checkoutNumber);

  if (checkoutError) return <div>failed to load... 안됨</div>;
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
    console.log("오더버튼 클릭");
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
      setSelectOption(0.2);
    } else if (e.target.value === "가입축하 5,000원 할인") {
      console.log("5천원 할인");
      setSelectOption(5000);
    } else {
      setSelectOption(0);
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
