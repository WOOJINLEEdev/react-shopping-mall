import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import Modal from "react-modal";
import LogoutModal from "./LogoutModal";
import StarRating from "./StarRating";

Modal.setAppElement("#root");

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [coupons, setCoupons] = useState(decoded.user.coupons);

  if (token) {
    console.log(decoded);
    console.log(decoded.user.coupons);
    console.log("쿠폰", coupons);
  }

  const handleLogoutBtn = () => {
    console.log("로그아웃 버튼 클릭");
    setIsOpen(true);
  };

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const couponMileageWrap = {
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div className="main_wrap">
      <h2 className="main_title">마이페이지</h2>
      <LogoutModal isOpen={isOpen} onRequestClose={onRequestClose} />

      <div className="myInfo">
        <p className="greet">
          <span className="greet_user">{decoded.user.user_id}</span> 회원님,
          안녕하세요!
        </p>
        <div className="modify_logout_wrap">
          <div className="myInfo_modify">회원정보 수정</div>
          <div className="myInfo_logout" onClick={handleLogoutBtn}>
            로그아웃
          </div>
        </div>
      </div>

      <ul className="my_info_wrap">
        <div style={couponMileageWrap}>
          <li className="info_li_coupon">
            쿠폰
            {coupons.map((coupon) => {
              console.log("쿠폰확인:", coupon);
              return (
                <span className="info_coupon_in">{coupon.coupon_name}</span>
              );
            })}
          </li>
          <li className="info_li_mileage">
            마일리지{" "}
            <span className="info_mileage_in">{decoded.user.mileage}</span>
          </li>
        </div>
        <li className="info_li">주문내역 조회</li>
        <li className="info_li">배송지 등록 / 변경</li>
        <li className="info_li">
          <StarRating />
        </li>
      </ul>
    </div>
  );
};

export default MyPage;
