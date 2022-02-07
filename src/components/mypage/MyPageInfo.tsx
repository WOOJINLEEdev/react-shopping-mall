import React, { useState, lazy, Suspense, useCallback } from "react";
import { useHistory } from "react-router";
import Modal from "react-modal";
import styled from "styled-components";
import Loading from "components/common/Loading";
import useMyCart from "hooks/useMyCart";
import useTokenStatus from "hooks/useTokenStatus";
import { createLogoutApi } from "api";

Modal.setAppElement("#root");

const CommonModal = lazy(() => import("components/common/CommonModal"));
const MyPageCouponModal = lazy(
  () => import("components/mypage/MyPageCouponModal")
);

const MyPageInfo = ({ myData }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [modalText, setModalText] = useState("정말 로그아웃 하시겠습니까?");
  const [btnText1, setBtnText1] = useState("예");
  const [btnText2, setBtnText2] = useState("아니오");

  const history = useHistory();

  const logout = useCallback(() => {
    async function createLogout() {
      try {
        const res = await createLogoutApi();
        console.log("logout res:", res);
        removeToken();
      } catch (err) {
        console.log("logout err:", err);
      }
    }

    createLogout();
    localStorage.clear();

    mutateCart(
      {
        items: [],
      },
      false
    );

    history.push("/");
  }, []);

  const handleLogoutBtn = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleModifyBtn = useCallback(() => {
    alert("현재 서비스 준비 중입니다.");
  }, []);

  const onRequestClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleCouponModal = useCallback(() => {
    setIsOpen2(true);
  }, []);

  const onRequestClose2 = useCallback(() => {
    setIsOpen2(false);
  }, []);

  const { cart, loadingCart, cartError, mutateCart } = useMyCart();
  const { removeToken } = useTokenStatus();

  if (loadingCart) return <Loading />;
  if (cartError) return <div>에러 발생...</div>;

  return (
    <MyInfo>
      <Suspense fallback={<Loading />}>
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
          myCoupon={myData.coupons}
        />
      </Suspense>

      <Greet>
        <span className="greet_user">
          {myData.name} (
          {myData.social_user_id === 0 ? myData.user_id : myData.email}){" "}
        </span>{" "}
        님, <p style={{ paddingTop: "10px" }}>안녕하세요!</p>
      </Greet>
      <ModifyLogoutWrap className="modify_logout_wrap">
        <Btn type="button" onClick={handleModifyBtn}>
          회원정보 수정
        </Btn>
        <Btn type="button" onClick={handleLogoutBtn}>
          로그아웃
        </Btn>
      </ModifyLogoutWrap>

      <CouponMileageWrap>
        <Coupon
          onClick={handleCouponModal}
          onKeyPress={handleCouponModal}
          tabIndex={0}
        >
          <CouponTitle>쿠폰</CouponTitle>
          <CouponText>
            {myData.coupons === 0 || myData.coupons === undefined
              ? 0
              : myData.coupons.length}
          </CouponText>
        </Coupon>
        <Mileage tabIndex={0}>
          <MileageTitle>마일리지</MileageTitle>{" "}
          <MileageText>
            {myData.mileage === 0 || myData.mileage === undefined
              ? 0
              : myData.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </MileageText>
        </Mileage>
      </CouponMileageWrap>
    </MyInfo>
  );
};

export default React.memo(MyPageInfo);

const MyInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 20px);
  height: 50%;
  line-height: 100px;
  padding: 10px;
  margin: 0;
  background-color: #fff;
  color: #686464;
  border-radius: 5px;
  border: 2px solid #d4d4d4;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: calc(100% - 64px);
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    padding: 0 30px;
  }
`;

const Greet = styled.strong`
  font-size: 18px;
  font-weight: bold;
  line-height: 20px;
  margin: 20px 0;
  text-align: center;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
`;

const ModifyLogoutWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 450px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    justify-content: center;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    justify-content: center;
  }
`;

const Btn = styled.button`
  display: inline-block;
  font-family: "RobotoCondensed Regular", "Spoqa Han Sans 400", sans-serif;
  font-size: 15px;
  width: 150px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  margin: 0;
  background-color: #fff;
  color: #333;
  border: 2px solid #d4d4d4;
  border-radius: 3px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      border: 2px solid #333;
      font-weight: bold;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 12px;
    height: 60px;
    line-height: 60px;
  }
`;

const CouponMileageWrap = styled.ul`
  display: flex;
  justify-content: center;
  width: 450px;
  margin: 20px 0;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    justify-content: center;
  }
`;

const Coupon = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  width: calc(150px - 24px);
  height: 80px;
  padding: 10px;
  background-color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #d4d4d4;
  border-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  margin: 0;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      border: 2px solid green;
      color: green;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    padding: 20px 10px;
    height: 60px;
  }
`;

const CouponTitle = styled.h3`
  line-height: 16px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
`;

const CouponText = styled.span`
  line-height: 16px;
  color: green;
`;

const Mileage = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  width: calc(150px - 22px);
  height: 80px;
  padding: 10px;
  background-color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #d4d4d4;
  border-left: 0;
  border-radius: 3px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    padding: 20px 10px;
    height: 60px;
  }
`;

const MileageTitle = styled.h3`
  line-height: 16px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
`;

const MileageText = styled.span`
  line-height: 16px;
  color: green;
`;
