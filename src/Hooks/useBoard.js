import useSWR from "swr";
import axios from "axios";

function useBoard() {
  const cartUrl = "https://jsonplaceholder.typicode.com/posts";
  const fetcher = (url) => {
    return axios.get(url).then((res) => res.data);
  };
  const { data, error, mutate } = useSWR(cartUrl, fetcher, {
    loadingTimeOut: 3000,
  });

  return {
    board: data,
    loadingBoard: !error && !data,
    boardError: error,
    mutateBoard: mutate,
  };
}

export default useBoard;
