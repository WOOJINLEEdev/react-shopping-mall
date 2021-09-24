import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FcCheckmark } from "react-icons/fc";
import { ReactComponent as ShoppingBag } from "../images/shopping-bag.svg";
import axios from "axios";
import downArrow from "../images/down-arrow.png";
import upArrow from "../images/up-arrow-icon.png";
import OrderCompletionPayInfo from "./OrderCompletionPayInfo";
import OrderCompletionItemInfo from "./OrderCompletionItemInfo";
import OrderCompletionDeliveryInfo from "./OrderCompletionDeliveryInfo";
import { useMediaQuery } from "react-responsive";

const OrderCompletion = ({ match }) => {
  const [orderData, setOrderData] = useState([]);
  const [remainderClass, setRemainderClass] = useState("info_remainder");
  const [arrowImg, setArrowImg] = useState(downArrow);
  const [closeText, setCloseText] = useState("");
  const [itemInfoClass, setItemInfoClass] = useState("hide");

  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width:767px)",
  });

  const checkoutNumber = Number(match.params.checkoutId);
  const date = new Date();
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8282/v1/orders?checkout_id=${checkoutNumber}`,
        config
      )
      .then(function (response) {
        console.log(response);
        console.log("리스폰스 데이터:", response.data);
        setOrderData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (orderData.length === 0) {
    return <div>loading...</div>;
  }

  console.log("오더완료 데이터", orderData);
  const items = orderData[0].line_items;
  const firstItem = items[0];
  const remainder = items.filter((item) => item !== firstItem);
  const itemQuantity = items.map((item) => item.quantity);
  const sum = itemQuantity.reduce((a, b) => a + b);
  console.log("오더완료 아이템즈::", items);
  console.log("오더완료 퍼스트아이템::", firstItem);
  console.log("오더완료 리메인더::", remainder);
  console.log("오더완료 합계::", sum);

  const handleInfoOpenBtn = () => {
    if (remainderClass === "info_remainder") {
      setArrowImg(upArrow);
      setCloseText("닫기");
      return setRemainderClass("open");
    }

    if (remainderClass === "open") {
      setArrowImg(downArrow);
      setCloseText("");
      return setRemainderClass("info_remainder");
    }
  };

  const handleOpenCloseBtn = () => {
    if (arrowImg === upArrow) {
      setArrowImg(downArrow);
      return setItemInfoClass("hide");
    }

    if (arrowImg === downArrow) {
      setArrowImg(upArrow);
      return setItemInfoClass("info_group");
    }
  };

  return (
    <Wrapper>
      <Head>
        <CompletionHead>
          <ShoppingBag />

          <HeadTitle>
            <FcCheckmark />
            주문이 정상적으로 완료되었습니다.
          </HeadTitle>
        </CompletionHead>
        <HeadContent>
          <HeadContentText>
            <Text>
              {date.getFullYear()}.
              {date.getMonth() < 9
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1}
              .{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}{" "}
              주문하신 상품의 주문번호는 {date.getFullYear()}
              {date.getMonth() < 9
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1}
              {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}000
              {checkoutNumber} 입니다.
            </Text>
          </HeadContentText>
        </HeadContent>
      </Head>

      <OrderCompletionDeliveryInfo orderData={orderData} />
      <OrderCompletionPayInfo orderData={orderData} />
      <OrderCompletionItemInfo
        items={items}
        firstItem={firstItem}
        remainder={remainder}
        remainderClass={remainderClass}
        itemInfoClass={itemInfoClass}
        handleOpenCloseBtn={handleOpenCloseBtn}
        handleInfoOpenBtn={handleInfoOpenBtn}
        arrowImg={arrowImg}
        closeText={closeText}
        sum={sum}
        isPc={isPc}
        isTablet={isTablet}
        isMobile={isMobile}
      />
    </Wrapper>
  );
};

export default OrderCompletion;

const Wrapper = styled.div`
  padding: 50px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    padding: 20px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 30px;
  }
`;

const Head = styled.div`
  border: 3px solid #333;
  text-align: center;
  padding: 30px;
  border-radius: 5px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    border: none;

    padding: 20px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    border: none;

    padding: 20px;
  }
`;

const CompletionHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  & svg {
    width: 150px;
    height: 150px;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
    text-align: center;

    & svg {
      width: 100px;
      height: 100px;
      margin: 0 auto;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    flex-direction: column;
    text-align: center;

    & svg {
      width: 100px;
      height: 100px;
      margin: 0 auto;
    }
  }
  }
`;

const HeadContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const HeadTitle = styled.h2`
  display: inline-block;
  font-size: 25px;
  font-weight: bold;
  margin-left: 10px;
  line-height: 150px;

  & svg {
    width: 25px;
    height: 25px;
    margin: 0;
    margin-right: 2px;
    line-height: 50px;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    display: flex;
    justify-content: center;
    font-size: 15px;
    margin: 20px 0;
    line-height: 20px;

    & svg {
      width: 20px;
      height: 20px;
      margin: 0;
      margin-right: 2px;
      line-height: 20px;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

const HeadContentText = styled.div``;

const Text = styled.p`
  width: 210px;
  margin: 0 auto;
  line-height: 30px;
`;
