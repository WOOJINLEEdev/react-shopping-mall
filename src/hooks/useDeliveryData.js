import useSWR from "swr";

function useDeliveryData() {
  const { data, mutate } = useSWR(
    "myDeliveryData",
    () => window.$myDeliveryData
  );

  return {
    myDeliveryData: data,
    MutateMyDeliveryData: ($myDeliveryData) => {
      window.$myDeliveryData = $myDeliveryData;
      return mutate();
    },
  };
}

export default useDeliveryData;
