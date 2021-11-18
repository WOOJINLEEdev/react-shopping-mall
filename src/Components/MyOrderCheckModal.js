import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import OrderCompletionDeliveryInfo from "./OrderCompletionDeliveryInfo";
import OrderCompletionPayInfo from "./OrderCompletionPayInfo";
import OrderCompletionItemInfo from "./OrderCompletionItemInfo";
import downArrow from "../images/down-arrow.png";
import upArrow from "../images/up-arrow-icon.png";
import { useMediaQuery } from "react-responsive";
import { FcCheckmark } from "react-icons/fc";

Modal.setAppElement("#root");
const MyOrderCheckModal = ({
  isOpen3,
  onRequestClose3,
  myOrderList,
  orderItemId,
}) => {
  const [arrowImg, setArrowImg] = useState(upArrow);
  const [arrowImg1, setArrowImg1] = useState(downArrow);
  const [closeText, setCloseText] = useState("");
  const [itemInfoClass, setItemInfoClass] = useState("info_group");
  const [remainderClass, setRemainderClass] = useState("info_remainder");

  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width:767px)",
  });

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
    return <div>로딩 중.....</div>;
  }

  const selectedOrderData = myOrderList.filter(
    (item) => item.checkout_id === orderItemId
  );

  if (
    selectedOrderData.length === 0 ||
    orderItemId === undefined ||
    orderItemId <= 0
  ) {
    return <div></div>;
  }
  const items = selectedOrderData[0].line_items;

  const firstItem = selectedOrderData[0].line_items[0];
  const remainder = items.filter((item) => item !== firstItem);
  const itemQuantity = items.map((item) => item.quantity);
  const sum = itemQuantity.reduce((a, b) => a + b);

  console.log("checking", items);

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
      return setItemInfoClass("hide");
    }

    if (arrowImg === downArrow) {
      setArrowImg(upArrow);
      return setItemInfoClass("info_group");
    }
  };

  return (
    <Modal
      isOpen={isOpen3}
      onRequestClose={onRequestClose3}
      style={customModalStyle}
      shouldCloseOnOverlayClick={true}
    >
      <ModalContent>
        <ModalTitle>
          <FcCheckmark />
          주문번호 : {selectedOrderData[0].created_at.substring(0, 4)}
          {selectedOrderData[0].created_at.substring(5, 7)}
          {selectedOrderData[0].created_at.substring(8, 10)}
          -000
          {selectedOrderData[0].checkout_id}
        </ModalTitle>
        <OrderCompletionItemInfo
          items={items}
          firstItem={firstItem}
          remainder={remainder}
          remainderClass={remainderClass}
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

const customModalStyle = {
  overlay: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    overflow: "hidden",
    position: "fixed",
    width: "100%",
    height: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "80%",
    height: "80%",
    textAlign: "center",
    padding: "20px",
    boxShadow: "10px 10px 35px 20px rgb(0 0 0 / 36%)",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    overflow: "auto",
  },
};

const ModalTitle = styled.p`
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #333;

  & svg {
    margin-right: 10px;
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
  width: 50%;
  min-height: 50px;
  margin: 10px auto;
  padding: 0;
  font-size: 15px;
  color: #333;
  background-color: #fff;
  border: 2px solid #d4d4d4;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
`;
