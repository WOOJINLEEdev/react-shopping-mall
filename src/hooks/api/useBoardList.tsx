import useSWR from "swr";
import axios from "axios";

const useBoardList = () => {
  const boardUrl = "https://jsonplaceholder.typicode.com/posts";
  const fetcher = (url: string) => {
    return axios.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(boardUrl, fetcher, {
    suspense: true,
    revalidateIfStale: false,
    revalidateOnMount: false,
  });

  return {
    boardList: data,
    loadingBoardList: !error && !data,
    boardListError: error,
    mutateBoardList: mutate,
  };
};

export default useBoardList;
