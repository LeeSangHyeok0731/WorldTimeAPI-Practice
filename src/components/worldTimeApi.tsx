import { useEffect, useState } from "react";
import UseWorldTimeApi from "../api/useWorldTimeApi";

function WorldTimeComponent() {
  const [time, setTime] = useState<string>("로딩중...");
  const [timeZone, setTimeZone] = useState<string>("Asia/Seoul");

  const [date, setDate] = useState<string>("날짜");
  const [clock, setClock] = useState<string>("시간");

  useEffect(() => {
    const fetchTime = async () => {
      const currentTime = await UseWorldTimeApi(timeZone);
      setTime(currentTime);
    };
    fetchTime();
  }, [timeZone]);

  useEffect(() => {
    if (time && time.includes("T")) {
      const splitTime = time.split("T");

      const year = splitTime[0]
        .split("-")
        .map((x, index) => {
          return index === 0 ? `${x}년` : index === 1 ? `${x}월` : `${x}일`;
        })
        .join("");

      const hour = splitTime[1]
        .slice(0, 8)
        .split(":")
        .map((x, index) => {
          return index === 0 ? `${x}시` : index === 1 ? `${x}분` : `${x}초`;
        })
        .join("");

      setDate(`날짜: ${year}`); // 날짜 출력
      setClock(`시간: ${hour}`); // 시간 출력
    }
  }, [time]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌎 World Time API</h1>
      <select onChange={(e) => setTimeZone(e.target.value)} value={timeZone}>
        <option value="Asia/Seoul">Asia/Seoul</option>
        <option value="America/New_York">America/New_York</option>
        <option value="Europe/London">Europe/London</option>
      </select>
      <h2>
        {date}
        <br />
        {clock}
      </h2>
    </div>
  );
}

export default WorldTimeComponent;
