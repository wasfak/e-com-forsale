"use client";
import { useState, useEffect } from "react";
import PlausibleChart from "./components/PlausibleChart";
import { formatDuration } from "@/utils/helpers";

export default function PlausiPage() {
  const [data1, setData1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

  const [data2, setData2] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);

  async function fetchPlausibleData1() {
    try {
      const response = await fetch(
        "https://plausible.io/api/v1/stats/timeseries?site_id=test.dev&period=30d",
        {
          headers: {
            Authorization: `Bearer 9W_rhttPJuSWXsWDQvzmp7-P6Po67G_gguder4NtFTarzK1q7JE_3bNS7wM3uqS9`, // Replace with your actual API key
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setData1(jsonData);
      setLoading1(false);
    } catch (error) {
      console.error("Error fetching Plausible data:", error);
      setError1(error);
      setLoading1(false);
    }
  }

  async function fetchPlausibleData2() {
    try {
      const response = await fetch(
        "https://plausible.io/api/v1/stats/aggregate?site_id=test.dev&period=6mo&metrics=visitors,pageviews,bounce_rate,visit_duration",
        {
          headers: {
            Authorization: `Bearer 9W_rhttPJuSWXsWDQvzmp7-P6Po67G_gguder4NtFTarzK1q7JE_3bNS7wM3uqS9`, // Replace with your actual API key
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setData2(jsonData);
      setLoading2(false);
      console.log(jsonData); // Log the data
    } catch (error) {
      console.error("Error fetching Plausible data:", error);
      setError2(error);
      setLoading2(false);
    }
  }

  useEffect(() => {
    fetchPlausibleData1();
    fetchPlausibleData2();
  }, []);

  if (loading1 || loading2) {
    return <div>Loading...</div>;
  }

  if (error1 || error2) {
    return (
      <div>
        Error 1: {error1 && error1.message}
        <br />
        Error 2: {error2 && error2.message}
      </div>
    );
  }

  return (
    <div className="px-64">
      <div className="flex items-center justify-between gap-x-2 my-2">
        <p>Visitors: {data2.results.visitors.value}</p>
        <p>Page views: {data2.results.pageviews.value}</p>
        <p>
          Visit Duration: {formatDuration(data2.results.visit_duration.value)}
        </p>
        <p>Bounce Rate: {data2.results.bounce_rate.value}%</p>
      </div>
      <PlausibleChart data={data1} />
    </div>
  );
}
