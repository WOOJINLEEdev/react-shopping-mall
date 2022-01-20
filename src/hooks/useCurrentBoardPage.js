import useSWR from "swr";

function useCurrentBoardPage() {
  const { data, mutate } = useSWR(
    "currentBoardPage",
    () => window.$currentBoardPage || {}
  );

  return {
    currentBoardPageData: data,
    getCurrentBoardPage: ($boardType) =>
      window.$currentBoardPage && window.$currentBoardPage[$boardType] > 0
        ? window.$currentBoardPage[$boardType]
        : 1,
    resetBoardData: ($boardType) => {
      if (window.$currentBoardPage) {
        window.$currentBoardPage[$boardType] = 0;
      }
    },
    mutateCurrentBoardPage: ($boardType, $currentBoardPage) => {
      if (!window.$currentBoardPage) {
        window.$currentBoardPage = {};
      }

      window.$currentBoardPage[$boardType] = $currentBoardPage;

      return mutate();
    },
  };
}

export default useCurrentBoardPage;
