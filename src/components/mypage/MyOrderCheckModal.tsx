import { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark";

import { getOrderNumber } from "utils/order";
import { fixOverlay } from "utils/fix-overlay";

import OrderCompletionDeliveryInfo from "components/order/OrderCompletionDeliveryInfo";
import OrderCompletionPayInfo from "components/order/OrderCompletionPayInfo";
import OrderCompletionItemInfo from "components/order/OrderCompletionItemInfo";
import Loading from "components/common/Loading";
import { IMyOrderList, ILineItem } from "components/mypage/types";

import upArrow from "assets/images/up-arrow-icon.png";
import downArrow from "assets/images/down-arrow.png";

Modal.setAppElement("#root");

interface IMyOrderCheckModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  myOrderList: IMyOrderList[];
  orderItemId?: number;
}

const MyOrderCheckModal = ({
  isOpen,
  onRequestClose,
  myOrderList,
  orderItemId,
}: IMyOrderCheckModalProps) => {
  const [arrowImg, setArrowImg] = useState(upArrow);
  const [arrowImg1, setArrowImg1] = useState(downArrow);
  const [closeText, setCloseText] = useState("");
  const [itemInfoClass, setItemInfoClass] = useState("info_group");
  const [remainderClass, setRemainderClass] = useState("info_remainder");
  const [itemInfoHeadClass, setItemInfoHeadClass] = useState("hide");

  useEffect(() => {
    if (isOpen) {
      return fixOverlay();
    }
  }, [isOpen]);

  if (!myOrderList) {
    return <Loading />;
  }

  const selectedOrderData = myOrderList.filter(
    (item: IMyOrderList) => item.checkout_id === orderItemId,
  );

  if (
    selectedOrderData.length === 0 ||
    orderItemId === undefined ||
    orderItemId <= 0
  ) {
    return <div />;
  }
  const items = selectedOrderData[0].line_items;

  const firstItem: ILineItem = selectedOrderData[0].line_items[0];
  const remainder = items.filter((item: ILineItem) => item !== firstItem);
  const itemQuantity = items.map((item: ILineItem) => item.quantity);
  const sum = itemQuantity.reduce((a: number, b: number) => a + b);

  const handleInfoOpenBtnClick = () => {
    if (remainderClass === "info_remainder") {
      setArrowImg1(upArrow);
      setCloseText("닫기");
      return setRemainderClass("open");
    }

    if (remainderClass === "open") {
      setArrowImg1(downArrow);
      setCloseText("");
      return setRemainderClass("info_remainder");
    }
  };

  const handleOpenCloseBtnClick = () => {
    if (arrowImg === upArrow) {
      setArrowImg(downArrow);
      setItemInfoHeadClass("info_head_total_item");
      return setItemInfoClass("hide");
    }

    if (arrowImg === downArrow) {
      setArrowImg(upArrow);
      setItemInfoHeadClass("hide");
      return setItemInfoClass("info_group");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className="my_order_check_modal"
      overlayClassName="modal_overlay"
    >
      <ModalContent>
        <ModalTitle>
          <FcCheckmark />
          주문번호 :{" "}
          {getOrderNumber(
            selectedOrderData[0].created_at,
            selectedOrderData[0].id,
          )}
        </ModalTitle>
        <OrderCompletionItemInfo
          items={items}
          firstItem={firstItem}
          remainder={remainder}
          remainderClass={remainderClass}
          itemInfoHeadClass={itemInfoHeadClass}
          itemInfoClass={itemInfoClass}
          handleOpenCloseBtnClick={handleOpenCloseBtnClick}
          handleInfoOpenBtnClick={handleInfoOpenBtnClick}
          arrowImg={arrowImg}
          arrowImg1={arrowImg1}
          closeText={closeText}
          sum={sum}
        />
        <OrderCompletionDeliveryInfo myOrderData={selectedOrderData} />
        <OrderCompletionPayInfo myOrderData={selectedOrderData} />
      </ModalContent>
      <CloseBtn onClick={onRequestClose}>닫기</CloseBtn>
    </Modal>
  );
};

export default MyOrderCheckModal;

const ModalTitle = styled.p`
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #333;

  svg {
    margin-right: 10px;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 15px;
  }
`;

const ModalContent = styled.div`
  min-height: 70%;
  max-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CloseBtn = styled.button`
  width: 100%;
  min-height: 50px;
  margin: 10px auto;
  padding: 0;
  font-size: 15px;
  color: #fff;
  background-color: #333;
  border: 2px solid #333;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
`;
