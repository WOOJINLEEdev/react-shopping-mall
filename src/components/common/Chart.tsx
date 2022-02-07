import React from "react";
import ApexChart from "react-apexcharts";

const Chart = ({ type, series, options, chartHeight }) => {
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
