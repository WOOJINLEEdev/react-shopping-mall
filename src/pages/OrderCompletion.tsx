import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark";

import { formatDate } from "utils/date";
import { getOrderNumber } from "utils/order";
import { getOrdersApi } from "api";

import { ReactComponent as ShoppingBag } from "assets/images/shopping-bag.svg";
import downArrow from "assets/images/down-arrow.png";
import upArrow from "assets/images/up-arrow-icon.png";

import OrderCompletionPayInfo from "components/order/OrderCompletionPayInfo";
import OrderCompletionItemInfo from "components/order/OrderCompletionItemInfo";
import OrderCompletionDeliveryInfo from "components/order/OrderCompletionDeliveryInfo";
import Loading from "components/common/Loading";

interface IOrderData {
  created_at: string;
  line_items: IItem[];
  id: number;
  shipping_address: IShippingAddress;
  payment_method: string;
  shipping_price: string;
  product_price: string;
  total_discount: string | number;
  total_price: string;
  used_coupon?: ICoupon;
  used_point?: number;
}

interface IItem {
  image_src: string;
  price: string;
  product_id: number;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
}

interface IShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

interface ICoupon {
  applied_amount: string;
  id: number;
  name: string;
  type: string;
  user_coupon_id: number;
}

const OrderCompletion = () => {
  const matchParams = useParams();

  const [orderData, setOrderData] = useState<IOrderData[]>([]);
  const [remainderClass, setRemainderClass] =
    useState<string>("info_remainder");
  const [arrowImg, setArrowImg] = useState<string>(upArrow);
  const [arrowImg1, setArrowImg1] = useState<string>(downArrow);
  const [closeText, setCloseText] = useState<string>("");
  const [itemInfoClass, setItemInfoClass] = useState<string>("info_group");
  const [itemInfoHeadClass, setItemInfoHeadClass] = useState<string>("hide");

  const checkoutNumber = Number(matchParams.checkoutId);
  const date = new Date();

  useEffect(() => {
    async function getCompletedOrder() {
      try {
        const res = await getOrdersApi({ checkoutId: checkoutNumber });
        setOrderData(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getCompletedOrder();
  }, [checkoutNumber]);

  if (orderData.length === 0) {
    return <Loading />;
  }

  const items: IItem[] = orderData[0].line_items;
  const firstItem = items[0];
  const remainder = items.filter((item: IItem) => item !== firstItem);
  const itemQuantity = items.map((item: IItem) => item.quantity);
  const sum = itemQuantity.reduce((a: number, b: number) => a + b);

  const handleInfoOpenBtnClick = () => {
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

  const handleOpenCloseBtnClick = () => {
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
        handleOpenCloseBtnClick={handleOpenCloseBtnClick}
        handleInfoOpenBtnClick={handleInfoOpenBtnClick}
        arrowImg={arrowImg}
        arrowImg1={arrowImg1}
        closeText={closeText}
        sum={sum}
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
