import { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import useDeliveryData from "hooks/useDeliveryData";
import useMyPageData from "hooks/useMyPageData";
import { CgClose } from "@react-icons/all-files/cg/CgClose";
import Loading from "components/common/Loading";
import { AddDeliveryAddressModalProps, Address } from "types";

const AddDeliveryAddressModal = ({
  addDeliveryClassName,
}: AddDeliveryAddressModalProps) => {
  const [address1, setAddress1] = useState("");
  const [addressDetail1, setAddressDetail1] = useState("");
  const [addressDetail2, setAddressDetail2] = useState("");

  const [designation, setDesignation] = useState("");
  const [recipient, setRecipient] = useState("");

  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [tel3, setTel3] = useState("");
  const [tel4, setTel4] = useState("");
  const [tel5, setTel5] = useState("");
  const [tel6, setTel6] = useState("");
  const [showDaumPostModal, setShowDaumPostModal] = useState(false);

  const { myDeliveryData, MutateMyDeliveryData } = useDeliveryData();

  useEffect(() => {
    if (myData.shipping_address) {
      setRecipient(myData.shipping_address.recipient_name);
      setAddress1(myData.shipping_address.postal_code);
      setAddressDetail1(myData.shipping_address.address1);
      setAddressDetail2(myData.shipping_address.address2);
      setTel1(myData.shipping_address.phone1.substring(0, 3));
      setTel2(myData.shipping_address.phone1.substring(3, 7));
      setTel3(myData.shipping_address.phone1.substring(7, 11));
      setTel4(myData.shipping_address.phone2.substring(0, 3));
      setTel5(myData.shipping_address.phone2.substring(3, 7));
      setTel6(myData.shipping_address.phone2.substring(7, 11));
    }
  }, []);

  useEffect(() => {
    MutateMyDeliveryData({
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
    });
  }, [
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
  ]);

  const { myData, loadingMyData, myDataError, mutateMyData } = useMyPageData();
  if (loadingMyData) return <Loading />;
  if (myDataError) return <div>에러발생...</div>;

  const handlePostalCode = () => {
    setShowDaumPostModal(true);
  };

  const getFullAddress = (data: Address) => {
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

  const handleComplete = (data: Address) => {
    let fullAddress = getFullAddress(data);

    setAddress1(data.zonecode);
    setAddressDetail1(fullAddress);

    setShowDaumPostModal(false);
  };

  const postModalEsc = () => {
    setShowDaumPostModal(false);
  };

  const handleAddressDetail2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail2(e.target.value);
  };

  const handleDeliveryInputChange1 = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDesignation(e.target.value);
  };

  const handleDeliveryInputChange2 = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipient(e.target.value);
  };

  const handleDeliveryInputChange3 = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    let curValue = e.target.value;
    let phoneValue = curValue.replace(/[^0-9]/g, "");

    setState(phoneValue);
  };

  return (
    <>
      {showDaumPostModal ? (
        <>
          <PostModalEscBtn
            type="button"
            aria-label="close"
            onClick={postModalEsc}
          >
            <CgClose />
          </PostModalEscBtn>
          <DaumPostcode onComplete={handleComplete} style={postCodeStyle} />
        </>
      ) : null}

      <div className={addDeliveryClassName}>
        <div className="delivery_box">
          <div className="label_box">
            <label htmlFor="deliveryTitle1">배송지명</label>
          </div>
          <input
            type="text"
            className="delivery_input first"
            id="deliveryTitle1"
            onChange={handleDeliveryInputChange1}
            value={designation}
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
              readOnly
              disabled
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
              maxLength={3}
              name="phoneOne"
              id="phone1First"
              className="delivery_input tel"
              onChange={(e) => handleDeliveryInputChange3(e, setTel1)}
              value={tel1}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
              name="phoneTwo"
              id="phone1Second"
              className="delivery_input tel"
              onChange={(e) => handleDeliveryInputChange3(e, setTel2)}
              value={tel2}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
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
              maxLength={4}
              className="delivery_input tel"
              id="subPhone1First"
              onChange={(e) => handleDeliveryInputChange3(e, setTel4)}
              value={tel4}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
              className="delivery_input tel"
              onChange={(e) => handleDeliveryInputChange3(e, setTel5)}
              value={tel5}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
              className="delivery_input tel"
              onChange={(e) => handleDeliveryInputChange3(e, setTel6)}
              value={tel6}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDeliveryAddressModal;

const postCodeStyle = {
  display: "block",
  position: "absolute",
  top: "9%",
  left: "0",
  right: "0",
  width: "100%",
  height: "100%",
  margin: "0 auto",
  borderTop: "3px solid rgba(0, 0, 0, 0.2)",
  borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
} as const;

const PostModalEscBtn = styled.button`
  display: block;
  position: absolute;
  width: 100%;
  top: 5%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin: 0 auto;
  transform: translate(-50%, -50%);
  padding: 10px;
  border: 0;
  border-radius: 5px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #333;
  cursor: pointer;
  font-size: 30px;
  line-height: 30px;
  text-align: right;
`;
