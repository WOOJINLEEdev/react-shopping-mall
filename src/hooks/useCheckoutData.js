import useSWR from "swr";

function useCheckoutData() {
  const { data, mutate } = useSWR(
    "checkoutTotalData",
    () => window.$checkoutTotalData
  );

  return {
    checkoutTotalData: data,
    MutateCheckoutTotalData: ($checkoutTotalData) => {
      window.$checkoutTotalData = $checkoutTotalData;
      return mutate();
    },
  };
}

export default useCheckoutData;
