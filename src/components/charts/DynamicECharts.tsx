"use client";

import dynamic from "next/dynamic";

const ReactECharts = dynamic(
  () => import("echarts-for-react").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div style={{ width: "100%", height: "100%", minHeight: 100 }} />
    ),
  }
);

export default ReactECharts;
