import styled from "styled-components";
import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark";

const OrderDeliveryFormTablet = ({
  deliveryWrapClass,
  handleDeliveryWrite,
  deliveryClassName,
  deliveryClassName1,
  checkoutData,
  deliveryForm,
  handleDeliveryRequirement,
  deliveryRequirementWrite,
  handleDeliveryInputChange4,
  deliveryRequirementOption,
}) => {
  return (
    <div className={deliveryWrapClass}>
      <ul className="delivery_write_choice" onClick={handleDeliveryWrite}>
        <li className={deliveryClassName} data-name="기존 배송지" tabIndex="0">
          기존 배송지
        </li>
        <li className={deliveryClassName1} data-name="신규 입력" tabIndex="0">
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
                  checkoutData.user.shipping_address.phone1.substring(7, 11)}
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
                placeholder="배송시 요청사항을 작성해 주세요. (최대 30자 이내)"
                maxLength="30"
                onChange={handleDeliveryInputChange4}
              />
            </div>
          </PreexistenceItem>
        </ul>
      </div>
    </div>
  );
};

export default OrderDeliveryFormTablet;

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
