import useSWR from "swr";

import useHttpClient from "hooks/useHttpClient";

interface IUseVisitCount {
  visitStartDate: string;
  visitEndDate: string;
  division: "shop" | "me";
}

const useVisitCount = ({
  visitStartDate,
  visitEndDate,
  division,
}: IUseVisitCount) => {
  const instance = useHttpClient();

  const shopVisitCountUrl = `/v1/shop/daily-visits?visit_start_date=${visitStartDate}&visit_end_date=${visitEndDate}`;
  const myVisitCountUrl = `/v1/me/daily-visits?visit_start_date=${visitStartDate}&visit_end_date=${visitEndDate}`;

  const fetcher = (url: string) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(
    division === "shop" ? shopVisitCountUrl : myVisitCountUrl,
    fetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      suspense: true,
    },
  );

  return {
    data: data ?? {},
    loadingVisitCount: !error && !data,
    visitCountError: error,
    mutateVisitCount: mutate,
  };
};

export default useVisitCount;
