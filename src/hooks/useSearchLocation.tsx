import useSWR from "swr";

function useSearchLocation() {
  const { data, mutate } = useSWR(
    "searchLocation",
    () => window.$searchLocation
  );

  return {
    searchLocationData: data || false,
    searchLocationMutate: ($searchLocation: any) => {
      window.$searchLocation = $searchLocation;
      return mutate();
    },
  };
}

export default useSearchLocation;
