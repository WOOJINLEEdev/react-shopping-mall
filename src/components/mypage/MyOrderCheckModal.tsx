import { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import OrderCompletionDeliveryInfo from "components/order/OrderCompletionDeliveryInfo";
import OrderCompletionPayInfo from "components/order/OrderCompletionPayInfo";
import OrderCompletionItemInfo from "components/order/OrderCompletionItemInfo";
import downArrow from "images/down-arrow.png";
import upArrow from "images/up-arrow-icon.png";
import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark";
import Loading from "components/common/Loading";
import { getOrderNumber } from "utils/order";
import { useDevice } from "hooks/useDevice";
import { MyOrderCheckModalProps, MyOrderList, LineItems } from "types";

Modal.setAppElement("#root");

const MyOrderCheckModal = ({
  isOpen3,
  onRequestClose3,
  myOrderList,
  orderItemId,
}: MyOrderCheckModalProps) => {
  const [arrowImg, setArrowImg] = useState(upArrow);
  const [arrowImg1, setArrowImg1] = useState(downArrow);
  const [closeText, setCloseText] = useState("");
  const [itemInfoClass, setItemInfoClass] = useState("info_group");
  const [remainderClass, setRemainderClass] = useState("info_remainder");
  const [itemInfoHeadClass, setItemInfoHeadClass] = useState("hide");

  const { isPc, isTablet, isMobile } = useDevice();

  useEffect(() => {
    if (isOpen3) {
      document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = `position: ""; top: "";`;
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, [isOpen3]);

  if (!myOrderList) {
    return <Loading />;
  }

  const selectedOrderData = myOrderList.filter(
    (item: MyOrderList) => item.checkout_id === orderItemId
  );

  if (
    selectedOrderData.length === 0 ||
    orderItemId === undefined ||
    orderItemId <= 0
  ) {
    return <div></div>;
  }
  const items = selectedOrderData[0].line_items;

  const firstItem: LineItems = selectedOrderData[0].line_items[0];
  const remainder = items.filter((item: LineItems) => item !== firstItem);
  const itemQuantity = items.map((item: LineItems) => item.quantity);
  const sum = itemQuantity.reduce((a: number, b: number) => a + b);

  const handleInfoOpenBtn = () => {
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

  const handleOpenCloseBtn = () => {
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
      isOpen={isOpen3}
      onRequestClose={onRequestClose3}
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
            selectedOrderData[0].id
          )}
        </ModalTitle>
        <OrderCompletionItemInfo
          items={items}
          firstItem={firstItem}
          remainder={remainder}
          remainderClass={remainderClass}
          itemInfoHeadClass={itemInfoHeadClass}
          itemInfoClass={itemInfoClass}
          handleOpenCloseBtn={handleOpenCloseBtn}
          handleInfoOpenBtn={handleInfoOpenBtn}
          arrowImg={arrowImg}
          arrowImg1={arrowImg1}
          closeText={closeText}
          sum={sum}
          isPc={isPc}
          isTablet={isTablet}
          isMobile={isMobile}
        />
        <OrderCompletionDeliveryInfo orderData={selectedOrderData} />
        <OrderCompletionPayInfo orderData={selectedOrderData} />
      </ModalContent>
      <CloseBtn onClick={onRequestClose3}>닫기</CloseBtn>
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

  & svg {
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
