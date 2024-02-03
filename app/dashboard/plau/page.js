"use client";
import { useState, useEffect } from "react";
import PlausibleChart from "./components/PlausibleChart";
import { formatDuration } from "@/utils/helpers";
import OrdersAnPage from "./components/OrdersAnPage";
const token =
  "9W_rhttPJuSWXsWDQvzmp7-P6Po67G_gguder4NtFTarzK1q7JE_3bNS7wM3uqS9";
export default function PlausiPage() {
  // State for the first API call
  const [data1, setData1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

  // State for the second API call
  const [data2, setData2] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);

  // State for the third API call
  const [data3, setData3] = useState(null);
  const [loading3, setLoading3] = useState(true);
  const [error3, setError3] = useState(null);

  // Function to fetch data for the first API call
  async function fetchPlausibleData1() {
    try {
      const response = await fetch(
        "https://plausible.io/api/v1/stats/timeseries?site_id=test.dev&period=30d",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual API key
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

  // Function to fetch data for the second API call
  async function fetchPlausibleData2() {
    try {
      const response = await fetch(
        "https://plausible.io/api/v1/stats/aggregate?site_id=test.dev&period=6mo&metrics=visitors,pageviews,bounce_rate,visit_duration",
        {
          headers: {
            Authorization: `Bearer  ${token}`, // Replace with your actual API key
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
    } catch (error) {
      console.error("Error fetching Plausible data:", error);
      setError2(error);
      setLoading2(false);
    }
  }

  // Function to fetch data for the third API call
  async function fetchPlausibleData3() {
    try {
      const response = await fetch(
        `https://plausible.io/api/v1/stats/breakdown?site_id=test.dev&period=6mo&property=visit:source&metrics=visitors,bounce_rate&limit=5`,
        {
          headers: {
            Authorization: `Bearer  ${token}`, // Replace with your actual API key
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setData3(jsonData);

      setLoading3(false);
    } catch (error) {
      console.error("Error fetching Plausible data:", error);
      setError3(error);
      setLoading3(false);
    }
  }

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchPlausibleData1();
    fetchPlausibleData2();
    fetchPlausibleData3();
  }, []);

  // JSX for rendering the component
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 items-center justify-center h-[100vh] text-sm">
      {/* Display data for the second API call */}
      <div className="flex items-center justify-center rounded-xl shadow-2xl ">
        {loading2 && <div className="text-gray-700">Loading...</div>}
        {error2 && <div className="text-red-500">Error: {error2.message}</div>}
        {!loading2 && !error2 && (
          <div className="flex flex-col items-center justify-between gap-x-4 my-2 text-sm">
            <p className="text-lg">
              Unique Visitors: {data2.results.visitors.value}
            </p>
            <p className="text-lg">
              Page Views: {data2.results.pageviews.value}
            </p>
            <p className="text-lg">
              Visit Duration:{" "}
              {formatDuration(data2.results.visit_duration.value)}
            </p>
            <p className="text-lg">
              Bounce Rate: {data2.results.bounce_rate.value}%
            </p>
          </div>
        )}
      </div>

      {/* Display data for the third API call */}
      <div className=" ">
        {loading3 && <div className="text-gray-700">Loading...</div>}
        {error3 && <div className="text-red-500">Error: {error3.message}</div>}
        {!loading3 && !error3 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Top Sources:</h2>
            <ul>
              {data3.results.map((source, index) => (
                <li key={index} className="mb-4 border p-4 rounded-md">
                  <p className="text-lg">Visitors: {source.visitors}</p>
                  <p className="text-lg">Source: {source.source}</p>
                  <p className="text-lg">Bounce Rate: {source.bounce_rate}%</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Display data for the first API call */}
      <div className="">
        {loading1 && <div className="text-gray-700">Loading...</div>}
        {error1 && <div className="text-red-500">Error: {error1.message}</div>}
        {!loading1 && !error1 && (
          <div className=" rounded-xl shadow-2xl">
            <PlausibleChart data={data1} />
          </div>
        )}
      </div>
      <div className="rounded-xl shadow-2xl text-sm">
        {data2 && <OrdersAnPage visitors={data2.results.visitors.value} />}
      </div>
    </div>
  );
}
