/* eslint-disable react/jsx-no-useless-fragment */
import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { formatPrice } from "utils/money";
import { getSizedImageUrl } from "utils/image";

import QuantityCounter from "components/common/QuantityCounter";
import { IAddedCartItem } from "components/cart/types";

const SOURCE_LIST = [
  { id: "0", media: "(max-width:849px)", size: "_150x200.jpg" },
  { id: "1", media: "(min-width:850px)", size: "_200x200.jpg" },
];

interface ICartListProps {
  items: IAddedCartItem[];
  handleCartItemCheck: (cartItemIndex: number) => void;
  handleItemRemoveBtnClick: (e: MouseEvent<HTMLInputElement>) => Promise<void>;
  handleQuantity: (itemId: number, quantity: number) => Promise<void>;
  handleListBuyBtnClick: (
    item: IAddedCartItem,
    quantity: number,
  ) => Promise<void>;
}

const CartList = ({
  items,
  handleCartItemCheck,
  handleItemRemoveBtnClick,
  handleQuantity,
  handleListBuyBtnClick,
}: ICartListProps) => {
  return (
    <ul className="item_group">
      {items.length < 1 ? (
        <CartEmpty>장바구니가 비었습니다.</CartEmpty>
      ) : (
        items.map((item: IAddedCartItem, index: number) => {
          return (
            <li className="item" key={item.id}>
              <div className="item_select">
                <>
                  <input
                    type="checkbox"
                    name="item_checkbox"
                    id={`itemCheckbox${item.product_id}`}
                    className="item_checkbox"
                    value={item.product_name}
                    checked={item.checked}
                    onChange={() => handleCartItemCheck(index)}
                  />
                  <label
                    htmlFor={`itemCheckbox${item.product_id}`}
                    className="visually_hidden"
                  >{`${item.product_name} 선택`}</label>
                </>
                <input
                  type="button"
                  value="삭제"
                  className="item_remove_btn"
                  key={item.id}
                  name={item.id.toString()}
                  onClick={handleItemRemoveBtnClick}
                />
              </div>

              <div className="info_wrap">
                <Link
                  to={`/products/${item.product_id}`}
                  className="info_img_box"
                  aria-label={`${item.product_name} 상품 페이지로 이동`}
                >
                  <img
                    className="cart_item_img"
                    src={item.product_image_src}
                    alt={`${item.product_name}_상품 이미지`}
                  />
                </Link>
                <div className="info_box">
                  <div className="info_text">
                    <p className="goods itemName">{item.product_name}</p>
                  </div>

                  <div className="info_text">
                    <p className="price_area">
                      <span className="price_zone">
                        {formatPrice(item.variant_price.toString())}
                      </span>
                      원
                    </p>
                  </div>

                  <div className="info_text">
                    <p className="goods option">
                      옵션 :
                      <span className="option_zone">{item.variant_name}</span>
                    </p>
                  </div>

                  <div className="info_text priceAndQuantity">
                    <QuantityCounter
                      flexEnd={false}
                      quantity={item.quantity}
                      productId={item.product_id}
                      onIncrement={() =>
                        handleQuantity(item.id, item.quantity + 1)
                      }
                      onDecrement={() =>
                        handleQuantity(item.id, item.quantity - 1)
                      }
                    />

                    <div>
                      <span className="item_price_qty">
                        {formatPrice(
                          (
                            Number(item.variant_price) * item.quantity
                          ).toString(),
                        )}
                        원
                      </span>
                    </div>
                    <button
                      type="button"
                      className="list_buy_btn"
                      onClick={() => handleListBuyBtnClick(item, item.quantity)}
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default CartList;

const CartEmpty = styled.li`
  min-height: 300px;
  line-height: 300px;
  border: 0;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: rgb(97, 95, 95);

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    min-height: 200px;
    line-height: 200px;
    font-size: 18px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    min-height: 250px;
    max-height: calc(100vh - 808px);
    line-height: 250px;
  }
`;
