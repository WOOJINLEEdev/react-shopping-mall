import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import Modal from "react-modal";
import styled from "styled-components";
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

  const MyPageWrap = styled.div`
    width: 824px;
    height: 100%;
    margin: 0 auto;
    padding: 50px 100px;

    @media only screen and (min-width: 320px) and (max-width: 767px) {
      width: calc(100% - 40px);
      padding: 30px 20px 60px;
    }

    @media only screen and (min-width: 768px) and (max-width: 1023px) {
      width: calc(100% - 80px);
      padding: 40px;
    }
  `;

  const MyInfo = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100px;
    line-height: 100px;
    padding: 10px;
    margin: 30px 0;
    background-color: #fff;
    color: #686464;
    border-radius: 5px;
    border: 2px solid #d4d4d4;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);

    @media only screen and (min-width: 320px) and (max-width: 767px) {
      justify-content: flex-start;
      flex-direction: column;
      height: 200px;
      align-items: center;
    }
  `;

  const ModifyLogoutWrap = styled.div`
    @media only screen and (min-width: 320px) and (max-width: 767px) {
      display: flex;
      width: 100%;
      justify-content: center;
    }
  `;

  const CouponMileageWrap = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const Coupon = styled.li`
    display: inline-block;
    width: 40%;
    padding: 30px;
    background-color: #fff;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    border: 2px solid #d4d4d4;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    margin: 0;

    :hover {
      border: 1px solid #efefef;
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 20%);
      transition: all 0.25s;
      transform: translateY(-2px);
      color: green;
    }

    @media only screen and (min-width: 320px) and (max-width: 767px) {
      width: 50%;
      padding: 20px;
    }
  `;

  const Mileage = styled.li`
    width: 40%;
    padding: 30px;
    background-color: #fff;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    border: 2px solid #d4d4d4;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);

    :hover {
      border: 1px solid #efefef;
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 20%);
      transition: all 0.25s;
      transform: translateY(-2px);
      color: green;
    }

    @media only screen and (min-width: 320px) and (max-width: 767px) {
      width: 30%;
      padding: 20px;
    }
  `;

  return (
    <MyPageWrap className="main_wrap">
      <h2 className="main_title">마이페이지</h2>
      <LogoutModal isOpen={isOpen} onRequestClose={onRequestClose} />

      <MyInfo>
        <p className="greet">
          <span className="greet_user">{decoded.user.user_id}</span> 회원님,
          안녕하세요!
        </p>
        <ModifyLogoutWrap className="modify_logout_wrap">
          <div className="myInfo_modify">회원정보 수정</div>
          <div className="myInfo_logout" onClick={handleLogoutBtn}>
            로그아웃
          </div>
        </ModifyLogoutWrap>
      </MyInfo>

      <ul className="my_info_wrap">
        <CouponMileageWrap>
          <Coupon className="info_li_coupon">
            쿠폰
            {coupons.map((coupon) => {
              console.log("쿠폰확인:", coupon);
              return (
                <span className="info_coupon_in">{coupon.coupon_name}</span>
              );
            })}
          </Coupon>
          <Mileage>
            마일리지{" "}
            <span className="info_mileage_in">{decoded.user.mileage}</span>
          </Mileage>
        </CouponMileageWrap>
        <li className="info_li">주문내역 조회</li>
        <li className="info_li">배송지 등록 / 변경</li>
        <li className="info_li">
          <StarRating />
        </li>
      </ul>
    </MyPageWrap>
  );
};

export default MyPage;
