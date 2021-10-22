import useSWR from "swr";
import axios from "axios";

function useMyPageData() {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const myPageUrl = "http://localhost:8282/v1/me";
  const fetcher = (url) => {
    return axios.get(url, config).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(myPageUrl, fetcher);

  return {
    myData: data,
    loadingMyData: !error && !data,
    myDataError: error,
    mutateMyData: mutate,
  };
}

export default useMyPageData;
