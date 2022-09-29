import React, { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";
import * as Sentry from "@sentry/react";
import { useResetRecoilState } from "recoil";

import useMyCart from "hooks/api/useMyCart";
import useHttpClient from "hooks/useHttpClient";
import { formatPrice } from "utils/money";
import { createLogoutApi } from "api";

import Loading from "components/common/Loading";
import { IMyData } from "components/mypage/types";
import { tokenState } from "App";
import { SentryError } from "utils/error";

Modal.setAppElement("#root");

const CommonModal = lazy(() => import("components/common/CommonModal"));
const MyPageCouponModal = lazy(
  () => import("components/mypage/MyPageCouponModal"),
);

interface IMyPageInfoProps {
  myData: IMyData;
}

const MyPageInfo = ({ myData }: IMyPageInfoProps) => {
  const navigate = useNavigate();
  const { mutateCart } = useMyCart();
  const instance = useHttpClient();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const removeToken = useResetRecoilState(tokenState);

  const modalText = "정말 로그아웃 하시겠습니까?";
  const yesBtnText = "예";
  const noBtnText = "아니오";

  const logout = () => {
    async function createLogout() {
      try {
        await createLogoutApi({ instance });
        removeToken();
      } catch (err) {
        Sentry.captureException(new SentryError(err as Error));
      }
    }

    createLogout();
    localStorage.clear();

    mutateCart(
      {
        items: [],
      },
      false,
    );

    navigate("/");
  };

  const handleLogoutBtnClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleModifyBtnClick = () => {
    alert("현재 서비스 준비 중입니다.");
  };

  const onRequestCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleCouponModal = () => {
    setIsCouponModalOpen(true);
  };

  const onRequestCloseCouponModal = () => {
    setIsCouponModalOpen(false);
  };

  function getMileage(value: number) {
    return value === 0 || value === undefined
      ? 0
      : formatPrice(value.toString());
  }

  function getUserName(data: IMyData) {
    return `${data.name} (${
      data.social_user_id === 0 ? data.user_id : data.email
    })`;
  }

  return (
    <MyInfo>
      <Suspense fallback={<Loading />}>
        <CommonModal
          isOpen={isLogoutModalOpen}
          onRequestClose={onRequestCloseLogoutModal}
          modalText={modalText}
          yesBtnText={yesBtnText}
          noBtnText={noBtnText}
          yesBtnClick={logout}
          noBtnClick={onRequestCloseLogoutModal}
        />
        <MyPageCouponModal
          isOpen={isCouponModalOpen}
          onRequestClose={onRequestCloseCouponModal}
          myCoupon={myData.coupons}
        />
      </Suspense>

      <Greet>
        <span className="greet_user">{getUserName(myData)}</span> 님,{" "}
        <p style={{ paddingTop: "10px" }}>안녕하세요!</p>
      </Greet>
      <ModifyLogoutWrap className="modify_logout_wrap">
        <Btn type="button" onClick={handleModifyBtnClick}>
          회원정보 수정
        </Btn>
        <Btn type="button" onClick={handleLogoutBtnClick}>
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
          <CouponText>{!myData.coupons ? 0 : myData.coupons.length}</CouponText>
        </Coupon>
        <Mileage tabIndex={0}>
          <MileageTitle>마일리지</MileageTitle>{" "}
          <MileageText>{getMileage(myData.mileage)}</MileageText>
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
