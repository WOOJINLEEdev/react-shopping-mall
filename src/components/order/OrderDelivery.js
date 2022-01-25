import { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import downArrow from "images/down-arrow.png";
import upArrow from "images/up-arrow-icon.png";
import { CgClose } from "@react-icons/all-files/cg/CgClose";
import { optionData } from "components/order/OrderDeliveryOptionData";
import useCheckoutDeliveryData from "hooks/useCheckoutDeliveryData";
import OrderDeliveryHead from "./OrderDeliveryHead";
import OrderDeliveryFormPc from "components/order/OrderDeliveryFormPc";
import OrderDeliveryFormTablet from "components/order/OrderDeliveryFormTablet";
import OrderDeliveryFormMobile from "components/order/OrderDeliveryFormMobile";
import OrderDeliveryForm1 from "components/order/OrderDeliveryForm1";

const OrderDelivery = ({ checkoutData, isPc, isTablet, isMobile }) => {
  const [showDaumPostModal, setShowDaumPostModal] = useState(false);
  const [address, setAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [addressDetail1, setAddressDetail1] = useState("");
  const [addressDetail2, setAddressDetail2] = useState("");

  const [deliveryClassName, setDeliveryClassName] =
    useState("delivery_write old");
  const [deliveryClassName1, setDeliveryClassName1] =
    useState("delivery_write new");
  const [deliveryForm, setDeliveryForm] = useState("delivery_box_wrap");
  const [deliveryForm1, setDeliveryForm1] = useState(
    "delivery_box_wrap_second hide"
  );

  const [arrowImg, setArrowImg] = useState(upArrow);
  const [infoHeadAddress, setInfoHeadAddress] = useState("hide");
  const [deliveryWrapClass, setDeliveryWrapClass] = useState("delivery_wrap");
  const [deliveryWrite, setDeliveryWrite] = useState();
  const [deliveryRequirementWrite, setDeliveryRequirementWrite] =
    useState("hide");
  const [deliveryRequirementWrite1, setDeliveryRequirementWrite1] =
    useState("hide");
  const [deliveryRequirementOption, setDeliveryRequirementOption] =
    useState(optionData);
  const [deliveryRequirementOption1, setDeliveryRequirementOption1] =
    useState(optionData);

  const [requirementTest, setRequirementTest] = useState();
  const [selectedOptionNo, setSelectedOptionNo] = useState();

  const [designation, setDesignation] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [tel3, setTel3] = useState("");
  const [tel4, setTel4] = useState("");
  const [tel5, setTel5] = useState("");
  const [tel6, setTel6] = useState("");
  const [requirement, setRequirement] = useState("");
  const [requirement1, setRequirement1] = useState("");

  const { checkoutDeliveryData, MutateCheckoutDeliveryData } =
    useCheckoutDeliveryData();

  useEffect(() => {
    MutateCheckoutDeliveryData({
      designation,
      recipient,
      address1,
      addressDetail1,
      addressDetail2,
      tel1,
      tel2,
      tel3,
      tel4,
      tel5,
      tel6,
      requirement,
      requirement1,
      deliveryClassName,
      deliveryClassName1,
    });
  }, [
    designation,
    recipient,
    address1,
    addressDetail1,
    addressDetail2,
    tel1,
    tel2,
    tel3,
    tel4,
    tel5,
    tel6,
    requirement,
    requirement1,
    deliveryClassName,
    deliveryClassName1,
  ]);

  useEffect(() => {
    if (!checkoutData.user.shipping_address) {
      setDeliveryClassName("delivery_write disabled");
      setDeliveryForm("delivery_box_wrap_second hide");
      setDeliveryForm1("delivery_box_wrap");
      return setDeliveryClassName1("delivery_write old");
    }
  }, [checkoutDeliveryData]);

  const handlePostalCode = () => {
    setShowDaumPostModal(true);
  };

  const getFullAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }

      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    return fullAddress;
  };

  const handleComplete = (data) => {
    let fullAddress = getFullAddress(data);

    if (deliveryClassName === "delivery_write old") {
      setAddress(data.zonecode);
      setAddressDetail(fullAddress);
    } else if (deliveryClassName1 === "delivery_write old") {
      setAddress1(data.zonecode);
      setAddressDetail1(fullAddress);
    }
    setShowDaumPostModal(false);
  };

  const postModalEsc = () => {
    setShowDaumPostModal(false);
  };

  const handleDeliveryWrite = (e) => {
    setDeliveryWrite(e.target.dataset.name);

    if (e.target.dataset.name === "신규 입력") {
      setDeliveryClassName("delivery_write new");
      setDeliveryClassName1("delivery_write old");
      setDeliveryForm("delivery_box_wrap_second hide");
      setDeliveryForm1("delivery_box_wrap");
      setRequirementTest("신규 입력");
    } else if (e.target.dataset.name === "기존 배송지") {
      setDeliveryClassName("delivery_write old");
      setDeliveryClassName1("delivery_write new");
      setDeliveryForm("delivery_box_wrap");
      setDeliveryForm1("delivery_box_wrap_second hide");
      setRequirementTest("기존 배송지");
    }
  };

  const handleAddressBtn = () => {
    console.log(deliveryWrite);

    if (arrowImg === upArrow) {
      if (!checkoutData.user.shipping_address || deliveryWrite === "") {
        setDeliveryForm1("delivery_box_wrap_second hide");
      }

      if (deliveryWrite === "신규 입력") {
        setDeliveryForm1("delivery_box_wrap_second hide");
        setArrowImg(downArrow);
        setInfoHeadAddress("info_head_address");
        return setDeliveryWrapClass("hide");
      }
      setArrowImg(downArrow);
      setInfoHeadAddress("info_head_address");
      return setDeliveryWrapClass("hide");
    }

    if (arrowImg === downArrow) {
      if (!checkoutData.user.shipping_address || deliveryWrite === "") {
        setDeliveryForm1("delivery_box_wrap");
      }

      if (deliveryWrite === "신규 입력") {
        setArrowImg(upArrow);
        setInfoHeadAddress("hide");
        setDeliveryForm1("delivery_box_wrap");
        return setDeliveryWrapClass("delivery_wrap");
      }
      setArrowImg(upArrow);
      setInfoHeadAddress("hide");
      return setDeliveryWrapClass("delivery_wrap");
    }
  };

  const handleAddressDetail2 = (e) => {
    console.log(e.target.value);
    setAddressDetail2(e.target.value);
  };

  const handleDeliveryInputChange1 = (e) => {
    setDesignation(e.target.value);
  };

  const handleDeliveryInputChange2 = (e) => {
    setRecipient(e.target.value);
  };

  const handleDeliveryInputChange3 = (e, setState) => {
    let curValue = e.target.value;
    let phoneValue = curValue.replace(/[^0-9]/g, "");

    setState(phoneValue);
  };

  const handleDeliveryInputChange4 = (e) => {
    setRequirement(e.target.value);
  };
  const handleDeliveryInputChange5 = (e) => {
    setRequirement1(e.target.value);
  };

  const handleDeliveryRequirement = (e) => {
    const targetValue = e.target.value;

    if (
      deliveryWrite === "기존 배송지" ||
      deliveryClassName === "delivery_write old"
    ) {
      setRequirement(targetValue);
      if (targetValue === "직접 입력") {
        return setDeliveryRequirementWrite("delivery_requirement_write");
      } else {
        return setDeliveryRequirementWrite("hide");
      }
    }

    if (deliveryWrite === "신규 입력") {
      setRequirement1(targetValue);
      if (targetValue === "직접 입력") {
        return setDeliveryRequirementWrite1("delivery_requirement_write");
      } else {
        return setDeliveryRequirementWrite1("hide");
      }
    }

    if (
      deliveryClassName === "delivery_write disabled" ||
      deliveryClassName1 === "delivery_write old"
    ) {
      setRequirement1(targetValue);
      if (targetValue === "직접 입력") {
        return setDeliveryRequirementWrite1("delivery_requirement_write");
      } else {
        return setDeliveryRequirementWrite1("hide");
      }
    }
  };

  return (
    <section className="delivery_info">
      <OrderDeliveryHead
        isPc={isPc}
        isTablet={isTablet}
        isMobile={isMobile}
        deliveryWrite={deliveryWrite}
        infoHeadAddress={infoHeadAddress}
        addressDetail1={addressDetail1}
        addressDetail2={addressDetail2}
        checkoutData={checkoutData}
        handleAddressBtn={handleAddressBtn}
        arrowImg={arrowImg}
      />

      {showDaumPostModal ? (
        <PostWrap>
          <PostModalEscBtn
            type="button"
            aria-label="close"
            onClick={postModalEsc}
          >
            <CgClose />
          </PostModalEscBtn>
          <DaumPostcode
            onComplete={handleComplete}
            className="daum_post_code"
          />
        </PostWrap>
      ) : null}

      {isPc && (
        <OrderDeliveryFormPc
          deliveryWrapClass={deliveryWrapClass}
          handleDeliveryWrite={handleDeliveryWrite}
          deliveryClassName={deliveryClassName}
          deliveryClassName1={deliveryClassName1}
          checkoutData={checkoutData}
          deliveryForm={deliveryForm}
          designation={designation}
          address={address}
          handlePostalCode={handlePostalCode}
          handleDeliveryRequirement={handleDeliveryRequirement}
          deliveryRequirementOption1={deliveryRequirementOption1}
          deliveryRequirementWrite={deliveryRequirementWrite}
          handleDeliveryInputChange4={handleDeliveryInputChange4}
        />
      )}

      {isTablet && (
        <OrderDeliveryFormTablet
          deliveryWrapClass={deliveryWrapClass}
          handleDeliveryWrite={handleDeliveryWrite}
          deliveryClassName={deliveryClassName}
          deliveryClassName1={deliveryClassName1}
          checkoutData={checkoutData}
          deliveryForm={deliveryForm}
          handleDeliveryRequirement={handleDeliveryRequirement}
          deliveryRequirementWrite={deliveryRequirementWrite}
          handleDeliveryInputChange4={handleDeliveryInputChange4}
          deliveryRequirementOption={deliveryRequirementOption}
        />
      )}

      {isMobile && (
        <OrderDeliveryFormMobile
          deliveryWrapClass={deliveryWrapClass}
          handleDeliveryWrite={handleDeliveryWrite}
          deliveryClassName={deliveryClassName}
          deliveryClassName1={deliveryClassName1}
          checkoutData={checkoutData}
          deliveryForm={deliveryForm}
          handleDeliveryRequirement={handleDeliveryRequirement}
          deliveryRequirementWrite={deliveryRequirementWrite}
          handleDeliveryInputChange4={handleDeliveryInputChange4}
          deliveryRequirementOption={deliveryRequirementOption}
        />
      )}

      <OrderDeliveryForm1
        deliveryForm1={deliveryForm1}
        designation={designation}
        handleDeliveryInputChange1={handleDeliveryInputChange1}
        recipient={recipient}
        handleDeliveryInputChange2={handleDeliveryInputChange2}
        address1={address1}
        handlePostalCode={handlePostalCode}
        addressDetail1={addressDetail1}
        addressDetail2={addressDetail2}
        handleAddressDetail2={handleAddressDetail2}
        handleDeliveryInputChange3={handleDeliveryInputChange3}
        tel1={tel1}
        setTel1={setTel1}
        tel2={tel2}
        setTel2={setTel2}
        tel3={tel3}
        setTel3={setTel3}
        tel4={tel4}
        setTel4={setTel4}
        tel5={tel5}
        setTel5={setTel5}
        tel6={tel6}
        setTel6={setTel6}
        handleDeliveryRequirement={handleDeliveryRequirement}
        deliveryRequirementOption1={deliveryRequirementOption1}
        deliveryRequirementWrite1={deliveryRequirementWrite1}
        handleDeliveryInputChange5={handleDeliveryInputChange5}
      />
    </section>
  );
};

export default OrderDelivery;

const PostWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  top: 53%;
  left: 49%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  & .daum_post_code {
    display: block;
    width: 100%;
    min-height: 500px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 85%;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 80%;

    & .daum_post_code {
      min-height: 700px;
    }
  }
`;

const PostModalEscBtn = styled.button`
  display: block;
  width: 100%;
  margin: 0 auto;
  padding: 10px 0 0;
  border: 0;
  margin: 0 3px;
  border-radius: 5px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #333;
  cursor: pointer;
  font-size: 30px;
  line-height: 30px;
  text-align: right;
`;
