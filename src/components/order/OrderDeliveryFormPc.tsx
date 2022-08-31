import { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { parsePhone } from "utils/format-phone";

import {
  IOrderDeliveryFormDeviceProps,
  IDeliveryRequirementOption,
  IPreexistenceSelectProps,
} from "components/order/types";

import { deliveryInfoState } from "state";

const OrderDeliveryFormPc = ({
  deliveryWrapClass,
  handleDeliveryTabClick,
  deliveryClassName,
  deliveryClassName1,
  checkoutData,
  deliveryForm,
  handleRequirementOptionChange,
  deliveryFirstRequirementOption,
  deliveryFirstRequirementWrite,
  checkoutId,
  requirement,
}: IOrderDeliveryFormDeviceProps) => {
  const [deliveryState, setDeliveryState] = useRecoilState(
    deliveryInfoState(checkoutId),
  );

  useEffect(() => {
    return setDeliveryState({
      ...deliveryState,
      requirement,
    });
  }, [requirement]);

  const handleFirstRequirementChange = (requirement: string) => {
    setDeliveryState({ ...deliveryState, requirement });
  };

  return (
    <div className={deliveryWrapClass}>
      <ul className="delivery_write_choice" onClick={handleDeliveryTabClick}>
        <Li
          className={deliveryClassName}
          disabled={!checkoutData.user.shipping_address && "disabled"}
          data-name="기존 배송지"
          tabIndex={0}
        >
          기존 배송지
        </Li>
        <li className={deliveryClassName1} data-name="신규 입력" tabIndex={0}>
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
            value={
              checkoutData.user.shipping_address?.name &&
              checkoutData.user.shipping_address.name
            }
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
                  checkoutData.user.shipping_address &&
                  checkoutData.user.shipping_address.postal_code
                }
                disabled
                readOnly
              />
              <input
                type="button"
                className="postcode_search_btn"
                value="우편번호 찾기"
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
              maxLength={3}
              name="phoneFirst"
              id="phoneFirst"
              className="delivery_input tel"
              title="연락처1_전화번호1"
              value={
                checkoutData.user.shipping_address
                  ? parsePhone(checkoutData.user.shipping_address.phone1).tel1
                  : ""
              }
              readOnly
            />
            <span className="tel_dash">-</span>
            <input
              type="tel"
              maxLength={4}
              name="phoneSecond"
              id="phoneSecond"
              title="연락처1_전화번호2"
              className="delivery_input tel"
              value={
                checkoutData.user.shipping_address
                  ? parsePhone(checkoutData.user.shipping_address.phone1).tel2
                  : ""
              }
              readOnly
            />
            <span className="tel_dash">-</span>
            <input
              type="tel"
              maxLength={4}
              name="phoneThird"
              id="phoneThird"
              className="delivery_input tel"
              title="연락처1_전화번호3"
              value={
                checkoutData.user.shipping_address
                  ? parsePhone(checkoutData.user.shipping_address.phone1).tel3
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
              maxLength={4}
              id="subPhoneFirst"
              className="delivery_input tel"
              title="연락처2_전화번호1"
              value={
                checkoutData.user.shipping_address &&
                checkoutData.user.shipping_address.phone2
                  ? parsePhone(checkoutData.user.shipping_address.phone2).tel1
                  : ""
              }
              readOnly
            />
            <span className="tel_dash">-</span>
            <input
              type="tel"
              maxLength={4}
              id="subPhoneSecond"
              className="delivery_input tel"
              title="연락처2_전화번호2"
              value={
                checkoutData.user.shipping_address &&
                checkoutData.user.shipping_address.phone2
                  ? parsePhone(checkoutData.user.shipping_address.phone2).tel2
                  : ""
              }
              readOnly
            />
            <span className="tel_dash">-</span>
            <input
              type="tel"
              maxLength={4}
              id="subPhoneThird"
              className="delivery_input tel"
              title="연락처2_전화번호3"
              value={
                checkoutData.user.shipping_address &&
                checkoutData.user.shipping_address.phone2
                  ? parsePhone(checkoutData.user.shipping_address.phone2).tel3
                  : ""
              }
              readOnly
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
              {deliveryFirstRequirementOption.map(
                (item: IDeliveryRequirementOption) => (
                  <option
                    key={item.no}
                    value={item.label}
                    className="option_test"
                  >
                    {item.value}
                  </option>
                ),
              )}
            </PreexistenceSelect>
            <SelectRequirementWrite
              className={deliveryFirstRequirementWrite}
              placeholder="배송시 요청사항을 작성해 주세요. (최대 30자 이내)"
              maxLength={30}
              value={deliveryState.requirement}
              onChange={(e) => handleFirstRequirementChange(e.target.value)}
            />
          </DeliveryRequirementWrap>
        </div>

        <div className="delivery_box notice">
          <div className="label_box" />※ 배송지를 수정하길 원하시면 신규입력
          탭을 이용해주세요.
        </div>
      </div>
    </div>
  );
};

export default OrderDeliveryFormPc;

interface LiProps {
  disabled?: string | boolean;
}

const Li = styled.li<LiProps>``;

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
