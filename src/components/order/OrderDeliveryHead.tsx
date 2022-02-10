interface DeliveryHeadProps {
  isPc: boolean;
  isTablet: boolean;
  isMobile: boolean;
  deliveryWrite: string | undefined;
  infoHeadAddress: string;
  addressDetail1: string;
  addressDetail2: string;
  checkoutData: CheckoutData;
  handleAddressBtn: any;
  arrowImg: string;
}

interface CheckoutData {
  user?: User;
}

interface User {
  shipping_address?: ShippingAddress;
}

interface ShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

const OrderDeliveryHead = ({
  isPc,
  isTablet,
  isMobile,
  deliveryWrite,
  infoHeadAddress,
  addressDetail1,
  addressDetail2,
  checkoutData,
  handleAddressBtn,
  arrowImg,
}: DeliveryHeadProps) => {
  console.log("addressDetail1", typeof addressDetail1);
  console.log("handleAddressBtn", typeof handleAddressBtn);
  console.log("checkoutData", checkoutData);
  console.log("arrowImg", arrowImg);
  return (
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
              {checkoutData?.user?.shipping_address?.address1}{" "}
              {checkoutData?.user?.shipping_address?.address2}
            </div>
          )}
          <button
            type="button"
            className="address_btn"
            onClick={handleAddressBtn}
          >
            <img src={arrowImg} alt="buttonArrow" className="address_btn_img" />
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
              {checkoutData?.user?.shipping_address?.address1}{" "}
              {checkoutData?.user?.shipping_address?.address2}
            </div>
          )}
          <button
            type="button"
            className="address_btn"
            onClick={handleAddressBtn}
          >
            <img src={arrowImg} alt="buttonArrow" className="address_btn_img" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDeliveryHead;
