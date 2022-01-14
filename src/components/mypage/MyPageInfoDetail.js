import React, { useState, lazy, Suspense, useCallback } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";
import StarRating from "components/mypage/StarRating";
import Loading from "components/common/Loading";
import { CgChevronRight } from "@react-icons/all-files/cg/CgChevronRight";

Modal.setAppElement("#root");

const MyPageDeliveryModal = lazy(() =>
  import("components/mypage/MyPageDeliveryModal")
);

const MyPageInfoDetail = ({ myData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeliveryAddress = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onRequestClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <MyInfoDetail>
      <Suspense fallback={<Loading />}>
        <MyPageDeliveryModal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          myDeliveryAddress={myData.shipping_address}
        />
      </Suspense>

      <MyInfoDetailList>
        <Link
          to="/myOrderCheck"
          style={{
            textDecoration: "none",
            color: "black",
          }}
          tabIndex="0"
          className="order_check_link"
          aria-labelledby="myOrderCheck"
        >
          <h3 id="myOrderCheck" className="my_order_check">
            주문내역 조회
          </h3>
        </Link>
        <CgChevronRight className="arrow_right" />
      </MyInfoDetailList>
      <MyInfoDetailList
        onClick={handleDeliveryAddress}
        onKeyPress={handleDeliveryAddress}
        tabIndex="0"
      >
        <h3>배송지 등록 / 변경</h3>
        <CgChevronRight />
      </MyInfoDetailList>
      <MyInfoDetailList tabIndex="0">
        <StarRating myRating={myData.rating} />
      </MyInfoDetailList>
    </MyInfoDetail>
  );
};

export default MyPageInfoDetail;

const MyInfoDetail = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  padding-left: 10px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    padding: 0;
    margin-top: 20px;
  }
`;

const MyInfoDetailList = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid #d4d4d4;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  cursor: pointer;

  &:first-child {
    padding: 0;
  }

  & .order_check_link {
    width: 100%;
  }

  & .arrow_right {
    position: absolute;
    top: 30px;
    right: 30px;
  }

  @media (hover: hover) {
    &:hover {
      border: 2px solid green;
      color: green;
    }

    & h3:hover {
      color: green;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    margin-top: 10px;
    font-size: 13px;
  }
`;
