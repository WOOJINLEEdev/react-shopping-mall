import useSWR from "swr";

function useSearch() {
  const { data, mutate } = useSWR("search", () => window.$search);

  return {
    searchData: data || false,
    searchMutate: ($search) => {
      window.$search = $search;

      return mutate();
    },
  };
}

export default useSearch;
