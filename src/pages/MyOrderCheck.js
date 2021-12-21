import React, { useState, useEffect, lazy, Suspense } from "react";
import Modal from "react-modal";
import styled from "styled-components";
// import MyOrderCheckModal from "components/mypage/MyOrderCheckModal";
import Loading from "components/common/Loading";
import { instance } from "utils/http-client";

Modal.setAppElement("#root");

const MyOrderCheckModal = lazy(() =>
  import("components/mypage/MyOrderCheckModal")
);

const MyOrderCheck = () => {
  const [isOpen3, setIsOpen3] = useState(false);
  const [myOrderList, setMyOrderList] = useState();
  const [selectItemId, setSelectItemId] = useState();

  useEffect(() => {
    instance
      .get("/v1/orders")
      .then(function (response) {
        console.log("주문조회:", response.data);
        setMyOrderList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!myOrderList) {
    return <Loading />;
  }

  const handleOrderListItem = (itemId) => {
    setSelectItemId(itemId);
    setIsOpen3(true);
  };

  const onRequestClose3 = () => {
    setIsOpen3(false);
  };

  return (
    <OrderCheckWrap>
      <h2 className="main_title">주문내역 조회</h2>
      <Suspense fallback={<Loading />}>
        <MyOrderCheckModal
          isOpen3={isOpen3}
          onRequestClose3={onRequestClose3}
          myOrderList={myOrderList}
          orderItemId={selectItemId}
        />
      </Suspense>

      {myOrderList.length < 1 && (
        <NotOrderData>주문내역이 없습니다.</NotOrderData>
      )}
      <ul>
        {myOrderList.map((item) => {
          return (
            <OrderListItem
              key={item.checkout_id}
              onClick={() => handleOrderListItem(item.checkout_id)}
            >
              <ListItemContent>
                {item.created_at.substring(0, 4)}.
                {item.created_at.substring(5, 7)}.
                {item.created_at.substring(8, 10)}
              </ListItemContent>
              <ListItemContent>
                주문번호: {item.created_at.substring(0, 4)}
                {item.created_at.substring(5, 7)}
                {item.created_at.substring(8, 10)}
                -000
                {item.checkout_id}
              </ListItemContent>
              <ListItemContent>
                주문상품: {item.line_items[0].product_name}{" "}
                {item.line_items.length === 1 ? "" : "외"}{" "}
                {item.line_items.length === 1 ? "" : item.line_items.length - 1}
                {item.line_items.length === 1 ? "" : "건"}
              </ListItemContent>
              <ListItemContent>
                결제금액:{" "}
                {item.total_price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </ListItemContent>
            </OrderListItem>
          );
        })}
      </ul>
    </OrderCheckWrap>
  );
};

export default MyOrderCheck;

const OrderCheckWrap = styled.div`
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

const OrderListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 15px;
  margin-top: 30px;
  border: 2px solid #d4d4d4;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  cursor: pointer;
`;

const ListItemContent = styled.p`
  padding-bottom: 20px;

  &: first-child {
    font-weight: bold;
  }

  &: last-child {
    padding-bottom: 0;
  }
`;

const NotOrderData = styled.div`
  font-size: 18px;
  padding: 10px;
  margin-top: 30px;
  min-height: 500px;
`;
