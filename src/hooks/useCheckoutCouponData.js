import useSWR from "swr";

function useCheckoutCouponData() {
  const { data, mutate } = useSWR(
    "checkoutCouponData",
    () => window.$checkoutCouponData
  );

  return {
    checkoutCouponData: data || {},
    MutateCheckoutCouponData: ($checkoutCouponData) => {
      window.$checkoutCouponData = $checkoutCouponData;
      return mutate();
    },
  };
}

export default useCheckoutCouponData;
