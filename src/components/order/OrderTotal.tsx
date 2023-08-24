import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import useDevice from "hooks/useDevice";
import { formatPrice } from "utils/money";

import OrderTotalDetail from "components/order/OrderTotalDetail";

import downArrow from "assets/images/down-arrow.png";
import upArrow from "assets/images/up-arrow-icon.png";

import { IOrderCheckoutData, IModifiedLineItem } from "components/order/types";

interface IOrderTotalProps {
  checkoutData: IOrderCheckoutData;
  checkoutNumber: number;
}

const OrderTotal = ({ checkoutData, checkoutNumber }: IOrderTotalProps) => {
  const [remainderClassName, setRemainderClassName] =
    useState("info_remainder");
  const [arrowImg, setArrowImg] = useState(downArrow);
  const [closeText, setCloseText] = useState("");

  const { isPc, isTablet, isMobile } = useDevice();

  const items = useMemo(
    () => checkoutData.line_items,
    [checkoutData.line_items],
  );

  const totalPrice = items
    .map(
      (item: IModifiedLineItem) => Number(item.variant_price) * item.quantity,
    )
    .reduce((prevValue: number, curValue: number) => prevValue + curValue, 0);

  const deliveryCharge: string = localStorage.getItem("delivery")!;
  const firstItem = items[0];
  const remainder = items.filter((item) => item !== firstItem);
  const itemQuantity = items.map((item) => item.quantity);
  const sum = itemQuantity.reduce((prev, cur) => prev + cur, 0);

  const handleInfoOpenBtnClick = () => {
    if (remainderClassName === "info_remainder") {
      setArrowImg(upArrow);
      setCloseText("닫기");
      return setRemainderClassName("open");
    }

    if (remainderClassName === "open") {
      setArrowImg(downArrow);
      setCloseText("");
      return setRemainderClassName("info_remainder");
    }
  };

  return (
    <section className="order_total_info">
      {isPc && (
        <div className="order_item_info">
          <h2 className="info_header">
            주문상품 정보 / 총 <span className="total">{items.length}</span>개
          </h2>
          <ul className="info_group">
            {items.map((item) => (
              <li key={item.variant_id} className="info_list_wrap">
                <Link
                  to={`/products/${item.product_id}`}
                  className="info_list_box"
                  aria-label={`${item.product_name} 상품 페이지로 이동`}
                >
                  <img
                    className="info_list_img"
                    alt={`${item.product_name}_상품 이미지`}
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
                      <span className="list_price_dollar" />
                      <span className="list_goods price">
                        {formatPrice(item.variant_price.toString())}
                      </span>
                      원
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isTablet && (
        <div className="order_item_info">
          <div className="total_info_head_wrap">
            <h2 className="info_header">주문상품 정보</h2>
            <div className="info_head_quantity">
              <span className="total_quantity_text">
                총 수량 <em className="item_total_quantity">{sum}</em>개
              </span>
            </div>
          </div>
          <ul className="info_group">
            {
              <li key={firstItem.variant_id} className="info_list_wrap">
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
                        {formatPrice(firstItem.variant_price.toString())}원
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
                  aria-label={`${firstItem.product_name} 상품 페이지로 이동`}
                >
                  <img
                    className="info_list_img"
                    alt={`${firstItem.product_name}_상품 이미지`}
                    src={`${firstItem.image_src.slice(0, -4)}_150x200.jpg`}
                  />
                </Link>
              </li>
            }
            <div className={remainderClassName}>
              {remainder.map((item) => (
                <li key={item.variant_id} className="info_list_wrap">
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
                          {formatPrice(item.variant_price.toString())}원
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
                    aria-label={`${item.product_name} 상품 페이지로 이동`}
                  >
                    <img
                      className="info_list_img"
                      alt={`${item.product_name}_상품 이미지`}
                      src={`${item.image_src.slice(0, -4)}_150x200.jpg`}
                    />
                  </Link>
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
                  src={arrowImg}
                  alt="buttonArrow"
                  className="info_all_btn_arrow"
                />
              </button>
            ) : (
              ""
            )}
          </ul>
        </div>
      )}

      {isMobile && (
        <div className="order_item_info">
          <div className="total_info_head_wrap">
            <h2 className="info_header">주문상품 정보</h2>
            <div className="info_head_quantity">
              <span className="total_quantity_text">
                총 수량 <em className="item_total_quantity">{sum}</em>개
              </span>
            </div>
          </div>

          <ul className="info_group">
            {
              <li key={firstItem.variant_id} className="info_list_wrap">
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
                        {formatPrice(firstItem.variant_price.toString())}원
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
                  aria-label={`${firstItem.product_name} 상품 페이지로 이동`}
                >
                  <img
                    className="info_list_img"
                    alt={`${firstItem.product_name}_상품 이미지`}
                    src={`${firstItem.image_src.slice(0, -4)}_150x200.jpg`}
                  />
                </Link>
              </li>
            }
            <div className={remainderClassName}>
              {remainder.map((item) => (
                <li key={item.variant_id} className="info_list_wrap">
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
                          {formatPrice(item.variant_price.toString())}원
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
                    aria-label={`${item.product_name} 상품 페이지로 이동`}
                  >
                    <img
                      className="info_list_img"
                      alt={`${item.product_name}_상품 이미지`}
                      src={`${item.image_src.slice(0, -4)}_150x200.jpg`}
                    />
                  </Link>
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
                  src={arrowImg}
                  alt="buttonArrow"
                  className="info_all_btn_arrow"
                />
              </button>
            ) : (
              ""
            )}
          </ul>
        </div>
      )}

      {isPc && (
        <OrderTotalDetail
          totalPrice={totalPrice}
          deliveryCharge={deliveryCharge}
          checkoutData={checkoutData}
          checkoutNumber={checkoutNumber}
        />
      )}
    </section>
  );
};

export default OrderTotal;
