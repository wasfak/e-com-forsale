import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PlausibleChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.results) {
      const dates = data.results.map((entry) => entry.date);
      const visitors = data.results.map((entry) => entry.visitors);

      const chartData = {
        labels: dates,
        datasets: [
          {
            label: "Total Visitors",
            data: visitors,
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      };

      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }

        chartRef.current.chart = new Chart(ctx, {
          type: "line",
          data: chartData,
          options: {
            scales: {
              x: {
                type: "category",
                grid: {
                  display: false, // Hide grid lines for x-axis
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [data]);

  return <canvas ref={chartRef} />; // Adjust width and height as needed
};

export default PlausibleChart;
