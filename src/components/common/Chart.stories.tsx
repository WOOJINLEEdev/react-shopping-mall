// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from "@storybook/react";
import { Props } from "react-apexcharts";

import Chart from "components/common/Chart";

export default {
  component: Chart,
  title: "Chart",
} as Meta;

const Template: Story<Props | Readonly<Props>> = (args) => <Chart {...args} />;

export const Bar = Template.bind({});
Bar.args = {
  type: "bar",
  height: "200px",
  series: [
    {
      name: "방문 수",
      data: [1, 2, 3, 4, 5, 6, 7],
    },
  ],
  options: {
    colors: ["#228B22", "#228B22"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          { offset: 0, color: "#81c147", opacity: 1 },
          { offset: 100, color: "#008000", opacity: 1 },
        ],
      },
    },
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: string | number) {
        return val;
      },
      offsetY: -20,
      style: {
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [10, 11, 12, 13, 14, 15, 16],
      position: "bottom",
      labels: {
        show: true,
        formatter: function (val: string) {
          return val;
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      tickAmount: 5,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val: number) {
          return String(val);
        },
      },
    },
    title: {
      text: "2022년 06월 방문자 현황",
      floating: true,
      offsetY: 0,
      align: "center",
      style: {
        color: "#444",
      },
    },
  },
};

export const Line = Template.bind({});
Line.args = {
  type: "line",
  height: "200px",
  series: [
    {
      name: "방문 수",
      data: [1, 2, 3, 4, 5, 6, 7],
    },
  ],
  options: {
    colors: ["#228B22", "#228B22"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          { offset: 0, color: "#81c147", opacity: 1 },
          { offset: 100, color: "#008000", opacity: 1 },
        ],
      },
    },
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: string | number) {
        return val;
      },
      offsetY: -20,
      style: {
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [10, 11, 12, 13, 14, 15, 16],
      position: "bottom",
      labels: {
        show: true,
        formatter: function (val: string) {
          return val;
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      tickAmount: 5,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val: number) {
          return String(val);
        },
      },
    },
    title: {
      text: "2022년 06월 방문자 현황",
      floating: true,
      offsetY: 0,
      align: "center",
      style: {
        color: "#444",
      },
    },
  },
};
