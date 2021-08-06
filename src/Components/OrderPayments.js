import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrderPayments = () => {
  const basePaymentClass = "payment";
  const selectedPaymentClass = "on";

  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(-1);

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

  console.log(payments);

  const handlePaymentMethod = (e) => {
    const clickedPaymentMethodIndex = Number(e.target.dataset.pay);
    const index =
      selectedPaymentIndex === clickedPaymentMethodIndex
        ? -1
        : clickedPaymentMethodIndex;
    setSelectedPaymentIndex(index);
  };

  return (
    <section className="pay_zone">
      <div className="info_head_wrap">
        <h2 className="info_head pay">결제방법</h2>
        <Link to={"/order"} className="card_benefit">
          무이자 카드혜택 보기
        </Link>
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
        <div className="pay_info">
          <h3 className="pay_info_head">신용/체크카드</h3>
          <p className="pay_info_text">
            국내 모든 카드 사용이 가능하며 해외에서 발행된 카드는 이용하실 수
            없습니다. (해외배송은 불가능합니다.)
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderPayments;
