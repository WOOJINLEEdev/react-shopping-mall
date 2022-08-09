import { formatPrice } from "utils/money";

import { IAddedCartItem } from "components/cart/types";

interface ICartDetailProps {
  items: IAddedCartItem[];
  totalPrice: number;
  finalPrice: number;
  deliveryCharge: string;
}

const CartDetail = ({
  items,
  totalPrice,
  finalPrice,
  deliveryCharge,
}: ICartDetailProps) => {
  return (
    <div className="detail_wrap cart_detail">
      <div className="detail_box">
        <div className="label_box">
          <label htmlFor="totalQty">주문 상품 수</label>
        </div>
        <p className="price_unit">
          <span className="total_qty" id="totalQty">
            {items.filter((item: IAddedCartItem) => item.checked).length}
          </span>
          개
        </p>
      </div>

      <div className="detail_box">
        <div className="label_box">
          <label htmlFor="totalPrice">총 주문금액</label>
        </div>
        <p className="price_unit">
          <span className="total_price_zone" id="totalPrice">
            {formatPrice(totalPrice.toString())}
          </span>
          원
        </p>
      </div>

      <div className="detail_box">
        <div className="label_box">
          <label htmlFor="deliveryCharge">배송비</label>
        </div>
        <p className="price_unit">
          <span className="delivery_charge_zone" id="deliveryCharge">
            {formatPrice(deliveryCharge)}
          </span>
          원
        </p>
      </div>

      <div className="detail_box">
        <div className="label_box">
          <label className="final_price" htmlFor="finalPrice">
            총 결제금액
          </label>
        </div>
        <p className="price_unit final">
          <span className="final_price_zone" id="finalPrice">
            {formatPrice(finalPrice.toString())}
          </span>
          원
        </p>
      </div>
    </div>
  );
};

export default CartDetail;
