import { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import Loading from "components/common/Loading";
import useDeliveryData from "hooks/useDeliveryData";
import useMyPageData from "hooks/useMyPageData";
import { parsePhone } from "utils/format-phone";
import { getFullAddress } from "utils/get-address";
import { CgClose } from "@react-icons/all-files/cg/CgClose";
import { AddDeliveryAddressModalProps, Address } from "types";

const AddDeliveryAddressModal = ({
  addDeliveryClassName,
}: AddDeliveryAddressModalProps) => {
  const [address1, setAddress1] = useState<string>("");
  const [addressDetail1, setAddressDetail1] = useState<string>("");
  const [addressDetail2, setAddressDetail2] = useState<string>("");

  const [designation, setDesignation] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");

  const [tel1, setTel1] = useState<string>("");
  const [tel2, setTel2] = useState<string>("");
  const [tel3, setTel3] = useState<string>("");
  const [tel4, setTel4] = useState<string>("");
  const [tel5, setTel5] = useState<string>("");
  const [tel6, setTel6] = useState<string>("");
  const [showDaumPostModal, setShowDaumPostModal] = useState<boolean>(false);

  const { MutateMyDeliveryData } = useDeliveryData();

  useEffect(() => {
    if (myData.shipping_address) {
      setRecipient(myData.shipping_address.recipient_name);
      setAddress1(myData.shipping_address.postal_code);
      setAddressDetail1(myData.shipping_address.address1);
      setAddressDetail2(myData.shipping_address.address2);

      const phone1 = parsePhone(myData.shipping_address.phone1);
      setTel1(phone1.tel1);
      setTel2(phone1.tel2);
      setTel3(phone1.tel3);

      const phone2 = parsePhone(myData.shipping_address.phone2);
      setTel4(phone2.tel1);
      setTel5(phone2.tel2);
      setTel6(phone2.tel3);
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

  const handlePostcodeBtnClick = () => {
    setShowDaumPostModal(true);
  };

  const handleComplete = (data: Address) => {
    let fullAddress = getFullAddress(data);

    setAddress1(data.zonecode);
    setAddressDetail1(fullAddress);

    setShowDaumPostModal(false);
  };

  const handlePostModalEscBtnClick = () => {
    setShowDaumPostModal(false);
  };

  const handleAddressDetailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddressDetail2(e.target.value);
  };

  const handleDesignationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDesignation(e.target.value);
  };

  const handleRecipientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let recipientValue = e.target.value.replace(/[^a-zㄱ-ㅎ가-힣]/gi, "");
    setRecipient(recipientValue);
  };

  const handleTelInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    let telValue = e.target.value.replace(/[^0-9]/g, "");

    setState(telValue);
  };

  return (
    <>
      {showDaumPostModal ? (
        <>
          <PostModalEscBtn
            type="button"
            aria-label="close"
            onClick={handlePostModalEscBtnClick}
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
            onChange={handleDesignationInputChange}
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
            onChange={handleRecipientInputChange}
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
                onClick={handlePostcodeBtnClick}
                readOnly
              />
              <input
                type="button"
                className="postcode_search_btn"
                value="우편번호 찾기"
                onClick={handlePostcodeBtnClick}
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
              onChange={handleAddressDetailChange}
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
              onChange={(e) => handleTelInputChange(e, setTel1)}
              value={tel1}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
              name="phoneTwo"
              id="phone1Second"
              className="delivery_input tel"
              onChange={(e) => handleTelInputChange(e, setTel2)}
              value={tel2}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
              name="phoneThree"
              id="phone1Third"
              className="delivery_input tel"
              onChange={(e) => handleTelInputChange(e, setTel3)}
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
              onChange={(e) => handleTelInputChange(e, setTel4)}
              value={tel4}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
              className="delivery_input tel"
              onChange={(e) => handleTelInputChange(e, setTel5)}
              value={tel5}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
              className="delivery_input tel"
              onChange={(e) => handleTelInputChange(e, setTel6)}
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
