import React, { useState, useEffect } from "react";
import useCheckoutData from "../Hooks/useCheckoutData";

const OrderPayments = () => {
  // const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(-1);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState("");
  const [paymentName, setPaymentName] = useState("");
  const payments = [
    "신용/체크카드",
    "현대카드",
    "네이버 페이",
    "토스",
    "페이코",
    "카카오 페이",
    "삼성 페이",
    "SSG 페이",
    "무통장 입금",
    "휴대폰 결제",
    "실시간 계좌 이체",
  ];
  const basePaymentClass = "payment";
  const selectedPaymentClass = "on";

  const { checkoutTotalData, MutateCheckoutTotalData } = useCheckoutData();

  // useEffect(() => {
  //   return MutateCheckoutTotalData({
  //     ...checkoutTotalData,
  //     paymentName,
  //   });
  // }, [paymentName]);

  MutateCheckoutTotalData({
    ...checkoutTotalData,
    paymentName,
  });

  const handlePaymentMethod = (e) => {
    console.log("페이먼트 타겟:", e.target.innerText);
    setPaymentName(e.target.innerText);

    // const clickedPaymentMethodIndex = Number(e.target.dataset.pay);
    // const index =
    //   selectedPaymentIndex === clickedPaymentMethodIndex
    //     ? -1
    //     : clickedPaymentMethodIndex;
    // setSelectedPaymentIndex(index);

    const clickedPaymentMethodIndex = e.target.value;
    // console.log(e.target);
    console.log("타겟밸류:", e.target.value);
    return setSelectedPaymentIndex(clickedPaymentMethodIndex);
  };

  console.log("페이먼트 네임:", paymentName);
  console.log("타겟밸류 저장:", selectedPaymentIndex);

  return (
    <section className="pay_zone">
      <div className="info_head_wrap">
        <h2 className="info_head pay">결제방법</h2>
      </div>
      <div className="payment_info_wrap">
        <ol className="payment_method" onClick={handlePaymentMethod}>
          {payments.map((payment, i) => (
            <li
              className={
                i === selectedPaymentIndex
                  ? `${basePaymentClass} ${selectedPaymentClass}`
                  : basePaymentClass
              }
              key={i}
              data-pay={i}
              value={i}
            >
              {payment}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default OrderPayments;
