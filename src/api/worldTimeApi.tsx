import { useState, useEffect } from "react";

type TimeApi = {
  utc_offset?: string;
  timezone?: string;
  day_of_week?: number;
  day_of_year?: number;
  datetime?: string;
  utc_datetime?: string;
  unixtime?: number;
  raw_offset?: number;
  week_number?: number;
  dst?: boolean;
  abbreviation?: string;
  dst_offset?: number;
  dst_from?: null;
  dst_until?: null;
  client_ip?: string;
};

function WorldTimeApi() {
  const [time, setTime] = useState<string>("로딩중...");
  const [timezone, setTimezone] = useState<string>("Asia/Seoul");

  const fetchTime = async () => {
    try {
      const response = await fetch(
        `https://worldtimeapi.org/api/timezone/${timezone}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: TimeApi = await response.json();
      setTime(data.datetime || "No time data available");
    } catch (error) {
      console.error("Error fetching time:", error);
      setTime("Failed to fetch time");
    }
  };

  useEffect(() => {
    fetchTime();
  }, [timezone]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌎 World Time API</h1>
      <select onChange={(e) => setTimezone(e.target.value)} value={timezone}>
        <option value="Asia/Seoul">Asia/Seoul</option>
        <option value="America/New_York">America/New_York</option>
        <option value="Europe/London">Europe/London</option>
      </select>
      <h2>{time}</h2>
    </div>
  );
}

export default WorldTimeApi;
