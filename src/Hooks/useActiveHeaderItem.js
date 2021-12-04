import useSWR from "swr";

function useActiveHeaderItem() {
  const { data, mutate } = useSWR(
    "activeHeaderItem",
    () => window.$activeHeaderItem
  );

  return {
    clickedData: window.$activeHeaderItem || false,
    clickedMutate: ($activeHeaderItem) => {
      window.$activeHeaderItem = $activeHeaderItem;
      return mutate();
    },
  };
}
export default useActiveHeaderItem;