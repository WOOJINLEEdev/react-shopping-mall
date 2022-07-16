import useSWR from "swr";
import axios from "axios";

const useBoardItem = (boardItemId: number) => {
  const boardUrl = `https://jsonplaceholder.typicode.com/posts/${boardItemId}`;
  const fetcher = (url: string) => {
    return axios.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(boardUrl, fetcher);

  return {
    boardItem: data,
    loadingBoardItem: !error && !data,
    boardItemError: error,
    mutateBoard: mutate,
  };
};

export default useBoardItem;
