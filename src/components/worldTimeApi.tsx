import { useEffect, useState } from "react";
import UseWorldTimeApi from "../api/useWorldTimeApi";

function WorldTimeComponent() {
  const [time, setTime] = useState<string>("로딩중...");
  const [timeZone, setTimeZone] = useState<string>("Asia/Seoul");

  const [date, setDate] = useState<string>("날짜");
  const [clock, setClock] = useState<string>("시간");

  // 타임존 변경 시마다 시간 업데이트
  useEffect(() => {
    const fetchTime = async () => {
      const currentTime = await UseWorldTimeApi(timeZone);
      setTime(currentTime);
    };
    fetchTime();
  }, [timeZone]);

  // 시간 데이터를 나누어 로그 출력
  useEffect(() => {
    if (time && time.includes("T")) {
      const splitTime = time.split("T");
      setDate(`날짜: ${splitTime[0].split("-")}`); // 날짜 출력
      setClock(`시간: ${splitTime[1].slice(0, 8)}`); // 시간 출력
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
