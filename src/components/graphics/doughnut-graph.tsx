"use client";

import { Graphdata } from "@/types";
import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

interface Props {
  data: Graphdata;
}

const DoughnutGraph: FC<Props> = ({ data }) => {
  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
    },

    cutout: 75,
    responsive: true,
    maintainAspectRatio: true,
  } as const;
  return <Doughnut data={data} options={options} />;
};

export default DoughnutGraph;
