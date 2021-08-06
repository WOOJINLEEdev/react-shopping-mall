import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import OrderDelivery from "./OrderDelivery";
import OrderCoupon from "./OrderCoupon";
import OrderPayments from "./OrderPayments";
import OrderTotal from "./OrderTotal";
import {
  deliveryAddress,
  deliveryName,
  phoneNumber,
} from "./DeliveryValidation";

const Order = () => {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const availableMileage = decoded.user.mileage;
  const [mileage, setMileage] = useState(decoded.user.mileage);
  const [usedMileage, setUsedMileage] = useState(0);
  const [selectOption, setSelectOption] = useState(0);
  const [checkout, setCheckout] = useState({});
  const [validated, setValidated] = useState({});

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
      <div className="delivery_coupon_pay_wrap">
        <OrderDelivery onChange={handleChangeDelivery} />
        <OrderCoupon
          mileage={mileage}
          onChangeMileageInput={handleMileage}
          handleSelectOption={handleSelect}
          allMileage={allMileage}
          value={usedMileage}
        />
        <OrderPayments />
      </div>
      <OrderTotal
        usedMileage={usedMileage}
        selectOption={selectOption}
        handleChangeDelivery={handleChangeDelivery}
      />
    </div>
  );
};

export default Order;
