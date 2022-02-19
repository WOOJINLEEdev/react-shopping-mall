import useSWR from "swr";

function useSearchResult() {
  const { data, mutate } = useSWR("searchResult", () => window.$searchResult);

  return {
    searchResultData: data,
    searchResultMutate: ($searchResult: any) => {
      window.$searchResult = $searchResult;

      return mutate();
    },
  };
}

export default useSearchResult;