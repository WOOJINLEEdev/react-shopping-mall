import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import DaumPostcode from "react-daum-postcode";
import { CgClose } from "@react-icons/all-files/cg/CgClose";

import { getFullAddress } from "utils/get-address";
import { isNumberCheck } from "utils/number";

import {
  IDeliveryForm,
  IDeliveryRequirementOption,
  IPreexistenceSelectProps,
} from "components/order/types";
import { IAddress } from "components/mypage/types";

import { deliveryInfoState } from "state";

export interface IOrderDeliveryFormProps extends IDeliveryForm {
  deliveryForm1: string;
  requirement1: string;
}

const OrderDeliveryForm = ({
  deliveryForm1,
  deliveryClassName,
  deliveryClassName1,
  checkoutId,
  handleRequirementOptionChange,
  deliverySecondRequirementOption,
  deliverySecondRequirementWrite,
  requirement1,
}: IOrderDeliveryFormProps) => {
  const [deliveryState, setDeliveryState] = useRecoilState(
    deliveryInfoState(checkoutId),
  );
  const [showDaumPostModal, setShowDaumPostModal] = useState(false);

  useEffect(() => {
    return setDeliveryState({
      ...deliveryState,
      deliveryClassName,
      deliveryClassName1,
      requirement1,
    });
  }, [requirement1, deliveryClassName, deliveryClassName1]);

  const handleDesignationInputChange = (designation: string) => {
    setDeliveryState({ ...deliveryState, designation });
  };

  const handleRecipientInputChange = (recipient: string) => {
    setDeliveryState({ ...deliveryState, recipient });
  };

  const handleAddressDetailChange = (addressDetail2: string) => {
    setDeliveryState({ ...deliveryState, addressDetail2 });
  };

  const handleTelInputChange = (key: string, tel: string) => {
    if (!isNumberCheck(tel)) {
      return;
    }

    setDeliveryState({ ...deliveryState, [key]: tel });
  };

  const handleSecondRequirementChange = (requirement1: string) => {
    setDeliveryState({ ...deliveryState, requirement1 });
  };

  const handlePostcodeBtnClick = () => {
    setShowDaumPostModal(true);
  };

  const handlePostModalEscBtnClick = () => {
    setShowDaumPostModal(false);
  };

  const handleComplete = (data: IAddress) => {
    let fullAddress = getFullAddress(data);

    if (deliveryClassName1 === "delivery_write selected") {
      setDeliveryState({
        ...deliveryState,
        address1: data.zonecode,
        addressDetail1: fullAddress,
      });
    }

    setShowDaumPostModal(false);
  };

  return (
    <div className={deliveryForm1}>
      {showDaumPostModal && (
        <PostWrap>
          <PostModalEscBtn
            type="button"
            aria-label="close"
            onClick={handlePostModalEscBtnClick}
          >
            <CgClose />
          </PostModalEscBtn>
          <DaumPostCodeStyle onComplete={handleComplete} />
        </PostWrap>
      )}

      <div className="delivery_box">
        <div className="label_box">
          <label htmlFor="deliveryTitle1">배송지명</label>
        </div>
        <input
          type="text"
          className="delivery_input first"
          id="deliveryTitle1"
          value={deliveryState.designation}
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
          value={deliveryState.recipient}
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
              value={deliveryState.address1}
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
            value={deliveryState.addressDetail1}
            disabled
            readOnly
          />
          <input
            type="text"
            id="sample5_detailAddress"
            className="delivery_input address"
            placeholder="상세주소"
            value={deliveryState.addressDetail2}
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
            title="연락처1-전화번호1"
            value={deliveryState.tel1}
            onChange={(e) => handleTelInputChange("tel1", e.target.value)}
          />
          <span className="tel_dash">-</span>
          <input
            type="text"
            maxLength={4}
            name="phoneTwo"
            id="phone1Second"
            className="delivery_input tel"
            title="연락처1-전화번호2"
            value={deliveryState.tel2}
            onChange={(e) => handleTelInputChange("tel2", e.target.value)}
          />
          <span className="tel_dash">-</span>
          <input
            type="text"
            maxLength={4}
            name="phoneThree"
            id="phone1Third"
            className="delivery_input tel"
            title="연락처1-전화번호3"
            value={deliveryState.tel3}
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
            title="연락처2-전화번호1"
            value={deliveryState.tel4}
            onChange={(e) => handleTelInputChange("tel4", e.target.value)}
          />
          <span className="tel_dash">-</span>
          <input
            type="text"
            maxLength={4}
            id="subPhone1Second"
            className="delivery_input tel"
            title="연락처2-전화번호2"
            value={deliveryState.tel5}
            onChange={(e) => handleTelInputChange("tel5", e.target.value)}
          />
          <span className="tel_dash">-</span>
          <input
            type="text"
            maxLength={4}
            id="subPhone1Third"
            className="delivery_input tel"
            title="연락처2-전화번호3"
            value={deliveryState.tel6}
            onChange={(e) => handleTelInputChange("tel6", e.target.value)}
          />
        </div>
      </div>

      <div className="delivery_box">
        <div className="label_box" />
        <DeliveryRequirementWrap>
          <PreexistenceSelect
            color={"#333"}
            onChange={handleRequirementOptionChange}
          >
            {deliverySecondRequirementOption.map(
              (item: IDeliveryRequirementOption) => (
                <option key={item.no} value={item.label}>
                  {item.value}
                </option>
              ),
            )}
          </PreexistenceSelect>
          <SelectRequirementWrite
            className={deliverySecondRequirementWrite}
            placeholder="배송시 요청사항을 작성해 주세요. (최대 30자 이내)"
            maxLength={30}
            value={deliveryState.requirement1}
            onChange={(e) => handleSecondRequirementChange(e.target.value)}
          />
        </DeliveryRequirementWrap>
      </div>
      <div className="delivery_box notice">
        <div className="label_box" />
        입력하신 내용은 기본 배송지로 등록됩니다.
      </div>
    </div>
  );
};

export default OrderDeliveryForm;

const DeliveryRequirementWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PreexistenceSelect = styled.select<IPreexistenceSelectProps>`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin: ${(props) => props.margin || "0"};
  color: ${(props) => props.color || "#bababa"};
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  outline: none;
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

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: calc(100% - 30px);
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: calc(100% - 30px);
  }
`;

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

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 85%;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 80%;
  }
`;

const DaumPostCodeStyle = styled(DaumPostcode)`
  display: block;
  width: 100%;
  min-height: 500px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    min-height: 700px;
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
