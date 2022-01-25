import styled from "styled-components";

const OrderDeliveryForm1 = ({
  deliveryForm1,
  designation,
  handleDeliveryInputChange1,
  recipient,
  handleDeliveryInputChange2,
  address1,
  handlePostalCode,
  addressDetail1,
  addressDetail2,
  handleAddressDetail2,
  handleDeliveryInputChange3,
  tel1,
  setTel1,
  tel2,
  setTel2,
  tel3,
  setTel3,
  tel4,
  setTel4,
  tel5,
  setTel5,
  tel6,
  setTel6,
  handleDeliveryRequirement,
  deliveryRequirementOption1,
  deliveryRequirementWrite1,
  handleDeliveryInputChange5,
}) => {
  return (
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
            title="연락처1-전화번호1"
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
            title="연락처1-전화번호2"
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
            title="연락처1-전화번호3"
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
            title="연락처2-전화번호1"
            onChange={(e) => handleDeliveryInputChange3(e, setTel4)}
            value={tel4}
          />
          <span className="tel_dash">-</span>
          <input
            type="text"
            maxLength="4"
            id="subPhone1Second"
            className="delivery_input tel"
            title="연락처2-전화번호2"
            onChange={(e) => handleDeliveryInputChange3(e, setTel5)}
            value={tel5}
          />
          <span className="tel_dash">-</span>
          <input
            type="text"
            maxLength="4"
            id="subPhone1Third"
            className="delivery_input tel"
            title="연락처2-전화번호3"
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
            placeholder="배송시 요청사항을 작성해 주세요. (최대 30자 이내)"
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
  );
};

export default OrderDeliveryForm1;

const DeliveryRequirementWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
