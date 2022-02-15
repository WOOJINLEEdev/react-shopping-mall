import { useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

interface MyPageCouponModalProps {
  isOpen2: boolean;
  onRequestClose2: () => void;
  myCoupon?: CouponInfo[];
}

interface CouponInfo {
  id: string | number;
  coupon_name: string;
}

const MyPageCouponModal = ({
  isOpen2,
  onRequestClose2,
  myCoupon,
}: MyPageCouponModalProps) => {
  useEffect(() => {
    if (isOpen2) {
      document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = `position: ""; top: "";`;
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, [isOpen2]);

  return (
    <Modal
      isOpen={isOpen2}
      onRequestClose={onRequestClose2}
      shouldCloseOnOverlayClick={true}
      className="mypage_coupon_modal"
      overlayClassName="modal_overlay"
    >
      <CouponTitle>
        사용 가능한 쿠폰{" "}
        {!myCoupon || myCoupon === undefined ? 0 : myCoupon.length}장
      </CouponTitle>
      <ul>
        {!myCoupon || myCoupon === undefined ? (
          <div>사용 가능한 쿠폰이 없습니다.</div>
        ) : (
          myCoupon.map((coupon: CouponInfo) => {
            return (
              <CouponItem key={coupon.id}>{coupon.coupon_name}</CouponItem>
            );
          })
        )}
      </ul>
      <CouponCloseBtn onClick={onRequestClose2}>닫기</CouponCloseBtn>
    </Modal>
  );
};

export default MyPageCouponModal;

MyPageCouponModal.propTypes = {
  isOpen2: PropTypes.bool,
  onRequestClose2: PropTypes.func,
  myCoupon: PropTypes.array,
};

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
