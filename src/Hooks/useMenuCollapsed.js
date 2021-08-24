import useSWR from "swr";

function useMenuCollapsed() {
  const { data, mutate } = useSWR("menuCollapsed", () => window.$menuCollapsed);

  return {
    data: window.$menuCollapsed || false,
    mutate: ($menuCollapsed) => {
      window.$menuCollapsed = $menuCollapsed;
      return mutate();
    },
  };
}

export default useMenuCollapsed;
