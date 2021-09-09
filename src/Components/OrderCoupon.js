import React, { useState } from "react";
import jwt_decode from "jwt-decode";

const OrderCoupon = ({
  mileage,
  usedMileage,
  selectOption,
  isMobile,
  isTablet,
  onChangeMileageInput,
  handleSelectOption,
  allMileage,
  value,
}) => {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [coupons, setCoupons] = useState(decoded.user.coupons);
  console.log(coupons);

  return (
    <section className="coupon_zone">
      <div className="coupon_info_head_wrap">
        <h2 className="info_header coupon_mileage">쿠폰 / 마일리지</h2>

        {isTablet && (
          <div className="info_head_coupon">
            <span>
              쿠폰 {selectOption > 0 ? "1" : "0"}장 / {usedMileage}p 사용
            </span>
          </div>
        )}
        {isMobile && (
          <div className="info_head_coupon">
            <span>
              쿠폰 {selectOption > 0 ? "1" : "0"}장 / {usedMileage}p 사용
            </span>
          </div>
        )}
      </div>

      <div className="coupon_mileage_wrap">
        <div className="coupon_box">
          <div className="label_box">
            <label>쿠폰</label>
          </div>
          <select className="coupon_select" onChange={handleSelectOption}>
            <option value=""> 사용가능 쿠폰 {coupons.length}장</option>
            {coupons.map((coupon) => (
              <option key={coupon.id} value={coupon.coupon_name}>
                {coupon.coupon_name}
              </option>
            ))}
          </select>
        </div>
        <div className="coupon_box mileage">
          <div className="label_box">
            <label>마일리지</label>
          </div>
          <div className="mileage_wrap">
            <div className="mileage_input_btn">
              <input
                type="text"
                className="mileage_input"
                onChange={onChangeMileageInput}
                placeholder="0"
                value={value}
              />
              <button
                type="button"
                className="all_mileage"
                name="allMileage"
                onClick={allMileage}
              >
                모두 사용
              </button>
            </div>
            <span className="mileage_own">
              보유 마일리지
              <span className="mileage_unit">
                <span className="mileage_in">
                  {mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                p
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderCoupon;
