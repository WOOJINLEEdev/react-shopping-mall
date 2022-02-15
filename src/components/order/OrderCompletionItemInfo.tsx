import { Link } from "react-router-dom";
import styled from "styled-components";

interface OrderCompletionItemInfoProps {
  items: ItemType[];
  firstItem: ItemType;
  remainder: ItemType[];
  remainderClass: string;
  handleOpenCloseBtn: () => void;
  handleInfoOpenBtn: () => void;
  itemInfoHeadClass: string;
  itemInfoClass: string;
  arrowImg: string;
  arrowImg1: string;
  closeText: string;
  sum: number;
  isPc: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

interface ItemType {
  image_src: string;
  price: string;
  product_id: number;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
}

const OrderCompletionItemInfo = ({
  items,
  firstItem,
  remainder,
  remainderClass,
  handleOpenCloseBtn,
  handleInfoOpenBtn,
  itemInfoHeadClass,
  itemInfoClass,
  arrowImg,
  arrowImg1,
  closeText,
  sum,
  isPc,
  isTablet,
  isMobile,
}: OrderCompletionItemInfoProps) => {
  return (
    <OrderItemInfoWrap>
      <div className="order_item_info">
        <div className="order_info_head_wrap orderItemInfo">
          <h2 className="order_info_header">주문상품 정보</h2>
          {isPc && (
            <div style={{ display: "flex" }}>
              <div className={itemInfoHeadClass}>
                {items[0].product_name}{" "}
                {items.length > 1 ? "외 " + (items.length - 1) + "건" : ""} (총
                수량: {sum}개)
              </div>
              <button
                type="button"
                className="order_delivery_info_btn"
                onClick={handleOpenCloseBtn}
              >
                <img
                  src={arrowImg}
                  alt="buttonArrow"
                  className="order_delivery_info_btn_img"
                />
              </button>
            </div>
          )}
          {isTablet && (
            <div className="info_head_quantity">
              <span className="total_quantity_text">
                총 수량 <em className="item_total_quantity">{sum}</em>개
              </span>
            </div>
          )}
          {isMobile && (
            <div className="info_head_quantity">
              <span className="total_quantity_text">
                총 수량 <em className="item_total_quantity">{sum}</em>개
              </span>
            </div>
          )}
        </div>

        {isPc && (
          <ul className={itemInfoClass}>
            {items.map((item) => (
              <li key={item.product_id} className="info_list_wrap">
                <Link
                  to={`/products/${item.product_id}`}
                  className="info_list_box"
                >
                  <img
                    className="info_list_img"
                    alt={`${item.product_name} 상품 페이지로 이동`}
                    src={item.image_src}
                  />
                </Link>

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
                      <span className="list_price_dollar"></span>
                      <span className="list_goods price">
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              <li key={firstItem.product_id} className="info_list_wrap">
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
                      <span className="list_price_dollar"></span>
                      <span className="list_goods price">
                        {firstItem.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </span>

                      <span className="list_price_quantity">
                        / 수량 {firstItem.quantity}개
                      </span>
                    </p>
                  </div>
                </div>

                <Link
                  to={`/products/${firstItem.product_id}`}
                  className="info_list_box"
                >
                  <img
                    className="info_list_img"
                    alt={firstItem.product_name}
                    src={firstItem.image_src}
                  />
                </Link>
              </li>
            }
            <div className={remainderClass}>
              {remainder.map((item) => (
                <li key={item.product_id} className="info_list_wrap">
                  <div className="list_info">
                    <div className="list_info_text infoHead">
                      <p className="list_goods name">{item.product_name}</p>
                    </div>

                    <div className="list_info_text">
                      <p className="list_goods option">{item.variant_name}</p>
                    </div>

                    <div className="list_info_text priceAndQuantity">
                      <p className="list_price_text">
                        <span className="list_price_dollar"></span>
                        <span className="list_goods price">
                          {item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </span>

                        <span className="list_price_quantity">
                          / 수량 {item.quantity}개
                        </span>
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/products/${item.product_id}`}
                    className="info_list_box"
                  >
                    <img
                      className="info_list_img"
                      alt={item.product_name}
                      src={item.image_src}
                    />
                  </Link>
                </li>
              ))}
            </div>
            {items.length > 1 ? (
              <button
                type="button"
                className="info_all_btn"
                onClick={handleInfoOpenBtn}
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
              <li key={firstItem.product_id} className="info_list_wrap">
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
                      <span className="list_price_dollar"></span>
                      <span className="list_goods price">
                        {firstItem.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </span>

                      <span className="list_price_quantity">
                        / 수량 {firstItem.quantity}개
                      </span>
                    </p>
                  </div>
                </div>

                <Link
                  to={`/products/${firstItem.product_id}`}
                  className="info_list_box"
                >
                  <img
                    className="info_list_img"
                    alt=""
                    src={firstItem.image_src}
                  />
                </Link>
              </li>
            }
            <div className={remainderClass}>
              {remainder.map((item) => (
                <li key={item.product_id} className="info_list_wrap">
                  <div className="list_info">
                    <div className="list_info_text infoHead">
                      <p className="list_goods name">{item.product_name}</p>
                    </div>

                    <div className="list_info_text">
                      <p className="list_goods option">{item.variant_name}</p>
                    </div>

                    <div className="list_info_text priceAndQuantity">
                      <p className="list_price_text">
                        <span className="list_price_dollar"></span>
                        <span className="list_goods price">
                          {item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </span>

                        <span className="list_price_quantity">
                          / 수량 {item.quantity}개
                        </span>
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/products/${item.product_id}`}
                    className="info_list_box"
                  >
                    <img
                      className="info_list_img"
                      alt=""
                      src={item.image_src}
                    />
                  </Link>
                </li>
              ))}
            </div>
            {items.length > 1 ? (
              <button
                type="button"
                className="info_all_btn"
                onClick={handleInfoOpenBtn}
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
`;
