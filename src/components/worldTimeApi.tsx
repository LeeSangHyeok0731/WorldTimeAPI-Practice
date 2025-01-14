import { useEffect, useState } from "react";
import UseWorldTimeApi from "../api/useWorldTimeApi";

function WorldTimeComponent() {
  const [time, setTime] = useState<string>("로딩중...");
  const [TimeZone, setTimezone] = useState<string>("Asia/Seoul");

  useEffect(() => {
    const fetchTime = async () => {
      const Time = await UseWorldTimeApi(TimeZone);
      setTime(Time);
    };
    fetchTime();
  }, [TimeZone]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌎 World Time API</h1>
      <select onChange={(e) => setTimezone(e.target.value)} value={TimeZone}>
        <option value="Asia/Seoul">Asia/Seoul</option>
        <option value="America/New_York">America/New_York</option>
        <option value="Europe/London">Europe/London</option>
      </select>
      <h2>{time}</h2>
    </div>
  );
}

export default WorldTimeComponent;
