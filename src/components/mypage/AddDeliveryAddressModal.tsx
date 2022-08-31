import { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { CgClose } from "@react-icons/all-files/cg/CgClose";

import useMyPageData from "hooks/api/useMyPageData";
import { parsePhone } from "utils/format-phone";
import { getFullAddress } from "utils/get-address";
import { isNumberCheck } from "utils/number";

import AsyncBoundary from "components/common/AsyncBoundary";
import Loading from "components/common/Loading";
import { IAddress } from "components/mypage/types";

import { myDeliveryInfoState } from "state/mypage";

interface IAddDeliveryAddressModalProps {
  addDeliveryClassName: string;
  myDeliveryAddressId: number;
}

const AddDeliveryAddressModal = ({
  addDeliveryClassName,
  myDeliveryAddressId,
}: IAddDeliveryAddressModalProps) => {
  const [myDeliveryState, setMyDeliveryState] = useRecoilState(
    myDeliveryInfoState(myDeliveryAddressId),
  );

  const [showDaumPostModal, setShowDaumPostModal] = useState(false);

  useEffect(() => {
    if (myData.shipping_address) {
      const phone1 = parsePhone(myData.shipping_address.phone1);
      const phone2 = parsePhone(myData.shipping_address.phone2);

      setMyDeliveryState({
        ...myDeliveryState,
        designation: myData.shipping_address.name,
        recipient: myData.shipping_address.recipient_name,
        address1: myData.shipping_address.postal_code,
        addressDetail1: myData.shipping_address.address1,
        addressDetail2: myData.shipping_address.address2,
        tel1: phone1.tel1,
        tel2: phone1.tel2,
        tel3: phone1.tel3,
        tel4: phone2.tel1,
        tel5: phone2.tel2,
        tel6: phone2.tel3,
      });
    }
  }, []);

  const { myData } = useMyPageData();

  const handleDesignationInputChange = (designation: string) => {
    setMyDeliveryState({ ...myDeliveryState, designation });
  };

  const handleRecipientInputChange = (recipient: string) => {
    setMyDeliveryState({ ...myDeliveryState, recipient });
  };

  const handleAddressDetailChange = (addressDetail2: string) => {
    setMyDeliveryState({ ...myDeliveryState, addressDetail2 });
  };

  const handleTelInputChange = (key: string, tel: string) => {
    if (!isNumberCheck(tel)) {
      return;
    }

    setMyDeliveryState({ ...myDeliveryState, [key]: tel });
  };

  const handlePostcodeBtnClick = () => {
    setShowDaumPostModal(true);
  };

  const handlePostModalEscBtnClick = () => {
    setShowDaumPostModal(false);
  };

  const handleComplete = (data: IAddress) => {
    let fullAddress = getFullAddress(data);

    setMyDeliveryState({
      ...myDeliveryState,
      address1: data.zonecode,
      addressDetail1: fullAddress,
    });

    setShowDaumPostModal(false);
  };

  return (
    <>
      {showDaumPostModal ? (
        <AsyncBoundary
          rejectedFallback={({ resetErrorBoundary }) => {
            setTimeout(() => {
              resetErrorBoundary();
            }, 300);
            return null;
          }}
          pendingFallback={<Loading />}
        >
          <PostModalEscBtn
            type="button"
            aria-label="close"
            onClick={handlePostModalEscBtnClick}
          >
            <CgClose />
          </PostModalEscBtn>
          <DaumPostcode onComplete={handleComplete} style={postCodeStyle} />
        </AsyncBoundary>
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
            value={myDeliveryState.designation}
            onChange={(e) => handleDesignationInputChange(e.target.value)}
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
            value={myDeliveryState.recipient}
            onChange={(e) => handleRecipientInputChange(e.target.value)}
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
                value={myDeliveryState.address1}
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
              value={myDeliveryState.addressDetail1}
              readOnly
              disabled
            />
            <input
              type="text"
              id="sample5_detailAddress"
              className="delivery_input address"
              placeholder="상세주소"
              value={myDeliveryState.addressDetail2}
              onChange={(e) => handleAddressDetailChange(e.target.value)}
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
              value={myDeliveryState.tel1}
              onChange={(e) => handleTelInputChange("tel1", e.target.value)}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
              name="phoneTwo"
              id="phone1Second"
              className="delivery_input tel"
              value={myDeliveryState.tel2}
              onChange={(e) => handleTelInputChange("tel2", e.target.value)}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
              name="phoneThree"
              id="phone1Third"
              className="delivery_input tel"
              value={myDeliveryState.tel3}
              onChange={(e) => handleTelInputChange("tel3", e.target.value)}
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
              value={myDeliveryState.tel4}
              onChange={(e) => handleTelInputChange("tel4", e.target.value)}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
              className="delivery_input tel"
              value={myDeliveryState.tel5}
              onChange={(e) => handleTelInputChange("tel5", e.target.value)}
            />
            <span className="tel_dash">-</span>
            <input
              type="text"
              maxLength={4}
              className="delivery_input tel"
              value={myDeliveryState.tel6}
              onChange={(e) => handleTelInputChange("tel6", e.target.value)}
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
