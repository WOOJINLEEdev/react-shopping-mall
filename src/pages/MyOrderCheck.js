import React, { useState, useEffect, lazy, Suspense } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Loading from "components/common/Loading";
import { instance } from "utils/http-client";
import { useSWRInfinite } from "swr";
import { IoIosArrowDown } from "react-icons/io";

Modal.setAppElement("#root");

const MyOrderCheckModal = lazy(() =>
  import("components/mypage/MyOrderCheckModal")
);

const MyOrderCheck = () => {
  const [isOpen3, setIsOpen3] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const [selectItemId, setSelectItemId] = useState();
  const [pageOffset, setPageOffset] = useState(0);

  useEffect(() => {
    instance
      .get("/v1/orders?count=true")
      .then(function (response) {
        setTotalCount(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const PAGE_LIMIT = 5;
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    return `/v1/orders?limit=${PAGE_LIMIT}&offset=${pageIndex * PAGE_LIMIT}`;
  };

  const url = `/v1/orders?limit=${PAGE_LIMIT}&offset=${pageOffset}`;
  const fetcher = async (url) => {
    const res = await instance.get(url);
    return res.data;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (!totalCount) {
    return <Loading />;
  }

  if (error) return "에러 발생";
  if (!data) return <Loading />;

  const myOrderList = data.flat(Infinity);

  const handleOrderListItem = (itemId) => {
    setSelectItemId(itemId);
    setIsOpen3(true);
  };

  const onRequestClose3 = () => {
    setIsOpen3(false);
  };

  function handleClick() {
    console.log("더보기 클릭");
    setSize(size + 1);
  }

  return (
    <OrderCheckWrap>
      <h2 className="main_title">주문내역 조회</h2>
      <TotalOrderCount>
        - 총 주문 수 : <span>{totalCount}</span>건
      </TotalOrderCount>
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
        {myOrderList.map((item, index) => {
          return (
            <OrderListItem
              key={item.checkout_id}
              onClick={() => handleOrderListItem(item.checkout_id)}
            >
              <ListItemContent>
                {item.created_at.substring(0, 10).split("-").join(".")}
              </ListItemContent>
              <ListItemContent>
                주문번호: {item.created_at.substring(0, 10).split("-").join("")}
                -000
                {item.checkout_id}
              </ListItemContent>
              <ListItemContent>
                주문상품: {item.line_items[0].product_name}{" "}
                {item.line_items.length === 1 ? "" : "외"}{" "}
                {item.line_items.length === 1 ? "" : item.line_items.length - 1}
                {item.line_items.length === 1 ? "" : "건"}
              </ListItemContent>
              <ListItemContent className="list_item_price">
                결제금액:{" "}
                {item.total_price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </ListItemContent>
              <ListItemNumber>{index + 1}</ListItemNumber>
            </OrderListItem>
          );
        })}
      </ul>
      {totalCount > 5 && size * PAGE_LIMIT < totalCount ? (
        <ListMoreBtn onClick={handleClick}>
          더보기 <IoIosArrowDown />
        </ListMoreBtn>
      ) : (
        ""
      )}
    </OrderCheckWrap>
  );
};

export default MyOrderCheck;

const OrderCheckWrap = styled.div`
  width: 824px;
  min-height: calc(100vh - 271px);
  margin: 0 auto;
  padding: 50px 100px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: calc(100% - 40px);
    min-height: calc(100vh - 90px);
    padding: 30px 20px 60px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: calc(100% - 80px);
    padding: 40px;
  }
`;

const OrderListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 15px;
  margin-top: 20px;
  border: 2px solid #d4d4d4;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  cursor: pointer;

  & .list_item_price {
    padding-bottom: 0;
  }
`;

const ListItemContent = styled.p`
  padding-bottom: 20px;

  &:first-child {
    font-weight: bold;
  }
`;

const ListItemNumber = styled.div`
  position: absolute;
  top: 50%;
  right: 30px;
  color: green;
  font-weight: bold;
`;

const NotOrderData = styled.div`
  font-size: 18px;
  padding: 10px;
  margin-top: 30px;
  min-height: 500px;
`;

const ListMoreBtn = styled.button`
  width: 100%;
  height: 50px;
  color: #333;
  font-size: 15px;
  font-weight: bold;
  background-color: #fff;
  border: 2px solid #d4d4d4;
  border-radius: 3px;
  outline: none;
  box-shadow: 0 3px 15px 3px rgba(0, 0, 0, 0.1);
  margin: 30px 0 0;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      border: 2px solid #333;
    }
  }
`;

const TotalOrderCount = styled.p`
  padding: 20px 0 10px;
  font-size: 18px;

  & span {
    font-weight: bold;
    color: green;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 16px;
  }
`;
