import useSWR from "swr";

function useCheckoutPaymentData() {
  const { data, mutate } = useSWR(
    "checkoutPaymentData",
    () => window.$checkoutPaymentData
  );

  return {
    checkoutPaymentData: data || {},
    MutateCheckoutPaymentData: ($checkoutPaymentData: any) => {
      window.$checkoutPaymentData = $checkoutPaymentData;
      return mutate();
    },
  };
}

export default useCheckoutPaymentData;
