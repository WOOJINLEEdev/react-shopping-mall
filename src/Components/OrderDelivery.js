import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import DaumPostcode from "react-daum-postcode";
import { useMediaQuery } from "react-responsive";
import {
  deliveryName,
  deliveryAddress,
  phoneNumber,
} from "./DeliveryValidation";

const OrderDelivery = ({ onChange, delivery }) => {
  const [showDaumPostModal, setShowDaumPostModal] = useState(false);
  const [address, setAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [addressDetail1, setAddressDetail1] = useState("");

  const [deliveryClassName, setDeliveryClassName] =
    useState("delivery_write old");
  const [deliveryClassName1, setDeliveryClassName1] =
    useState("delivery_write new");
  const [deliveryForm, setDeliveryForm] = useState("delivery_box_wrap");
  const [deliveryForm1, setDeliveryForm1] = useState(
    "delivery_box_wrap_second hide"
  );

  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width:767px)",
  });

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
    top: "25%",
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
    top: "20%",
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

  const postModalEscBtn = {
    display: "block",
    position: "absolute",
    top: "3%",
    left: "47%",
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
  };

  const tabletPostModalEscBtn = {
    display: "block",
    position: "absolute",
    top: "13%",
    left: "45%",
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
  };

  const mobilePostModalEscBtn = {
    display: "block",
    position: "absolute",
    top: "7%",
    left: "42%",
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
  };

  const postModalEsc = () => {
    setShowDaumPostModal(false);
  };

  const handleDeliveryWrite = (e) => {
    console.log(e.target.dataset.name);

    if (e.target.dataset.name === "신규 입력") {
      setDeliveryClassName("delivery_write new");
      setDeliveryClassName1("delivery_write old");
      setDeliveryForm("delivery_box_wrap_second hide");
      setDeliveryForm1("delivery_box_wrap");
    } else if (e.target.dataset.name === "기존 배송지") {
      setDeliveryClassName("delivery_write old");
      setDeliveryClassName1("delivery_write new");
      setDeliveryForm("delivery_box_wrap");
      setDeliveryForm1("delivery_box_wrap_second hide");
    }
  };

  const initialValues = {
    deliveryName: "",
    deliveryAddress: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    deliveryName: deliveryName(),
    deliveryAddress: deliveryAddress(),
    phoneNumber: phoneNumber(),
  });

  const onSubmit = () => {
    console.log(deliveryName);
  };

  return (
    <section className="delivery_info">
      <div className="info_head_wrap">
        <h2 className="info_head delivery">배송정보</h2>
        <div className="info_head_sub">
          <span className="vital">*</span>표시는 필수입력 항목
        </div>
      </div>
      <ul className="delivery_write_choice" onClick={handleDeliveryWrite}>
        <li className={deliveryClassName} data-name="기존 배송지">
          기존 배송지
        </li>
        <li className={deliveryClassName1} data-name="신규 입력">
          신규입력
        </li>
      </ul>

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

      <div className={deliveryForm}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="delivery_box">
              <div className="label_box">
                <label>배송지명</label>
              </div>
              <input type="text" className="delivery_input first" />
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label>
                  수령인<span className="vital">*</span>
                </label>
              </div>
              <Field
                type="text"
                name="deliveryName"
                id="deliveryName"
                className="delivery_input second"
              />
              <ErrorMessage
                name="deliveryName"
                component="div"
                className="input_check"
              />
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label>
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
                    value={address}
                    onClick={handlePostalCode}
                    // disabled
                  />
                  <input
                    type="button"
                    className="postalCode_search"
                    value="우편번호 찾기"
                    onClick={handlePostalCode}
                  />
                </div>
                <Field
                  type="text"
                  name="deliveryAddress"
                  id="sample6_address"
                  className="delivery_input address"
                  placeholder="주소"
                  value={addressDetail}
                  disabled
                />
                {/* <br /> */}
                <input
                  type="text"
                  id="sample6_detailAddress"
                  className="delivery_input address"
                  placeholder="상세주소"
                />
                <input
                  type="text"
                  id="sample6_extraAddress"
                  className="delivery_input address"
                  placeholder="참고항목"
                />
              </div>
              <ErrorMessage
                name="deliveryAdderess"
                component="div"
                className="input_check"
              />
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label>
                  연락처1<span className="vital">*</span>
                </label>
              </div>
              <div className="tel_wrap">
                <Field
                  type="tel"
                  maxLength="4"
                  name="phoneFirst"
                  id="phoneFirst"
                  className="delivery_input tel"
                />
                <span className="tel_dash">-</span>
                <Field
                  type="tel"
                  maxLength="4"
                  name="phoneSecond"
                  id="phoneSecond"
                  className="delivery_input tel"
                />
                <span className="tel_dash">-</span>
                <Field
                  type="tel"
                  maxLength="4"
                  name="phoneThird"
                  id="phoneThird"
                  className="delivery_input tel"
                />
              </div>
              <ErrorMessage
                name="phoneFirst"
                component="div"
                className="input_check"
              />
              <ErrorMessage
                name="phoneSecond"
                component="div"
                className="input_check"
              />
              <ErrorMessage
                name="phoneThird"
                component="div"
                className="input_check"
              />
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label>연락처2</label>
              </div>
              <div className="tel_wrap">
                <input
                  type="tel"
                  maxLength="4"
                  className="delivery_input tel"
                />
                <span className="tel_dash">-</span>
                <input
                  type="tel"
                  maxLength="4"
                  className="delivery_input tel"
                />
                <span className="tel_dash">-</span>
                <input
                  type="tel"
                  maxLength="4"
                  className="delivery_input tel"
                />
              </div>
            </div>

            <div className="delivery_box notice">
              <div className="label_box"></div>
              기본 배송지입니다. 주문 시 변경하신 내용으로 기본 배송지 주소가
              수정됩니다.
            </div>

            <div className="delivery_box">
              <div className="label_box"></div>
              <input
                type="text"
                className="delivery_input request"
                placeholder="배송시 요청사항을 작성해 주세요."
              />
            </div>
          </Form>
        </Formik>
      </div>

      <div className={deliveryForm1}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="delivery_box">
              <div className="label_box">
                <label>배송지명</label>
              </div>
              <input type="text" className="delivery_input first" />
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label>
                  수령인<span className="vital">*</span>
                </label>
              </div>
              <input type="text" className="delivery_input second" />
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label>
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
                  />
                  <input
                    type="button"
                    className="postalCode_search"
                    value="우편번호 찾기"
                    onClick={handlePostalCode}
                  />
                </div>
                <Field
                  type="text"
                  id="sample5_address"
                  name="deliveryAddress"
                  className="delivery_input address"
                  placeholder="주소"
                  value={addressDetail1}
                  disabled
                />
                {/* <br /> */}
                <input
                  type="text"
                  id="sample5_detailAddress"
                  className="delivery_input address"
                  placeholder="상세주소"
                />
                <input
                  type="text"
                  id="sample5_extraAddress"
                  className="delivery_input address"
                  placeholder="참고항목"
                />
              </div>
              <ErrorMessage
                name="deliveryAdderess"
                component="div"
                className="input_check"
              />
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label>
                  연락처1<span className="vital">*</span>
                </label>
              </div>
              <div className="tel_wrap">
                <Field
                  type="tel"
                  maxLength="4"
                  name="phoneOne"
                  id="tel_fourth"
                  className="delivery_input tel"
                />
                <span className="tel_dash">-</span>
                <Field
                  type="tel"
                  maxLength="4"
                  name="phoneTwo"
                  id="tel_fifth"
                  className="delivery_input tel"
                />
                <span className="tel_dash">-</span>
                <Field
                  type="tel"
                  maxLength="4"
                  name="phoneThree"
                  id="tel_sixth"
                  className="delivery_input tel"
                />
              </div>
              <ErrorMessage
                name="phoneOne"
                component="div"
                className="input_check"
              />
              <ErrorMessage
                name="phoneTwo"
                component="div"
                className="input_check"
              />
              <ErrorMessage
                name="phoneThree"
                component="div"
                className="input_check"
              />
            </div>

            <div className="delivery_box">
              <div className="label_box">
                <label>연락처2</label>
              </div>
              <div className="tel_wrap">
                <input
                  type="tel"
                  maxLength="4"
                  className="delivery_input tel"
                />
                <span className="tel_dash">-</span>
                <input
                  type="tel"
                  maxLength="4"
                  className="delivery_input tel"
                />
                <span className="tel_dash">-</span>
                <input
                  type="tel"
                  maxLength="4"
                  className="delivery_input tel"
                />
              </div>
            </div>

            <div className="delivery_box notice">
              <div className="label_box"></div>
              기본 배송지입니다. 주문 시 변경하신 내용으로 기본 배송지 주소가
              수정됩니다.
            </div>

            <div className="delivery_box">
              <div className="label_box"></div>
              <input
                type="text"
                className="delivery_input request"
                placeholder="배송시 요청사항을 작성해 주세요."
              />
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default OrderDelivery;
