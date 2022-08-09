import { useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";

import { fixOverlay } from "utils/fix-overlay";

import { ICouponInfo } from "components/mypage/types";

Modal.setAppElement("#root");

interface IMyPageCouponModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  myCoupon?: ICouponInfo[];
}

const MyPageCouponModal = ({
  isOpen,
  onRequestClose,
  myCoupon,
}: IMyPageCouponModalProps) => {
  useEffect(() => {
    if (isOpen) {
      return fixOverlay();
    }
  }, [isOpen]);

  const numCoupon = !myCoupon ? 0 : myCoupon.length;

  const hasUsableCoupon = !myCoupon ? (
    <li>사용 가능한 쿠폰이 없습니다.</li>
  ) : (
    myCoupon.map((coupon: ICouponInfo) => {
      return <CouponItem key={coupon.id}>{coupon.coupon_name}</CouponItem>;
    })
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className="mypage_coupon_modal"
      overlayClassName="modal_overlay"
    >
      <CouponTitle>사용 가능한 쿠폰 {numCoupon}장</CouponTitle>
      <ul>{hasUsableCoupon}</ul>
      <CouponCloseBtn onClick={onRequestClose}>닫기</CouponCloseBtn>
    </Modal>
  );
};

export default MyPageCouponModal;

const CouponTitle = styled.p`
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #333;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 15px;
  }
`;

const CouponItem = styled.li`
  width: 80%;
  height: 100px;
  line-height: 100px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 3px;
  color: green;
  font-size: 16px;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.2);

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
`;

const CouponCloseBtn = styled.button`
  width: 100%;
  height: 50px;
  margin: 0 auto;
  padding: 0;
  font-size: 15px;
  color: #fff;
  background-color: #333;
  border: 2px solid #333;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
`;
