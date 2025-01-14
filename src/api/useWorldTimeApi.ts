type TimeApi = {
  datetime?: string;
};

const UseWorldTimeApi = async (timezone: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://worldtimeapi.org/api/timezone/${timezone}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: TimeApi = await response.json();
    return data.datetime || "시간 정보를 불러올 수 없습니다.";
  } catch (error) {
    console.error("시간 불러오기 오류:", error);
    return "시간을 불러오지 못했습니다.";
  }
};

export default UseWorldTimeApi;
