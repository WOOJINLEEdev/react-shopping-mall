import { useState, useEffect } from "react";
import styled from "styled-components";
import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark";
import { ReactComponent as ShoppingBag } from "images/shopping-bag.svg";
import downArrow from "images/down-arrow.png";
import upArrow from "images/up-arrow-icon.png";
import OrderCompletionPayInfo from "components/order/OrderCompletionPayInfo";
import OrderCompletionItemInfo from "components/order/OrderCompletionItemInfo";
import OrderCompletionDeliveryInfo from "components/order/OrderCompletionDeliveryInfo";
import Loading from "components/common/Loading";
import { formatDate } from "utils/formatDate";
import { getOrderNumber } from "utils/order";
import { useDevice } from "hooks/useDevice";
import { getOrdersApi } from "api";

const OrderCompletion = ({ match }: any) => {
  const [orderData, setOrderData] = useState<any[]>([]);
  const [remainderClass, setRemainderClass] = useState("info_remainder");
  const [arrowImg, setArrowImg] = useState(upArrow);
  const [arrowImg1, setArrowImg1] = useState(downArrow);
  const [closeText, setCloseText] = useState("");
  const [itemInfoClass, setItemInfoClass] = useState("info_group");
  const [itemInfoHeadClass, setItemInfoHeadClass] = useState("hide");

  const { isPc, isTablet, isMobile } = useDevice();

  const checkoutNumber = Number(match.params.checkoutId);
  const date = new Date();

  useEffect(() => {
    async function getCompletedOrder() {
      try {
        const res = await getOrdersApi({ checkoutId: checkoutNumber });
        console.log(res);
        setOrderData(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getCompletedOrder();
  }, []);

  if (orderData.length === 0) {
    return <Loading />;
  }

  const items = orderData[0].line_items;
  const firstItem = items[0];
  const remainder = items.filter((item: any) => item !== firstItem);
  const itemQuantity = items.map((item: any) => item.quantity);
  const sum = itemQuantity.reduce((a: any, b: any) => a + b);

  const handleInfoOpenBtn = () => {
    if (remainderClass === "info_remainder") {
      setArrowImg1(upArrow);
      setCloseText("닫기");
      return setRemainderClass("open");
    }

    if (remainderClass === "open") {
      setArrowImg1(downArrow);
      setCloseText("");
      return setRemainderClass("info_remainder");
    }
  };

  const handleOpenCloseBtn = () => {
    if (arrowImg === upArrow) {
      setArrowImg(downArrow);
      setItemInfoHeadClass("info_head_total_item");
      return setItemInfoClass("hide");
    }

    if (arrowImg === downArrow) {
      setArrowImg(upArrow);
      setItemInfoHeadClass("hide");
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
              {formatDate(date).replaceAll("-", ".")} 주문하신 상품의 주문번호는{" "}
              {getOrderNumber(orderData[0].created_at, orderData[0].id)} 입니다.
            </Text>
          </HeadContentText>
        </HeadContent>
      </Head>

      <OrderCompletionItemInfo
        items={items}
        firstItem={firstItem}
        remainder={remainder}
        remainderClass={remainderClass}
        itemInfoHeadClass={itemInfoHeadClass}
        itemInfoClass={itemInfoClass}
        handleOpenCloseBtn={handleOpenCloseBtn}
        handleInfoOpenBtn={handleInfoOpenBtn}
        arrowImg={arrowImg}
        arrowImg1={arrowImg1}
        closeText={closeText}
        sum={sum}
        isPc={isPc}
        isTablet={isTablet}
        isMobile={isMobile}
      />
      <OrderCompletionDeliveryInfo orderData={orderData} />
      <OrderCompletionPayInfo orderData={orderData} />
    </Wrapper>
  );
};

export default OrderCompletion;

const Wrapper = styled.div`
  padding: 50px 30px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    padding: 20px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 30px;
  }
`;

const Head = styled.div`
  padding: 30px;
  text-align: center;
  border: 3px solid #333;
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
`;

const HeadContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 12px;
    margin: 10px 0;
  }
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
    line-height: 100px;
  }
`;

const HeadContentText = styled.div``;

const Text = styled.p`
  width: 280px;
  margin: 0 auto;
  line-height: 30px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 210px;
  }
`;
