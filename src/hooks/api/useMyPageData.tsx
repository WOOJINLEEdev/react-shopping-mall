import useSWR from "swr";

import useTokenStatus from "hooks/useTokenStatus";
import { instance } from "utils/http-client";

const useMyPageData = () => {
  const myPageUrl = "/v1/me";
  const fetcher = (url: string) => {
    return instance.get(url).then((res) => res.data);
  };

  const { token } = useTokenStatus();

  const { data, error, mutate } = useSWR(token ? myPageUrl : null, fetcher, {
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
