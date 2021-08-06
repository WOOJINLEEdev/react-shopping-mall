import useSWR from "swr";
import axios from "axios";

function useBoardItem(boardItemId) {
  const boardUrl = `https://jsonplaceholder.typicode.com/posts/${boardItemId}`;
  const fetcher = (url) => {
    return axios.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(boardUrl, fetcher);

  return {
    boardItem: data,
    loadingBoardItem: !error && !data,
    boardItemError: error,
    mutateBoard: mutate,
  };
}

export default useBoardItem;
