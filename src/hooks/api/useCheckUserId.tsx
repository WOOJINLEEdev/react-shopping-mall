import { useState } from "react";
import useSWR from "swr";

import useHttpClient from "hooks/useHttpClient";

interface IUseCheckUserId {
  userId: string;
}

const useCheckUserId = ({ userId }: IUseCheckUserId) => {
  const instance = useHttpClient();

  const [shouldRefetch, setShouldRefetch] = useState(false);

  const refetch = () => {
    setShouldRefetch(true);
  };

  const checkUrl = `v1/auth/check-user-id?user_id=${userId}`;
  const fetcher = (url: string) => {
    return instance.get(url).then((res) => {
      if (res.data) {
        setShouldRefetch(false);
        return alert("이미 존재하는 ID 입니다. 다른 ID를 입력해주세요.");
      }

      setShouldRefetch(false);
      alert("사용 가능한 ID 입니다.");
      return res.data;
    });
  };

  const { data, error, mutate } = useSWR(
    shouldRefetch ? checkUrl : null,
    fetcher,
    {
      revalidateIfStale: false,
    },
  );

  return {
    data,
    error,
    mutate,
    refetch,
  };
};

export default useCheckUserId;
