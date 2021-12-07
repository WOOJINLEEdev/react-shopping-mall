import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import { FcCheckmark } from "react-icons/fc";
import styled from "styled-components";
import downArrow from "../images/down-arrow.png";
import upArrow from "../images/up-arrow-icon.png";
import useCheckoutData from "../hooks/useCheckoutData";
// import PropTypes from "prop-types";

const OrderDelivery = ({ checkoutData, isPc, isTablet, isMobile }) => {
  const optionData = [
    {
      no: "0",
      label: "",
      value: "배송 시 요청사항을 선택해 주세요.",
      selected: "selected",
    },
    {
      no: "1",
      label: "부재 시 문 앞에 놓아주세요.",
      value: "부재 시 문 앞에 놓아주세요.",
    },
    {
      no: "2",
      label: "부재 시 경비실에 맡겨 주세요.",
      value: "부재 시 경비실에 맡겨 주세요.",
    },
    {
      no: "3",
      label: "배송 전에 연락주세요.",
      value: "배송 전에 연락주세요.",
    },
    {
      no: "4",
      label: "직접 입력",
      value: "직접 입력",
    },
  ];

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

  const { checkoutTotalData, MutateCheckoutTotalData } = useCheckoutData();

  useEffect(() => {
    MutateCheckoutTotalData({
      ...checkoutTotalData,
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
    if (checkoutTotalData.checkoutData === undefined) {
      return console.log("체크아웃 데이터 undefined");
    }

    if (
      !checkoutData.user.shipping_address ||
      (!checkoutTotalData.checkoutData.user.shipping_address &&
        !checkoutTotalData.deliveryClassName)
    ) {
      setDeliveryClassName("delivery_write disabled");
      setDeliveryForm("delivery_box_wrap_second hide");
      setDeliveryForm1("delivery_box_wrap");
      return setDeliveryClassName1("delivery_write old");
    }
  }, [checkoutTotalData]);

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
    console.log("data ", data);
    console.log("우편번호: ", data.zonecode);
    console.log("주소: ", data.address);

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
    console.log(e.target.dataset.name);
    setDeliveryWrite(e.target.dataset.name);

    if (!checkoutData.user.shipping_address) {
      return false;
    }

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
    console.log("배송지명:", e.target.value);
    setDesignation(e.target.value);
  };

  const handleDeliveryInputChange2 = (e) => {
    console.log("수령인:", e.target.value);
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
      <div className="info_head_wrap">
        <h2 className="info_head delivery">배송정보</h2>
        {isPc && (
          <div className="info_head_sub">
            <span className="vital">*</span>표시는 필수입력 항목
          </div>
        )}
        {isTablet && (
          <div className="info_head_address_wrap">
            {deliveryWrite === "신규 입력" ? (
              <div className={infoHeadAddress}>
                {addressDetail1 === "" ? "" : addressDetail1} {addressDetail2}
              </div>
            ) : (
              <div className={infoHeadAddress}>
                {checkoutData.user.shipping_address?.address1}{" "}
                {checkoutData.user.shipping_address?.address2}
              </div>
            )}
            <button
              type="button"
              className="address_btn"
              onClick={handleAddressBtn}
            >
              <img
                src={arrowImg}
                alt="buttonArrow"
                className="address_btn_img"
              />
            </button>
          </div>
        )}
        {isMobile && (
          <div className="info_head_address_wrap">
            {deliveryWrite === "신규 입력" ? (
              <div className={infoHeadAddress}>
                {addressDetail1 === "" ? "" : addressDetail1} {addressDetail2}
              </div>
            ) : (
              <div className={infoHeadAddress}>
                {checkoutData.user.shipping_address?.address1}{" "}
                {checkoutData.user.shipping_address?.address2}
              </div>
            )}
            <button
              type="button"
              className="address_btn"
              onClick={handleAddressBtn}
            >
              <img
                src={arrowImg}
                alt="buttonArrow"
                className="address_btn_img"
              />
            </button>
          </div>
        )}
      </div>

      {isPc && showDaumPostModal ? (
        <>
          <button style={postModalEscBtn} onClick={postModalEsc}>
            창닫기
          </button>

          <DaumPostcode onComplete={handleComplete} style={postCodeStyle} />
        </>
      ) : null}

      {isTablet && showDaumPostModal ? (
        <>
          <button style={tabletPostModalEscBtn} onClick={postModalEsc}>
            창닫기
          </button>
          <DaumPostcode
            onComplete={handleComplete}
            style={tabletPostCodeStyle}
          />
        </>
      ) : null}

      {isMobile && showDaumPostModal ? (
        <>
          <button style={mobilePostModalEscBtn} onClick={postModalEsc}>
            창닫기
          </button>
          <DaumPostcode
            onComplete={handleComplete}
            style={mobilePostCodeStyle}
          />
        </>
      ) : null}

      {isPc && (
        <div className={deliveryWrapClass}>
          <ul className="delivery_write_choice" onClick={handleDeliveryWrite}>
            <li
              className={deliveryClassName}
              disabled={
                !checkoutData.user.shipping_address ? "disabled" : false
              }
              data-name="기존 배송지"
              tabIndex="0"
            >
              기존 배송지
            </li>
            <li
              className={deliveryClassName1}
              data-name="신규 입력"
              tabIndex="0"
            >
              신규입력
            </li>
          </ul>
          <div className={deliveryForm}>
            <div className="delivery_box">
              <div className="label_box">
                <label htmlFor="deliveryTitle">배송지명</label>
              </div>
              <input
                type="text"
                className="delivery_input first"
                id="deliveryTitle"
                value={designation}
                readOnly
              />
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label htmlFor="deliveryName">
                  수령인<span className="vital">*</span>
                </label>
              </div>
              <input
                type="text"
                name="deliveryName"
                id="deliveryName"
                className="delivery_input second"
                value={
                  checkoutData.user.shipping_address
                    ? checkoutData.user.shipping_address.recipient_name
                    : ""
                }
                readOnly
              />
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label htmlFor="sample6_address">
                  배송지<span className="vital">*</span>
                </label>
              </div>
              <div className="delivery_address">
                <div className="postalCode_wrap">
                  <input
                    type="text"
                    id="sample6_postcode"
                    className="delivery_input postalCode"
                    placeholder="우편번호"
                    value={
                      checkoutData.user.shipping_address
                        ? checkoutData.user.shipping_address.postal_code
                        : address
                    }
                    onClick={handlePostalCode}
                    disabled
                    readOnly
                  />
                  <input
                    type="button"
                    className="postalCode_search"
                    value="우편번호 찾기"
                    onClick={handlePostalCode}
                    disabled
                  />
                </div>
                <input
                  type="text"
                  name="deliveryAddress"
                  id="sample6_address"
                  className="delivery_input address"
                  placeholder="주소"
                  value={
                    checkoutData.user.shipping_address
                      ? checkoutData.user.shipping_address.address1
                      : ""
                  }
                  disabled
                  readOnly
                />

                <input
                  type="text"
                  id="sample6_detailAddress"
                  className="delivery_input address"
                  placeholder="상세주소"
                  value={
                    checkoutData.user.shipping_address
                      ? checkoutData.user.shipping_address.address2
                      : ""
                  }
                  readOnly
                />
              </div>
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label htmlFor="phoneFirst">
                  연락처1<span className="vital">*</span>
                </label>
              </div>
              <div className="tel_wrap">
                <input
                  type="tel"
                  maxLength="3"
                  name="phoneFirst"
                  id="phoneFirst"
                  className="delivery_input tel"
                  value={
                    checkoutData.user.shipping_address
                      ? checkoutData.user.shipping_address.phone1.substring(
                          0,
                          3
                        )
                      : ""
                  }
                  readOnly
                />
                <span className="tel_dash">-</span>
                <input
                  type="tel"
                  maxLength="4"
                  name="phoneSecond"
                  id="phoneSecond"
                  className="delivery_input tel"
                  value={
                    checkoutData.user.shipping_address
                      ? checkoutData.user.shipping_address.phone1.substring(
                          3,
                          7
                        )
                      : ""
                  }
                  readOnly
                />
                <span className="tel_dash">-</span>
                <input
                  type="tel"
                  maxLength="4"
                  name="phoneThird"
                  id="phoneThird"
                  className="delivery_input tel"
                  value={
                    checkoutData.user.shipping_address
                      ? checkoutData.user.shipping_address.phone1.substring(
                          7,
                          11
                        )
                      : ""
                  }
                  readOnly
                />
              </div>
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label htmlFor="subPhoneFirst">연락처2</label>
              </div>
              <div className="tel_wrap">
                <input
                  type="tel"
                  maxLength="4"
                  className="delivery_input tel"
                  id="subPhoneFirst"
                  value={
                    checkoutData.user.shipping_address
                      ? checkoutData.user.shipping_address.phone2.substring(
                          0,
                          3
                        )
                      : ""
                  }
                  readOnly
                />
                <span className="tel_dash">-</span>
                <input
                  type="tel"
                  maxLength="4"
                  className="delivery_input tel"
                  value={
                    checkoutData.user.shipping_address
                      ? checkoutData.user.shipping_address.phone2.substring(
                          3,
                          7
                        )
                      : ""
                  }
                  readOnly
                />
                <span className="tel_dash">-</span>
                <input
                  type="tel"
                  maxLength="4"
                  className="delivery_input tel"
                  value={
                    checkoutData.user.shipping_address
                      ? checkoutData.user.shipping_address.phone2.substring(
                          7,
                          11
                        )
                      : ""
                  }
                  readOnly
                />
              </div>
            </div>

            <div className="delivery_box">
              <div className="label_box"></div>
              <DeliveryRequirementWrap>
                <PreexistenceSelect
                  color={"#333"}
                  onChange={handleDeliveryRequirement}
                >
                  {deliveryRequirementOption1.map((item) => (
                    <option
                      key={item.no}
                      value={item.label}
                      className="option_test"
                    >
                      {item.value}
                    </option>
                  ))}
                </PreexistenceSelect>
                <SelectRequirementWrite
                  className={deliveryRequirementWrite}
                  placeholder="배송시 요청사항을 작성해 주세요."
                  maxLength="30"
                  onChange={handleDeliveryInputChange4}
                />
              </DeliveryRequirementWrap>
            </div>

            <div className="delivery_box notice">
              <div className="label_box"></div>※ 배송지를 수정하길 원하시면
              신규입력 탭을 이용해주세요.
            </div>
          </div>
        </div>
      )}
      {isTablet && (
        <div className={deliveryWrapClass}>
          <ul className="delivery_write_choice" onClick={handleDeliveryWrite}>
            <li
              className={deliveryClassName}
              data-name="기존 배송지"
              tabIndex="0"
            >
              기존 배송지
            </li>
            <li
              className={deliveryClassName1}
              data-name="신규 입력"
              tabIndex="0"
            >
              신규입력
            </li>
          </ul>
          <div className={deliveryForm}>
            <ul className="preexistence_info">
              <PreexistenceItem>
                <FcCheckmark />
                <div className="preexistence_content">
                  <span className="preexistence_name">
                    {checkoutData.user.shipping_address
                      ? checkoutData.user.shipping_address.recipient_name
                      : checkoutData.user.name}
                  </span>
                  <p className="preexistence_address">
                    (
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.postal_code}
                    ){" "}
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.address1}{" "}
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.address2}
                  </p>
                  <span className="preexistence_phone">
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.phone1.substring(0, 3)}
                    -
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.phone1.substring(3, 7)}
                    -
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.phone1.substring(
                        7,
                        11
                      )}
                  </span>
                  <PreexistenceSelect
                    color={"#333"}
                    margin={"20px 0 0"}
                    onChange={handleDeliveryRequirement}
                    tabIndex="0"
                  >
                    {deliveryRequirementOption.map((item) => (
                      <option key={item.no} value={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </PreexistenceSelect>
                  <SelectRequirementWrite
                    className={deliveryRequirementWrite}
                    placeholder="배송시 요청사항을 작성해 주세요."
                    maxLength="30"
                    onChange={handleDeliveryInputChange4}
                  />
                </div>
              </PreexistenceItem>
            </ul>
          </div>
        </div>
      )}

      {isMobile && (
        <div className={deliveryWrapClass}>
          <ul className="delivery_write_choice" onClick={handleDeliveryWrite}>
            <li
              className={deliveryClassName}
              data-name="기존 배송지"
              tabIndex="0"
            >
              기존 배송지
            </li>
            <li
              className={deliveryClassName1}
              data-name="신규 입력"
              tabIndex="0"
            >
              신규입력
            </li>
          </ul>
          <div className={deliveryForm}>
            <ul className="preexistence_info">
              <PreexistenceItem>
                <FcCheckmark />
                <div className="preexistence_content">
                  <span className="preexistence_name">
                    {checkoutData.user.shipping_address
                      ? checkoutData.user.shipping_address.recipient_name
                      : checkoutData.user.name}
                  </span>
                  <p className="preexistence_address">
                    (
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.postal_code}
                    ){" "}
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.address1}{" "}
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.address2}
                  </p>
                  <span className="preexistence_phone">
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.phone1.substring(0, 3)}
                    -
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.phone1.substring(3, 7)}
                    -
                    {checkoutData.user.shipping_address &&
                      checkoutData.user.shipping_address.phone1.substring(
                        7,
                        11
                      )}
                  </span>
                  <PreexistenceSelect
                    color={"#333"}
                    margin={"20px 0 0"}
                    onChange={handleDeliveryRequirement}
                    tabIndex="0"
                  >
                    {deliveryRequirementOption.map((item) => (
                      <option key={item.no} value={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </PreexistenceSelect>
                  <SelectRequirementWrite
                    className={deliveryRequirementWrite}
                    placeholder="배송시 요청사항을 작성해 주세요."
                    maxLength="30"
                    onChange={handleDeliveryInputChange4}
                  />
                </div>
              </PreexistenceItem>
            </ul>
          </div>
        </div>
      )}

      <div className={deliveryForm1}>
        <div className="delivery_box">
          <div className="label_box">
            <label htmlFor="deliveryTitle1">배송지명</label>
          </div>
          <input
            type="text"
            className="delivery_input first"
            id="deliveryTitle1"
            value={designation}
            onChange={handleDeliveryInputChange1}
          />
        </div>

        <div className="delivery_box">
          <div className="label_box">
            <label htmlFor="deliveryName1">
              수령인<span className="vital">*</span>
            </label>
          </div>
          <input
            type="text"
            className="delivery_input second"
            id="deliveryName1"
            value={recipient}
            onChange={handleDeliveryInputChange2}
          />
        </div>

        <div className="delivery_box">
          <div className="label_box">
            <label htmlFor="sample5_address">
              배송지<span className="vital">*</span>
            </label>
          </div>
          <div className="delivery_address">
            <div className="postalCode_wrap">
              <input
                type="text"
                id="sample5_postcode"
                className="delivery_input postalCode"
                placeholder="우편번호"
                value={address1}
                onClick={handlePostalCode}
                readOnly
              />
              <input
                type="button"
                className="postalCode_search"
                value="우편번호 찾기"
                onClick={handlePostalCode}
              />
            </div>
            <input
              type="text"
              id="sample5_address"
              name="deliveryAddress"
              className="delivery_input address"
              placeholder="주소"
              value={addressDetail1}
              disabled
              readOnly
            />
            <input
              type="text"
              id="sample5_detailAddress"
              className="delivery_input address"
              placeholder="상세주소"
              value={addressDetail2}
              onChange={handleAddressDetail2}
            />
          </div>
        </div>

        <div className="delivery_box">
          <div className="label_box">
            <label htmlFor="phone1First">
              연락처1<span className="vital">*</span>
            </label>
          </div>
          <div className="tel_wrap">
            <input
              type="text"
              maxLength="3"
              name="phoneOne"
              id="phone1First"
              className="delivery_input tel"
              onChange={(e) => handleDeliveryInputChange3(e, setTel1)}
              value={tel1}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength="4"
              name="phoneTwo"
              id="phone1Second"
              className="delivery_input tel"
              onChange={(e) => handleDeliveryInputChange3(e, setTel2)}
              value={tel2}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength="4"
              name="phoneThree"
              id="phone1Third"
              className="delivery_input tel"
              onChange={(e) => handleDeliveryInputChange3(e, setTel3)}
              value={tel3}
            />
          </div>
        </div>

        <div className="delivery_box">
          <div className="label_box">
            <label htmlFor="phone1Second">연락처2</label>
          </div>
          <div className="tel_wrap">
            <input
              type="text"
              maxLength="4"
              className="delivery_input tel"
              id="subPhone1First"
              onChange={(e) => handleDeliveryInputChange3(e, setTel4)}
              value={tel4}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength="4"
              className="delivery_input tel"
              onChange={(e) => handleDeliveryInputChange3(e, setTel5)}
              value={tel5}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength="4"
              className="delivery_input tel"
              onChange={(e) => handleDeliveryInputChange3(e, setTel6)}
              value={tel6}
            />
          </div>
        </div>

        <div className="delivery_box">
          <div className="label_box"></div>
          <DeliveryRequirementWrap>
            <PreexistenceSelect
              color={"#333"}
              onChange={handleDeliveryRequirement}
            >
              {deliveryRequirementOption1.map((item) => (
                <option key={item.no} value={item.label}>
                  {item.value}
                </option>
              ))}
            </PreexistenceSelect>
            <SelectRequirementWrite
              className={deliveryRequirementWrite1}
              placeholder="배송시 요청사항을 작성해 주세요."
              maxLength="30"
              onChange={handleDeliveryInputChange5}
            />
          </DeliveryRequirementWrap>
        </div>
        <div className="delivery_box notice">
          <div className="label_box"></div>
          입력하신 내용은 기본 배송지로 등록됩니다.
        </div>
      </div>
    </section>
  );
};

