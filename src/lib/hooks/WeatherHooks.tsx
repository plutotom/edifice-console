import { BsFillCloudFill } from "react-icons/bs";
const useWeatherIcon = (weatherDesc: string) => {
  if (weatherDesc === "Sunny") {
    return <BsFillCloudFill />;
  }
  if (weatherDesc === "Clear") {
    return <BsFillCloudFill />;
  }
  if (weatherDesc === "Partly cloudy") {
    return <BsFillCloudFill />;
  }
  if (weatherDesc === "Cloudy") {
    return <BsFillCloudFill />;
  }

  return <BsFillCloudFill />;
};

const useGetDaysFromToday = (day: number) => {
  const today = new Date();
  const result = new Date(today);
  result.setDate(today.getDate() + day);
  return result;
};

export { useWeatherIcon, useGetDaysFromToday };
