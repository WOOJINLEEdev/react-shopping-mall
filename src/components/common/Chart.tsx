import ApexChart, { Props } from "react-apexcharts";

const Chart = ({
  type,
  series,
  options,
  chartHeight,
}: Props | Readonly<Props>) => {
  return (
    <ApexChart
      type={type}
      series={series}
      options={options}
      height={chartHeight}
    />
  );
};

export default Chart;
