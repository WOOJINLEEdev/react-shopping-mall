import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import Modal from "react-modal";
import styled from "styled-components";
import CommonModal from "./CommonModal";
import StarRating from "./StarRating";
import MyPageCouponModal from "./MyPageCouponModal";
import { useHistory } from "react-router";
import useMyCart from "../Hooks/useMyCart";

Modal.setAppElement("#root");

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [modalText, setModalText] = useState("정말 로그아웃 하시겠습니까?");
  const [btnText1, setBtnText1] = useState("예");
  const [btnText2, setBtnText2] = useState("아니오");

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [coupons, setCoupons] = useState(decoded.user.coupons);

  if (token) {
    console.log(decoded);
    console.log(decoded.user.coupons);
    console.log("쿠폰", coupons);
  }

  const history = useHistory();
  const { cart, loadingCart, cartError, mutateCart } = useMyCart();

  if (cartError) return <div>에러 발생...</div>;
  if (loadingCart) return <div>로딩 중...</div>;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("delivery");
    localStorage.removeItem("board");

    mutateCart(
      {
        items: [],
      },
      false
    );
    history.push("/");
  };

  const handleLogoutBtn = () => {
    console.log("로그아웃 버튼 클릭");
    setIsOpen(true);
  };

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const handleCouponModal = () => {
    setIsOpen2(true);
  };

  const onRequestClose2 = () => {
    setIsOpen2(false);
  };

  return (
    <MyPageWrap className="main_wrap">
      <h2 className="main_title">마이페이지</h2>
      <CommonModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        modalText={modalText}
        btnText1={btnText1}
        btnText2={btnText2}
        btnClick1={logout}
        btnClick2={onRequestClose}
      />
      <MyPageCouponModal
        isOpen2={isOpen2}
        onRequestClose2={onRequestClose2}
        coupons={coupons}
      />

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
          <Coupon className="info_li_coupon" onClick={handleCouponModal}>
            사용가능 쿠폰
            <span
              style={{
                display: "block",
                paddingTop: "15px",
                fontWeight: "initial",
                fontSize: "25px",
              }}
            >
              {coupons.length}
            </span>
          </Coupon>
          <Mileage>
            마일리지{" "}
            <span className="info_mileage_in">
              {decoded.user.mileage
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
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
  font-size: 16px;
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
    width: 40%;
    padding: 20px;
  }
`;

const Mileage = styled.li`
  width: 40%;
  padding: 30px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #d4d4d4;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);

  // :hover {
  //   border: 1px solid #efefef;
  //   box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 20%);
  //   transition: all 0.25s;
  //   transform: translateY(-2px);
  //   color: green;
  // }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 40%;
    padding: 20px;
  }
`;