export default OrderDelivery;

const PreexistenceItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  font-family: "RobotoCondensed Regular", "Spoqa Han Sans 400", sans-serif;
  font-size: 15px;

  svg {
    width: 10%;
    max-width: 20px;
    height: 20px;
    vertical-align: middle;
    align-items: center;
    text-align: center;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    svg {
      max-width: 5%;
      min-width: 50px;
    }
  }
`;

const PreexistenceSelect = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  margin: ${(props) => props.margin || "0"};
  outline: none;
  padding: 10px;
  color: ${(props) => props.color || "#bababa"};
  // font-size: 15px;
  font-family: "RobotoCondensed Regular", "Spoqa Han Sans 400", sans-serif;

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    height: 50px;
  }
`;

const SelectRequirementWrite = styled.textarea`
  height: 80px;
  resize: none;
  padding: 14px;
  margin-top: 5px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  outline: none;
  font-family: "RobotoCondensed Regular", "Spoqa Han Sans 400", sans-serif;
`;

const DeliveryRequirementWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const postCodeStyle = {
  display: "block",
  position: "absolute",
  top: "28%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  zIndex: "100",
  width: "40%",
  height: "500px",
  border: "3px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
};

const tabletPostCodeStyle = {
  display: "block",
  position: "absolute",
  top: "15%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  zIndex: "101",
  width: "80%",
  height: "500px",
  border: "3px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
};

