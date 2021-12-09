import React, { useState } from "react";
import styled from "styled-components";
import downArrow from "images/down-arrow.png";
import upArrow from "images/up-arrow-icon.png";

const OrderCompletionDeliveryInfo = ({ orderData }) => {
  const [arrowImg, setArrowImg] = useState(downArrow);
  const [deliveryInfoClass, setDeliveryInfoClass] = useState("hide");
  const [infoHeadAddress, setInfoHeadAddress] = useState(
    "order_check_head_address"
  );

  const handleOpenCloseBtn = () => {
    if (arrowImg === upArrow) {
      setArrowImg(downArrow);
      setInfoHeadAddress("order_check_head_address");
      return setDeliveryInfoClass("hide");
    }

    if (arrowImg === downArrow) {
      setArrowImg(upArrow);
      setInfoHeadAddress("hide");
      return setDeliveryInfoClass("order_pay_info_wrap");
    }
  };

  return (
    <div>
      <div className="order_info_head_wrap deliveryInfo">
        <h2 className="order_info_header">배송 정보</h2>
        <AddressBtnWrap>
          <div className={infoHeadAddress}>
            {orderData[0].shipping_address.address1}{" "}
            {orderData[0].shipping_address.address2}
          </div>
          <button
            type="button"
            className="order_delivery_info_btn"
            onClick={handleOpenCloseBtn}
          >
            <img
              src={arrowImg}
              alt="buttonArrow"
              className="order_delivery_info_btn_img"
            />
          </button>
        </AddressBtnWrap>
      </div>

      <div className={deliveryInfoClass}>
        <ul>
          <DeliveryInfo>
            <div>수령인</div>
            <div>
              {orderData[0].shipping_address.recipient_name} /{" "}
              {orderData[0].shipping_address.phone1.substring(0, 3)}-
              {orderData[0].shipping_address.phone1.substring(3, 7)}-
              {orderData[0].shipping_address.phone1.substring(7, 11)}
            </div>
          </DeliveryInfo>
          <DeliveryInfo>
            <div style={{ minWidth: "44.16px" }}>배송지</div>
            <div style={{ width: "75%", textAlign: "right" }}>
              {orderData[0].shipping_address.address1}{" "}
              {orderData[0].shipping_address.address2}
            </div>
          </DeliveryInfo>
        </ul>
      </div>
    </div>
  );
};

export default OrderCompletionDeliveryInfo;

const DeliveryInfo = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const AddressBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;
