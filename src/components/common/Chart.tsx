import React from "react";
import ApexChart from "react-apexcharts";

interface ChartProps {
  type:
    | "area"
    | "line"
    | "bar"
    | "histogram"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "treemap"
    | "boxPlot"
    | "candlestick"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | undefined;
  series: any;
  options: any;
  chartHeight: number;
}

const Chart = ({
  type,
  series,
  options,
  chartHeight,
}: ChartProps | Readonly<ChartProps>) => {
  return (
    <ApexChart
      type={type}
      series={series}
      options={options}
      height={chartHeight}
    />
  );
};

export default React.memo(Chart);
