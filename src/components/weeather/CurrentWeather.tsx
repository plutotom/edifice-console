"use client";
import { BsFillCloudFill } from "react-icons/bs";
import { Card, CardFooter } from "../ui/card";
// import type { City, HourlyForecastData } from "../../lib/types";
import type { Weather, WeatherConditions, WeatherData } from "~/lib/wttrTypes";
import { getMetaData } from "~/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWeatherIcon } from "~/lib/hooks/WeatherHooks";

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
    <Card className="w-7/12 bg-slate-800 p-5">
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
        <div className="flex justify-center">
          {currentCondition?.weatherDesc[0]?.value}
        </div>
      </div>
      <CardFooter>
        <div className=" h-20 w-full  border-t border-slate-600 pt-1">
          {thisWeek.map((day, index) => {
            return <NextDayWeather key={index} thisWeek={day} />;
          })}
        </div>
      </CardFooter>
    </Card>
  );
}

const NextDayWeather = ({ thisWeek }: { thisWeek: WeatherData }) => {
  return (
    <>
      <div className="flex w-8/12 flex-nowrap items-center space-x-2 ">
        <div className="flex flex-nowrap items-center space-x-2">
          <span>
            {useWeatherIcon(
              thisWeek?.hourly[4]?.weatherDesc[0]?.value ?? "Sunny",
            )}
          </span>
          <span>
            {new Date(thisWeek.date).toLocaleDateString(undefined, {
              weekday: "long",
            })}
            :
          </span>
        </div>
        <p>
          {thisWeek?.maxtempF}° / {thisWeek?.mintempF}°
        </p>
      </div>
    </>
  );
};
