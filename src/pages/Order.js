import React from "react";
import { useMediaQuery } from "react-responsive";
import OrderDelivery from "components/order/OrderDelivery";
import OrderCoupon from "components/order/OrderCoupon";
import OrderPayments from "components/order/OrderPayments";
import OrderTotal from "components/order/OrderTotal";
import OrderTotalDetail from "components/order/OrderTotalDetail";
import useCheckout from "hooks/useCheckout";

const Order = ({ match }) => {
  const checkoutNumber = Number(match.params.checkoutId);

  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width:767px)",
  });

  const { checkoutData, loadingCheckout, checkoutError, mutateCheckout } =
    useCheckout(checkoutNumber);

  if (checkoutError) return <div>failed to load...</div>;
  if (loadingCheckout) return <div>loading...</div>;

  const items = checkoutData.line_items;
  const totalPrice = items
    .map((item) => item.variant_price * item.quantity)
    .reduce((sum, itemPrice) => sum + itemPrice, 0);
  const deliveryCharge = localStorage.getItem("delivery");

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
          <OrderDelivery
            checkoutData={checkoutData}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderCoupon
            checkoutData={checkoutData}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          <OrderPayments />
        </div>
      )}
      {isPc && (
        <OrderTotal
          checkoutData={checkoutData}
          checkoutNumber={checkoutNumber}
          isPc={isPc}
          isTablet={isTablet}
          isMobile={isMobile}
        />
      )}

      {isTablet && (
        <div>
          <OrderDelivery
            checkoutData={checkoutData}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderTotal
            checkoutData={checkoutData}
            checkoutNumber={checkoutNumber}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderCoupon
            checkoutData={checkoutData}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderPayments />
          <OrderTotalDetail
            totalPrice={totalPrice}
            deliveryCharge={deliveryCharge}
            checkoutData={checkoutData}
            checkoutNumber={checkoutNumber}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
        </div>
      )}
      {isMobile && (
        <div>
          <OrderDelivery
            checkoutData={checkoutData}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderTotal
            checkoutData={checkoutData}
            checkoutNumber={checkoutNumber}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderCoupon
            checkoutData={checkoutData}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <OrderPayments />
          <OrderTotalDetail
            totalPrice={totalPrice}
            deliveryCharge={deliveryCharge}
            checkoutData={checkoutData}
            checkoutNumber={checkoutNumber}
            isPc={isPc}
            isTablet={isTablet}
            isMobile={isMobile}
          />
        </div>
      )}
    </div>
  );
};

export default Order;