const mobilePostCodeStyle = {
  display: "block",
  position: "absolute",
  top: "15%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  zIndex: "101",
  width: "100%",
  height: "500px",
  border: "3px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
};

const postModalEscBtn = {
  display: "block",
  position: "absolute",
  top: "4%",
  left: "50%",
  padding: ".5em 1em",
  margin: ".4em .15em",
  border: "3px solid rgba(0, 0, 0, 0.1)",
  borderColor: "#dbdbdb #d2d2d2 #b2b2b2 #d2d2d3",
  cursor: "pointer",
  color: "#464646",
  borderRadius: ".2em",
  verticalAlign: "middle",
  fontSize: "1em",
  lineHeight: "1.25em",
  transform: "translate(-50%, -50%)",
};

const tabletPostModalEscBtn = {
  display: "block",
  position: "absolute",
  top: "2%",
  left: "50%",
  padding: ".5em 1em",
  margin: ".4em .15em",
  border: "3px solid rgba(0, 0, 0, 0.1)",
  borderColor: "#dbdbdb #d2d2d2 #b2b2b2 #d2d2d3",
  cursor: "pointer",
  color: "#464646",
  borderRadius: ".2em",
  verticalAlign: "middle",
  fontSize: "1em",
  lineHeight: "1.25em",
  transform: "translate(-50%, -50%)",
};

const mobilePostModalEscBtn = {
  display: "block",
  position: "absolute",
  top: "1%",
  left: "50%",
  padding: ".5em 1em",
  margin: ".4em .15em",
  border: "3px solid rgba(0, 0, 0, 0.1)",
  borderColor: "#dbdbdb #d2d2d2 #b2b2b2 #d2d2d3",
  cursor: "pointer",
  color: "#464646",
  borderRadius: ".2em",
  verticalAlign: "middle",
  fontSize: "1em",
  lineHeight: "1.25em",
  transform: "translate(-50%, -50%)",
};
