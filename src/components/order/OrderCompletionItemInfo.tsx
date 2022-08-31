import styled from "styled-components";

import useDevice from "hooks/useDevice";
import { formatPrice } from "utils/money";

import OrderItemLink from "components/order/OrderItemLink";
import OrderItemInfoHeadQty from "components/order/OrderItemInfoHeadQty";
import { ILineItem } from "components/order/types";

interface IOrderCompletionItemInfoProps {
  items: ILineItem[];
  firstItem: ILineItem;
  remainder: ILineItem[];
  remainderClass: string;
  handleOpenCloseBtnClick: () => void;
  handleInfoOpenBtnClick: () => void;
  itemInfoHeadClass: string;
  itemInfoClass: string;
  arrowImg: string;
  arrowImg1: string;
  closeText: string;
  sum: number;
}

const OrderCompletionItemInfo = ({
  items,
  firstItem,
  remainder,
  remainderClass,
  handleOpenCloseBtnClick,
  handleInfoOpenBtnClick,
  itemInfoHeadClass,
  itemInfoClass,
  arrowImg,
  arrowImg1,
  closeText,
  sum,
}: IOrderCompletionItemInfoProps) => {
  const { isPc, isTablet, isMobile } = useDevice();

  function getOrderItemSummary(itemName: string, qty: number, total: number) {
    return `${itemName} ${qty > 1 ? `외 ${qty - 1}건` : ""} (총
      수량: ${total}개)`;
  }

  return (
    <OrderItemInfoWrap>
      <div className="order_item_info">
        <div className="order_info_head_wrap orderItemInfo">
          <h2 className="order_info_header">주문상품 정보</h2>
          {isPc && (
            <div className="order_item_info_head">
              <div className={itemInfoHeadClass}>
                {getOrderItemSummary(items[0].product_name, items.length, sum)}
              </div>
              <button
                type="button"
                className="order_delivery_info_btn"
                onClick={handleOpenCloseBtnClick}
              >
                <img
                  src={arrowImg}
                  alt="buttonArrow"
                  className="order_delivery_info_btn_img"
                />
              </button>
            </div>
          )}
          {(isTablet || isMobile) && <OrderItemInfoHeadQty sum={sum} />}
        </div>

        {isPc && (
          <ul className={itemInfoClass}>
            {items.map((item) => (
              <li
                key={`item_info_${item.product_id}`}
                className="info_list_wrap"
              >
                <OrderItemLink item={item} />

                <div className="list_info">
                  <div className="list_info_text infoHead">
                    <label
                      className="list_info_name"
                      htmlFor={`itemName${item.product_id}`}
                    >
                      제품명
                    </label>
                    <p
                      className="list_goods name"
                      id={`itemName${item.product_id}`}
                    >
                      {item.product_name}
                    </p>
                  </div>

                  <div className="list_info_text">
                    <label
                      className="list_info_name opt"
                      htmlFor={`itemOption${item.product_id}`}
                    >
                      옵션 :{" "}
                    </label>
                    <p
                      className="list_goods option"
                      id={`itemOption${item.product_id}`}
                    >
                      {item.variant_name}
                    </p>
                  </div>

                  <div className="list_info_text priceAndQuantity">
                    <label
                      className="list_info_name pAndq"
                      htmlFor={`priceAndQuantity${item.product_id}`}
                    >
                      가격 / 수량
                      <span
                        className="list_price_quantity"
                        id={`priceAndQuantity${item.product_id}`}
                      >
                        {" "}
                        {item.quantity}
                      </span>
                      개
                    </label>
                    <p className="list_price_text">
                      <span className="list_price_dollar" />
                      <span className="list_goods price">
                        {formatPrice(item.price.toString())}
                      </span>
                      원
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {isTablet && (
          <ul className="info_group">
            {
              <li
                key={`first_item_info_${firstItem.product_id}`}
                className="info_list_wrap"
              >
                <div className="list_info">
                  <div className="list_info_text infoHead">
                    <p className="list_goods name">{firstItem.product_name}</p>
                  </div>

                  <div className="list_info_text">
                    <p className="list_goods option">
                      {firstItem.variant_name}
                    </p>
                  </div>

                  <div className="list_info_text priceAndQuantity">
                    <p className="list_price_text">
                      <span className="list_price_dollar" />
                      <span className="list_goods price">
                        {formatPrice(firstItem.price.toString())}원
                      </span>

                      <span className="list_price_quantity">
                        / 수량 {firstItem.quantity}개
                      </span>
                    </p>
                  </div>
                </div>

                <OrderItemLink item={firstItem} />
              </li>
            }
            <div className={remainderClass}>
              {remainder.map((item) => (
                <li
                  key={`remainder_info_${item.product_id}`}
                  className="info_list_wrap"
                >
                  <div className="list_info">
                    <div className="list_info_text infoHead">
                      <p className="list_goods name">{item.product_name}</p>
                    </div>

                    <div className="list_info_text">
                      <p className="list_goods option">{item.variant_name}</p>
                    </div>

                    <div className="list_info_text priceAndQuantity">
                      <p className="list_price_text">
                        <span className="list_price_dollar" />
                        <span className="list_goods price">
                          {formatPrice(item.price.toString())}원
                        </span>

                        <span className="list_price_quantity">
                          / 수량 {item.quantity}개
                        </span>
                      </p>
                    </div>
                  </div>

                  <OrderItemLink item={item} />
                </li>
              ))}
            </div>
            {items.length > 1 ? (
              <button
                type="button"
                className="info_all_btn"
                onClick={handleInfoOpenBtnClick}
              >
                <span className="info_all_btn_text">
                  총{" "}
                  <strong className="order_item_length">
                    {items.length}건{" "}
                  </strong>{" "}
                  전체보기 {closeText}
                </span>
                <img
                  src={arrowImg1}
                  alt="button_arrow_image"
                  className="info_all_btn_arrow"
                />
              </button>
            ) : (
              ""
            )}
          </ul>
        )}
        {isMobile && (
          <ul className="info_group">
            {
              <li
                key={`first_item_info_${firstItem.product_id}`}
                className="info_list_wrap"
              >
                <div className="list_info">
                  <div className="list_info_text infoHead">
                    <p className="list_goods name">{firstItem.product_name}</p>
                  </div>

                  <div className="list_info_text">
                    <p className="list_goods option">
                      {firstItem.variant_name}
                    </p>
                  </div>

                  <div className="list_info_text priceAndQuantity">
                    <p className="list_price_text">
                      <span className="list_price_dollar" />
                      <span className="list_goods price">
                        {formatPrice(firstItem.price.toString())}원
                      </span>

                      <span className="list_price_quantity">
                        / 수량 {firstItem.quantity}개
                      </span>
                    </p>
                  </div>
                </div>

                <OrderItemLink item={firstItem} />
              </li>
            }
            <div className={remainderClass}>
              {remainder.map((item) => (
                <li
                  key={`remainder_info_${item.product_id}`}
                  className="info_list_wrap"
                >
                  <div className="list_info">
                    <div className="list_info_text infoHead">
                      <p className="list_goods name">{item.product_name}</p>
                    </div>

                    <div className="list_info_text">
                      <p className="list_goods option">{item.variant_name}</p>
                    </div>

                    <div className="list_info_text priceAndQuantity">
                      <p className="list_price_text">
                        <span className="list_price_dollar" />
                        <span className="list_goods price">
                          {formatPrice(item.price.toString())}원
                        </span>

                        <span className="list_price_quantity">
                          / 수량 {item.quantity}개
                        </span>
                      </p>
                    </div>
                  </div>

                  <OrderItemLink item={item} />
                </li>
              ))}
            </div>
            {items.length > 1 ? (
              <button
                type="button"
                className="info_all_btn"
                onClick={handleInfoOpenBtnClick}
              >
                <span className="info_all_btn_text">
                  총{" "}
                  <strong className="order_item_length">
                    {items.length}건{" "}
                  </strong>{" "}
                  전체보기 {closeText}
                </span>
                <img
                  src={arrowImg1}
                  alt="buttonArrow"
                  className="info_all_btn_arrow"
                />
              </button>
            ) : (
              ""
            )}
          </ul>
        )}
      </div>
    </OrderItemInfoWrap>
  );
};

export default OrderCompletionItemInfo;

const OrderItemInfoWrap = styled.div`
  border-bottom: 3px solid #333;

  .order_item_info_head {
    display: flex;
  }
`;
