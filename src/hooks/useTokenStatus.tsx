import useSWR from "swr";

const useTokenStatus = () => {
  const { data, mutate } = useSWR("tokenStatus", () => window.$tokenStatus);

  return {
    token: data || false,
    mutateToken: ($tokenStatus: string) => {
      window.$tokenStatus = $tokenStatus;

      return mutate();
    },
    removeToken: () => {
      window.$tokenStatus = null;

      return mutate();
    },
  };
};

export default useTokenStatus;
