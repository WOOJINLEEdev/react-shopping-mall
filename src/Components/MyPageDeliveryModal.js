import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import AddDeliveryAddressModal from "./AddDeliveryAddressModal";
import useDeliveryData from "../Hooks/useDeliveryData";
import useMyPageData from "../Hooks/useMyPageData";
import { instance } from "../utils/http-client";

Modal.setAppElement("#root");

const MyPageDeliveryModal = ({
  isOpen3,
  onRequestClose3,
  myDeliveryAddress,
}) => {
  const [addDeliveryClassName, setAddDeliveryClassName] = useState("hide");
  const [addressDisplay, setAddressDisplay] = useState("block");
  const [addBtnDisplay, setAddBtnDisplay] = useState("block");
  const [btnWrapDisplay, setBtnWrapDisplay] = useState("none");
  const [closBtnDisplay, setClosBtnDisplay] = useState("");
  const [notAddressClassName, setNotAddressClassName] = useState("");

  const { myDeliveryData, MutateMyDeliveryData } = useDeliveryData();

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

  const { myData, loadingMyData, myDataError, mutateMyData } = useMyPageData();
  if (loadingMyData) return <div>로딩중...</div>;
  if (myDataError) return <div>에러발생...</div>;

  const handleModifyBtn = () => {
    setAddDeliveryClassName("");
    setAddressDisplay("none");
    setBtnWrapDisplay("flex");
    setClosBtnDisplay("none");
    setNotAddressClassName("hide");
  };

  const handleAddBtn = () => {
    setAddDeliveryClassName("");
    setAddBtnDisplay("none");
    setBtnWrapDisplay("flex");
    setClosBtnDisplay("none");
    setNotAddressClassName("hide");
  };

  const handleCancelBtn = () => {
    setAddDeliveryClassName("hide");
    setAddBtnDisplay("block");
    setBtnWrapDisplay("none");
    setClosBtnDisplay("block");
    setNotAddressClassName("");

    if (myDeliveryAddress) {
      setAddDeliveryClassName("hide");
      setAddressDisplay("block");
    }
  };

  const handleRegistrationBtn = () => {
    if (!myDeliveryData.recipient || myDeliveryData.recipient === undefined) {
      return alert("수령인을 입력해주세요.");
    }

    if (myDeliveryData.recipient && myDeliveryData.recipient.length < 2) {
      return alert("수령인은 2자 이상만 가능합니다.");
    }

    if (
      !myDeliveryData.addressDetail1 ||
      myDeliveryData.addressDetail1 === undefined
    ) {
      return alert("주소를 입력해주세요.");
    }

    if (
      !myDeliveryData.addressDetail2 ||
      myDeliveryData.addressDetail2 === undefined
    ) {
      return alert("상세주소를 입력해주세요.");
    }

    if (
      !myDeliveryData.tel1 ||
      myDeliveryData.tel1 === undefined ||
      myDeliveryData.tel2 === undefined ||
      myDeliveryData.tel3 === undefined
    ) {
      return alert("연락처1을 입력해주세요.");
    }

    if (myDeliveryData.tel1.length < 2) {
      return alert("연락처 첫번째 칸은 2자리 이상 입력해주세요.");
    }

    if (myDeliveryData.tel2.length < 4) {
      return alert("연락처 두번째 칸은 4자리를 입력해주세요.");
    }

    if (myDeliveryData.tel3.length < 4) {
      return alert("연락처 세번째 칸은 4자리를 입력해주세요.");
    }

    instance
      .put(
        "/v1/me/shipping-address",

        {
          name: myDeliveryData.recipient,
          recipient_name: myDeliveryData.recipient,
          postal_code: myDeliveryData.address1,
          address1: myDeliveryData.addressDetail1,
          address2: myDeliveryData.addressDetail2,
          note: "없음",
          phone1:
            myDeliveryData.tel1 + myDeliveryData.tel2 + myDeliveryData.tel3,
          phone2:
            myDeliveryData.tel4 + myDeliveryData.tel5 + myDeliveryData.tel6,
        }
      )
      .then(function (response) {
        console.log(response);
        alert("배송지 등록이 완료되었습니다.");
        handleCancelBtn();
        mutateMyData(null, true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal
      isOpen={isOpen3}
      onRequestClose={onRequestClose3}
      style={customModalStyle}
      shouldCloseOnOverlayClick={false}
    >
      <ModalContentContainer>
        <ModalTitle>배송지 등록 / 변경</ModalTitle>
        <ModalContent>
          <ContentText>* 배송지는 하나만 등록할 수 있습니다.</ContentText>
          {!myDeliveryAddress ? (
            <NotDeliveryAddress className={notAddressClassName}>
              등록된 배송지가 없습니다.
            </NotDeliveryAddress>
          ) : (
            <DeliveryAddressItem display={addressDisplay}>
              <strong>기본 배송지</strong>
              <ItemContentWrap>
                <ItemContent>
                  {myData.shipping_address.recipient_name}
                </ItemContent>
                <ItemContent>
                  {myData.shipping_address.address1}{" "}
                  {myData.shipping_address.address2}
                </ItemContent>
                <ItemContent>{myData.shipping_address.phone1}</ItemContent>
              </ItemContentWrap>
              <ModifyBtn onClick={handleModifyBtn}>수정</ModifyBtn>
            </DeliveryAddressItem>
          )}
          <AddDeliveryAddressModal
            addDeliveryClassName={addDeliveryClassName}
          />
        </ModalContent>
      </ModalContentContainer>
      <BtnContainer>
        {!myDeliveryAddress ? (
          <AddBtn display={addBtnDisplay} onClick={handleAddBtn}>
            배송지 등록하기
          </AddBtn>
        ) : (
          ""
        )}
        <CancelRegistrationBtnWrap display={btnWrapDisplay}>
          <CancelBtn onClick={handleCancelBtn}>취소하기</CancelBtn>
          <RegistrationBtn onClick={handleRegistrationBtn}>
            등록하기
          </RegistrationBtn>
        </CancelRegistrationBtnWrap>

        <CloseBtn display={closBtnDisplay} onClick={onRequestClose3}>
          창닫기
        </CloseBtn>
      </BtnContainer>
    </Modal>
  );
};

export default MyPageDeliveryModal;

const customModalStyle = {
  overlay: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    overflow: "hidden",
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: "99",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "80%",
    height: "80%",
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
    scrollbaWidth: "none",
  },
};

const ModalContentContainer = styled.div``;

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

const ContentText = styled.p`
  padding: 10px 0;
  color: red;
`;

const NotDeliveryAddress = styled.p`
  padding: 30px 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const DeliveryAddressItem = styled.div`
  display: ${(props) => props.display || "block"};
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid #d4d4d4;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  cursor: pointer;
`;

const ItemContentWrap = styled.div`
  padding: 10px 0;
`;

const ItemContent = styled.p`
  font-weight: normal;
  padding: 5px;
`;

const ModifyBtn = styled.button`
  width: 30%;
  min-height: 50px;
  padding: 0;
  font-size: 15px;
  color: #333;
  background-color: #fff;
  border: 2px solid #d4d4d4;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
`;

const BtnContainer = styled.div``;

const AddBtn = styled.button`
  display: ${(props) => props.display || "block"};
  width: 100%;
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

const CancelRegistrationBtnWrap = styled.div`
  display: ${(props) => props.display || "flex"};
  justify-content: space-between;
  margin-top: 10px;
`;

const CancelBtn = styled.button`
  width: 48%;
  min-height: 50px;
  padding: 0;
  margin-right: 4%;
  font-size: 15px;
  color: #333;
  background-color: #fff;
  border: 2px solid #d4d4d4;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
`;

const RegistrationBtn = styled.button`
  width: 48%;
  min-height: 50px;
  padding: 0;
  font-size: 15px;
  color: #fff;
  background-color: #333;
  border: 2px solid #333;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
`;

const CloseBtn = styled.button`
  display: ${(props) => props.display || "block"};
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
