import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import AddDeliveryAddressModal from "./AddDeliveryAddressModal";
import useDeliveryData from "hooks/useDeliveryData";
import useMyPageData from "hooks/useMyPageData";
import { instance } from "utils/http-client";
import Loading from "components/common/Loading";

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
  if (loadingMyData) return <Loading />;
  if (myDataError) return <div>에러발생...</div>;

  const handleModifyBtn = () => {
    setAddDeliveryClassName("delivery_register");
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
      .put("/v1/me/shipping-address", {
        name: myDeliveryData.recipient,
        recipient_name: myDeliveryData.recipient,
        postal_code: myDeliveryData.address1,
        address1: myDeliveryData.addressDetail1,
        address2: myDeliveryData.addressDetail2,
        note: "없음",
        phone1: myDeliveryData.tel1 + myDeliveryData.tel2 + myDeliveryData.tel3,
        phone2: myDeliveryData.tel4 + myDeliveryData.tel5 + myDeliveryData.tel6,
      })
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
      shouldCloseOnOverlayClick={false}
      className="myPageDeliveryModal"
      overlayClassName="modalOverlay"
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
              <ItemContentTitle>기본 배송지</ItemContentTitle>
              <ItemContentWrap>
                <ItemContent>{myDeliveryAddress.recipient_name}</ItemContent>
                <ItemContent>
                  {myDeliveryAddress.address1} {myDeliveryAddress.address2}
                </ItemContent>
                <ItemContent>{myDeliveryAddress.phone1}</ItemContent>
              </ItemContentWrap>
              <ModifyBtn type="button" onClick={handleModifyBtn}>
                수정
              </ModifyBtn>
            </DeliveryAddressItem>
          )}
          <AddDeliveryAddressModal
            addDeliveryClassName={addDeliveryClassName}
          />
        </ModalContent>
      </ModalContentContainer>
      <BtnContainer>
        {!myDeliveryAddress ? (
          <AddBtn type="button" display={addBtnDisplay} onClick={handleAddBtn}>
            배송지 등록하기
          </AddBtn>
        ) : (
          ""
        )}
        <CancelRegistrationBtnWrap display={btnWrapDisplay}>
          <CancelBtn type="button" onClick={handleCancelBtn}>
            취소하기
          </CancelBtn>
          <RegistrationBtn type="button" onClick={handleRegistrationBtn}>
            등록하기
          </RegistrationBtn>
        </CancelRegistrationBtnWrap>

        <CloseBtn
          type="button"
          display={closBtnDisplay}
          onClick={onRequestClose3}
        >
          창닫기
        </CloseBtn>
      </BtnContainer>
    </Modal>
  );
};

export default MyPageDeliveryModal;

const ModalContentContainer = styled.div`
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

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
`;

const ContentText = styled.p`
  font-size: 15px;
  padding: 10px 0;
  color: red;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
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
  overflow: hidden;
`;

const ItemContentTitle = styled.strong`
  display: block;
  margin-bottom: 10px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 15px;
    margin-bottom: 5px;
  }
`;

const ItemContentWrap = styled.div`
  padding: 10px 0;
`;

const ItemContent = styled.p`
  font-weight: normal;
  padding: 5px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
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
  float: right;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
    min-height: 40px;
  }
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
  background-color: #228b22;
  border: 2px solid #228b22;
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
