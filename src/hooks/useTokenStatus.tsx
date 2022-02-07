import useSWR from "swr";

function useTokenStatus() {
  const { data, mutate } = useSWR("tokenStatus", () => window.$tokenStatus);

  return {
    token: data || false,
    mutateToken: ($tokenStatus: any) => {
      window.$tokenStatus = $tokenStatus;

      return mutate();
    },
    removeToken: () => {
      window.$tokenStatus = null;

      return mutate();
    },
  };
}

export default useTokenStatus;
