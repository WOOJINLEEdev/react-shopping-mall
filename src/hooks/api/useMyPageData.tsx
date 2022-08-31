import useSWR from "swr";

import { instance } from "utils/http-client";

const useMyPageData = () => {
  const myPageUrl = "/v1/me";
  const fetcher = (url: string) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(myPageUrl, fetcher, {
    suspense: true,
  });

  return {
    myData: data,
    loadingMyData: !error && !data,
    myDataError: error,
    mutateMyData: mutate,
  };
};

export default useMyPageData;
