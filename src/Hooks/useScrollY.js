import useSWR from "swr";

function useScrollY() {
  const { data, mutate } = useSWR("scrollY", () => window.$scrollY);

  return {
    scrollYData: window.$scrollY || false,
    scrollYMutate: ($scrollY) => {
      window.$scrollY = $scrollY;

      return mutate();
    },
  };
}

export default useScrollY;
