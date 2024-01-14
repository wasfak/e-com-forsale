"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const AnalyticsGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.pageviews) {
      const pageviewsData = {
        labels: ["Total Pageviews"], // Static label
        datasets: [
          {
            label: "Pageviews",
            data: [data.pageviews.value], // Single data point
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        // Ensure that there is an existing chart instance and destroy it
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }

        chartRef.current.chart = new Chart(ctx, {
          type: "bar",
          data: pageviewsData,
        });
      }
    }
  }, [data]);

  return <canvas ref={chartRef} width="400" height="200" />;
};

export default AnalyticsGraph;
