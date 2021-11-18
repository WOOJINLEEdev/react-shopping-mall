import React, { useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import PropTypes from "prop-types";

Modal.setAppElement("#root");
const MyPageCouponModal = ({ isOpen2, onRequestClose2, myCoupon }) => {
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
      style={customModalStyle}
      shouldCloseOnOverlayClick={true}
    >
      <CouponTitle>
        사용 가능한 쿠폰{" "}
        {!myCoupon || myCoupon === undefined ? 0 : myCoupon.length}장
      </CouponTitle>
      <ul>
        {!myCoupon || myCoupon === undefined
          ? ""
          : myCoupon.map((coupon) => {
              return (
                <CouponItem key={coupon.id}>{coupon.coupon_name}</CouponItem>
              );
            })}
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

const customModalStyle = {
  overlay: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    overflow: "hidden",
    position: "fixed",
    width: "100%",
    height: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "80%",
    height: "60%",
    textAlign: "center",
    padding: "20px",
    boxShadow: "10px 10px 35px 20px rgb(0 0 0 / 36%)",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(245, 245, 245)",
  },
};

const CouponTitle = styled.p`
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
`;

const CouponItem = styled.li`
  width: 80%;
  height: 100px;
  line-height: 100px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 3px;
  font-size: 16px;
  box-shadow: 0 3px 15px 3px rgba(0, 0, 0, 0.1);

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
`;

const CouponCloseBtn = styled.button`
  width: 50%;
  height: 50px;
  margin: 0 auto;
  padding: 0;
  font-size: 15px;
  color: #333;
  background-color: #fff;
  border: 2px solid #d4d4d4;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
  }
`;
