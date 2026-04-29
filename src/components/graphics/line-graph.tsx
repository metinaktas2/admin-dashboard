"use client";

import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { FC } from "react";
import { Graphdata } from "@/types";

interface Props {
  data: Graphdata;
}

const LineGraph: FC<Props> = ({ data }) => {
  return (
    <Line
      data={data}
      options={{ plugins: { legend: { display: false } }, responsive: true }}
      style={{ width: "%100" }}
    />
  );
};

export default LineGraph;
