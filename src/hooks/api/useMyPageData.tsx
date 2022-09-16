import useSWR from "swr";

import useHttpClient from "hooks/useHttpClient";

const useMyPageData = () => {
  const instance = useHttpClient();

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
