import useSWR from "swr";
import axios from "axios";

const useBoardItem = (boardItemId?: number) => {
  const boardUrl = boardItemId
    ? `https://jsonplaceholder.typicode.com/posts/${boardItemId}`
    : null;
  const fetcher = (url: string) => {
    return axios.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(boardUrl, fetcher, {
    suspense: true,
    revalidateIfStale: false,
  });

  return {
    boardItem: data,
    loadingBoardItem: !error && !data,
    boardItemError: error,
    mutateBoard: mutate,
  };
};

export default useBoardItem;
