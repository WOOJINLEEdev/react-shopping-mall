import { useState } from "react";
import { OrderCouponProps, Coupon } from "types";
import { atom, useRecoilState, selector } from "recoil";

const selectOptionState = atom<number>({
  key: "selectOptionState",
  default: 0,
});

const selectCouponIdState = atom<number>({
  key: "selectCouponIdState",
  default: 0,
});

const usedMileageState = atom<number>({
  key: "usedMileageState",
  default: 0,
});

interface CouponStateSelector {
  selectOption: number;
  selectCouponId: number;
  usedMileage: number;
}

export const couponStateSelector = selector<CouponStateSelector>({
  key: "couponStateSelector",
  get: ({ get }) => {
    const selectOption = get(selectOptionState);
    const selectCouponId = get(selectCouponIdState);
    const usedMileage = get(usedMileageState);

    return { selectOption, selectCouponId, usedMileage };
  },
});

const OrderCoupon = ({
  checkoutData,
  isMobile,
  isTablet,
}: OrderCouponProps) => {
  const [coupons, setCoupons] = useState<Coupon[] | undefined>(
    checkoutData.user.coupons
  );
  const [mileage, setMileage] = useState<number>(checkoutData.user.mileage);
  const [availableMileage, setAvailableMileage] = useState<number>(
    checkoutData.user.mileage
  );
  const [selectOption, setSelectOption] =
    useRecoilState<number>(selectOptionState);
  const [selectCouponId, setSelectCouponId] =
    useRecoilState<number>(selectCouponIdState);
  const [usedMileage, setUsedMileage] =
    useRecoilState<number>(usedMileageState);

  console.log("selectOption", selectOption);
  console.log("selectCouponId", selectCouponId);
  console.log("usedMileage", usedMileage);

  const handleSelectOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (coupons) {
      if (e.target.value === "가입축하 20% 할인") {
        setSelectOption(0.2);
        return setSelectCouponId(coupons[0].id);
      }

      if (e.target.value === "가입축하 5,000원 할인") {
        if (coupons.length < 2) {
          setSelectCouponId(coupons[0].id);
          return setSelectOption(5000);
        }

        setSelectCouponId(coupons[1].id);
        return setSelectOption(5000);
      }

      setSelectCouponId(0);
      return setSelectOption(0);
    }
  };

  function removeNotNumber(text: string) {
    return text
      .replace(/[^0-9.]/g, "")
      .replace(/(\.*)\./g, "")
      .replace(/(^0+)/, "");
  }

  const handleMileageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let mileageInput = Number(removeNotNumber(e.target.value));

    let unavailableMileage =
      availableMileage === 0 || availableMileage === undefined;

    if (mileageInput > 0 && unavailableMileage) {
      alert("보유 마일리지보다 많이 입력할 수 없습니다.");
      setMileage(0);
      return setUsedMileage(0);
    }

    if (mileageInput > availableMileage) {
      alert("보유 마일리지보다 많이 사용할 수 없습니다.");
      setMileage(0);
      return setUsedMileage(availableMileage);
    }

    setMileage(availableMileage - mileageInput);
    return setUsedMileage(mileageInput);
  };

  const handleAllMileageBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let allMileageTarget = (e.target as HTMLButtonElement).name;

    if (availableMileage === 0) return;

    if (allMileageTarget === "allMileage") {
      if (usedMileage === availableMileage && mileage === 0) {
        setMileage(availableMileage);
        setUsedMileage(0);
        return;
      }

      if (!checkoutData.user.mileage) {
        setMileage(0);
        setUsedMileage(0);
        return;
      }

      if (!usedMileage) {
        setUsedMileage(0);
      }

      setMileage(0);
      setUsedMileage(availableMileage);
      return;
    }

    if (allMileageTarget === "mile") {
      if (usedMileage === availableMileage && mileage === 0) {
        setMileage(availableMileage);
        setUsedMileage(0);
        return;
      }

      if (!checkoutData.user.mileage) {
        setMileage(0);
        setUsedMileage(0);
        return;
      }

      if (!usedMileage) {
        setUsedMileage(0);
      }

      setMileage(0);
      setUsedMileage(availableMileage);
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
            onChange={handleSelectOptionChange}
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
                onChange={handleMileageInputChange}
                placeholder="0"
                value={usedMileage}
              />
              <button
                type="button"
                className="all_mileage"
                name="allMileage"
                onClick={handleAllMileageBtnClick}
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

export default OrderCoupon;
