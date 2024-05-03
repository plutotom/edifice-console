"use client";
import { BsFillCloudFill } from "react-icons/bs";
import { Card, CardFooter } from "../ui/card";
// import type { City, HourlyForecastData } from "../../lib/types";
import type { Weather, WeatherConditions } from "~/lib/wttrTypes";
import { getMetaData } from "~/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface CurrentWeatherProps {
  data: Weather;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const { curcon, weatherDesc, area } = getMetaData(data);
  console.log(data);
  const tempDesc = weatherDesc;
  const location = area?.areaName[0]?.value;
  const weatherData = data.weather[0];
  const currentCondition = data.current_condition[0];
  const thisWeek = data.weather;

  const useGetDayFromToday = (day: number) => {
    const today = new Date();
    const result = new Date(today);
    result.setDate(today.getDate() + day);
    return result;
  };

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

  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(
      () => {
        router.refresh();
      },
      1000 * 60 * 60,
    ); // 60 minuets
    return () => clearInterval(interval);
  });

  return (
    <Card className="w-[380px] bg-slate-800 p-5">
      <div className="flex justify-between">
        <div className="text-xl">{curcon?.temp_F}°</div>
        <div>
          <span className=" border border-solid border-stone-700 p-2">
            {location}
          </span>
        </div>
      </div>
      <div className="flex space-x-1 text-xs text-muted-foreground">
        <div>
          <span>H: </span>
          {weatherData?.maxtempF}°
        </div>
        <div>
          <span>L: </span>
          {weatherData?.mintempF}°
        </div>
      </div>
      <div className="h-80 content-center">
        <BsFillCloudFill className="h-28 w-full" />
      </div>
      <CardFooter>
        <div className=" h-20 w-full  border-t border-green-500">
          <div>
            <p>
              {useGetDayFromToday(1).toLocaleDateString(undefined, {
                weekday: "long",
              })}
              : {thisWeek[1]?.maxtempF}° / {thisWeek[1]?.mintempF}°
            </p>
          </div>
          <div>
            <p>
              {useWeatherIcon(thisWeek[2]?.hourly[4]?.weatherDesc[0]?.value)}
              {useGetDayFromToday(2).toLocaleDateString(undefined, {
                weekday: "long",
              })}
              : {thisWeek[2]?.maxtempF}° / {thisWeek[2]?.mintempF}°
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
