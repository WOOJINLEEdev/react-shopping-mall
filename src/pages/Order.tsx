import { useParams } from "react-router-dom";

import useCheckout from "hooks/useCheckout";
import { useDevice } from "hooks/useDevice";

import OrderDelivery from "components/order/OrderDelivery";
import OrderCoupon from "components/order/OrderCoupon";
import OrderPayments from "components/order/OrderPayments";
import OrderTotal from "components/order/OrderTotal";
import OrderTotalDetail from "components/order/OrderTotalDetail";
import Loading from "components/common/Loading";

interface ILineItem {
  image_src: string;
  product_id: number;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
  variant_price: string;
}

const Order = () => {
  const matchParams = useParams();
  const checkoutNumber = Number(matchParams.checkoutId);

  const { isPc, isTablet, isMobile } = useDevice();
  const { checkoutData, loadingCheckout, checkoutError, mutateCheckout } =
    useCheckout(checkoutNumber);

  if (checkoutError) return <div>failed to load...</div>;
  if (loadingCheckout) return <Loading />;

  const items: ILineItem[] = checkoutData.line_items;
  const totalPrice: number = items
    .map((item: ILineItem) => Number(item.variant_price) * item.quantity)
    .reduce((sum: number, itemPrice: number) => sum + itemPrice, 0);
  const deliveryCharge: string = localStorage.getItem("delivery")!;

  if (checkoutData.line_items.length > 1) {
    if (totalPrice > 70000) {
      localStorage.setItem("delivery", "0");
    }
    if (totalPrice < 70000) {
      localStorage.setItem("delivery", "3000");
    }
  }

  return (
    <div className="order_wrapper">
      {isPc && (
        <div className="delivery_coupon_pay_wrap">
          <OrderDelivery checkoutData={checkoutData} />
          <OrderCoupon checkoutData={checkoutData} />
          <OrderPayments />
        </div>
      )}
      {isPc && (
        <OrderTotal
          checkoutData={checkoutData}
          checkoutNumber={checkoutNumber}
        />
      )}

      {isTablet && (
        <div>
          <OrderDelivery checkoutData={checkoutData} />
          <OrderTotal
            checkoutData={checkoutData}
            checkoutNumber={checkoutNumber}
          />
          <OrderCoupon checkoutData={checkoutData} />
          <OrderPayments />
          <OrderTotalDetail
            totalPrice={totalPrice}
            deliveryCharge={deliveryCharge}
            checkoutData={checkoutData}
            checkoutNumber={checkoutNumber}
          />
        </div>
      )}
      {isMobile && (
        <div>
          <OrderDelivery checkoutData={checkoutData} />
          <OrderTotal
            checkoutData={checkoutData}
            checkoutNumber={checkoutNumber}
          />
          <OrderCoupon checkoutData={checkoutData} />
          <OrderPayments />
          <OrderTotalDetail
            totalPrice={totalPrice}
            deliveryCharge={deliveryCharge}
            checkoutData={checkoutData}
            checkoutNumber={checkoutNumber}
          />
        </div>
      )}
    </div>
  );
};

export default Order;
