import useSWR from "swr";

function useSearchResult() {
  const { data, mutate } = useSWR("searchResult", () => window.$searchResult);

  return {
    searchResultData: decodeURI(data),
    searchResultMutate: ($searchResult: string) => {
      window.$searchResult = $searchResult;

      return mutate();
    },
  };
}

export default useSearchResult;
