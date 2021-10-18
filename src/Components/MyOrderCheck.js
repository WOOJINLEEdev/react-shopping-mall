import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import MyOrderCheckModal from "./MyOrderCheckModal";
import axios from "axios";

Modal.setAppElement("#root");

const MyOrderCheck = () => {
  const [isOpen3, setIsOpen3] = useState(false);
  const [myOrderList, setMyOrderList] = useState();
  const [selectItemId, setSelectItemId] = useState();

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const date = new Date();

  useEffect(() => {
    axios
      .get("http://localhost:8282/v1/orders", config)
      .then(function (response) {
        console.log("주문조회:", response.data);
        setMyOrderList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!myOrderList) {
    return <div>로딩 중.....</div>;
  }

  const reverseItem = myOrderList.map((item) => item).reverse();

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
      <MyOrderCheckModal
        isOpen3={isOpen3}
        onRequestClose3={onRequestClose3}
        myOrderList={reverseItem}
        orderItemId={selectItemId}
      />

      <ul>
        {reverseItem.map((item) => {
          return (
            <OrderListItem
              key={item.id}
              onClick={() => handleOrderListItem(item.id)}
            >
              <ListItemContent>
                {date.getFullYear()}.
                {date.getMonth() < 9
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1}
                .{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}{" "}
              </ListItemContent>
              <ListItemContent>
                주문번호: {date.getFullYear()}
                {date.getMonth() < 9
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1}
                {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
                -000
                {item.id}
              </ListItemContent>
              <ListItemContent>
                주문상품: {item.line_items[0].product_name} 외{" "}
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
