import { useState, useEffect } from "react";
import styled from "styled-components";
import { ApexOptions } from "apexcharts";

import useVisitCount from "hooks/api/useVisitCount";
import { formatDate } from "utils/date";

import Loading from "components/common/Loading";
import Chart from "components/common/Chart";
import { IDailyVisit } from "components/mypage/types";

interface IMyPageChart {
  userName: string;
}

const MyPageChart = ({ userName }: IMyPageChart) => {
  const [series, setSeries] = useState<ApexOptions["series"]>();
  const [options, setOptions] = useState<ApexOptions>();

  const date = new Date();
  const year = formatDate(date, "YYYY");
  const month = formatDate(date, "MM");

  const visitStartDate = formatDate(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6),
  );
  const visitEndDate = formatDate(date);

  const { data } = useVisitCount({
    visitStartDate,
    visitEndDate,
    division: "me",
  });

  useEffect(() => {
    const visitDate = data.map((item: IDailyVisit) => item.visit_date);
    const visitCount = data.map((item: IDailyVisit) => item.visit_count);

    setSeries([
      {
        name: "방문 수",
        data: visitCount.reverse(),
      },
    ]);

    setOptions({
      colors: ["#228B22", "#228B22"],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: `${year}년 ${month}월 ${userName} 님의 방문 수`,
        align: "center",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: visitDate.slice(0, 7).reverse(),
        labels: {
          formatter: function (value: any) {
            return value?.substring(5);
          },
        },
      },
      markers: {
        size: 5,
        strokeColors: "#fff",
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
        hover: {
          size: 10,
          sizeOffset: 3,
        },
      },
    });
  }, []);

  if (!series || !options) {
    return <Loading />;
  }

  return (
    <ChartWrap>
      <Chart
        type={"line"}
        options={options}
        series={series}
        chartHeight={350}
      />
    </ChartWrap>
  );
};

export default MyPageChart;

const ChartWrap = styled.div`
  padding-top: 15px;
`;
