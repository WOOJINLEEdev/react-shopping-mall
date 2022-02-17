import React, { useEffect, useState } from "react";
import useCheckoutCouponData from "hooks/useCheckoutCouponData";
import { OrderCouponProps, Coupon } from "types";

const OrderCoupon = ({
  checkoutData,
  isMobile,
  isTablet,
}: OrderCouponProps) => {
  const { checkoutCouponData, MutateCheckoutCouponData } =
    useCheckoutCouponData();
  const [coupons, setCoupons] = useState(checkoutData.user.coupons);
  const [mileage, setMileage] = useState(checkoutData.user.mileage);
  const [availableMileage, setAvailableMileage] = useState<number>(
    checkoutData.user.mileage
  );
  const [selectCouponId, setSelectCouponId] = useState(0);
  const [selectOption, setSelectOption] = useState(0);
  const [usedMileage, setUsedMileage] = useState<number>();
  const [value, setValue] = useState("");

  useEffect(() => {
    MutateCheckoutCouponData({
      selectOption,
      selectCouponId,
      usedMileage,
    });
  }, [usedMileage, selectCouponId, selectOption]);

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (coupons) {
      if (e.target.value === "가입축하 20% 할인") {
        console.log("20퍼센트 할인");

        setSelectOption(0.2);
        return setSelectCouponId(coupons[0].id);
      } else if (e.target.value === "가입축하 5,000원 할인") {
        console.log("5천원 할인");

        if (coupons.length < 2) {
          setSelectCouponId(coupons[0].id);
          return setSelectOption(5000);
        }

        setSelectCouponId(coupons[1].id);
        return setSelectOption(5000);
      } else {
        setSelectCouponId(0);
        return setSelectOption(0);
      }
    }
  };

  const handleMileage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let targetValue = Number(
      e.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\.*)\./g, "")
        .replace(/(^0+)/, "")
    );

    if (
      (targetValue > 0 && availableMileage === 0) ||
      (targetValue > 0 && availableMileage === undefined)
    ) {
      alert("보유 마일리지보다 많이 입력할 수 없습니다.");
      setMileage(0);
      return setUsedMileage(0);
    }

    if (targetValue > availableMileage) {
      alert("보유 마일리지보다 많이 사용할 수 없습니다.");
      targetValue = availableMileage;
      setMileage(0);
      return setUsedMileage(availableMileage);
    }

    setMileage(availableMileage - targetValue);
    return setUsedMileage(targetValue);
  };

  const allMileage = (e: React.MouseEvent<HTMLButtonElement>) => {
    let allMileageTarget = (e.target as HTMLButtonElement).name;

    if (allMileageTarget === "allMileage") {
      if (usedMileage === availableMileage && mileage === 0) {
        allMileageTarget = "mile";
        setMileage(availableMileage);
        setUsedMileage(0);
        return;
      }

      if (!checkoutData.user.mileage) {
        setMileage(0);
        return setUsedMileage(0);
      }

      if (!usedMileage || usedMileage === undefined) {
        setUsedMileage(0);
      }
      console.log("모두사용 버튼 클릭");
      allMileageTarget = "mile";
      setMileage(0);
      setUsedMileage(availableMileage);
      return;
    }

    if (allMileageTarget === "mile") {
      if (usedMileage === availableMileage && mileage === 0) {
        allMileageTarget = "allMileage";
        setMileage(availableMileage);
        setUsedMileage(0);
        return;
      }

      if (!checkoutData.user.mileage) {
        setMileage(0);
        return setUsedMileage(0);
      }

      if (!usedMileage || usedMileage === undefined) {
        setUsedMileage(0);
      }

      allMileageTarget = "allMileage";
      setMileage(0);
      setUsedMileage(availableMileage);
      return;
    }
  };

  return (
    <section className="coupon_zone">
      <div className="coupon_info_head_wrap">
        <h2 className="info_header coupon_mileage">쿠폰 / 마일리지</h2>

        {isTablet && (
          <div className="info_head_coupon">
            <span>
              쿠폰 {selectOption > 0 ? "1" : "0"}장 /{" "}
              {usedMileage === 0 || usedMileage === undefined
                ? "0"
                : usedMileage}
              p 사용
            </span>
          </div>
        )}
        {isMobile && (
          <div className="info_head_coupon">
            <span>
              쿠폰 {selectOption > 0 ? "1" : "0"}장 /{" "}
              {usedMileage === 0 || usedMileage === undefined
                ? "0"
                : usedMileage}
              p 사용
            </span>
          </div>
        )}
      </div>

      <div className="coupon_mileage_wrap">
        <div className="coupon_box">
          <div className="label_box">
            <label htmlFor="couponSelect">쿠폰</label>
          </div>
          <select
            className="coupon_select"
            onChange={handleSelectOption}
            id="couponSelect"
          >
            <option value="">
              {" "}
              사용가능 쿠폰 {coupons ? coupons.length : "0"}장
            </option>
            {coupons
              ? coupons.map((coupon: Coupon) => (
                  <option key={coupon.id} value={coupon.coupon_name}>
                    {coupon.coupon_name}
                  </option>
                ))
              : ""}
          </select>
        </div>
        <div className="coupon_box mileage">
          <div className="label_box">
            <label htmlFor="mileageInput">마일리지</label>
          </div>
          <div className="mileage_wrap">
            <div className="mileage_input_btn">
              <input
                type="text"
                className="mileage_input"
                id="mileageInput"
                onChange={handleMileage}
                placeholder="0"
                value={usedMileage}
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
                  {!mileage
                    ? "0"
                    : mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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

export default React.memo(OrderCoupon);
