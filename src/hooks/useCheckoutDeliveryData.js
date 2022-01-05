import useSWR from "swr";

function useCheckoutDeliveryData() {
  const { data, mutate } = useSWR(
    "checkoutDeliveryData",
    () => window.$checkoutDeliveryData
  );

  return {
    checkoutDeliveryData: data || {},
    MutateCheckoutDeliveryData: ($checkoutDeliveryData) => {
      window.$checkoutDeliveryData = $checkoutDeliveryData;
      return mutate();
    },
  };
}

export default useCheckoutDeliveryData;
