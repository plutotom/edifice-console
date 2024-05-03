import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Weather, WeatherConditions, Area } from "./wttrTypes";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMetaData(data: Weather | undefined): {
  title: string;
  curcon: WeatherConditions | undefined;
  weatherDesc: string | undefined;
  area: Area | undefined;
} {
  if (!data) {
    return {
      title: "?",
      curcon: undefined,
      weatherDesc: undefined,
      area: undefined,
    };
  }
  const area = data.nearest_area[0];
  const curcon = data.current_condition[0];

  const names = [
    area?.areaName[0]?.value,
    area?.region[0]?.value,
    area?.country[0]?.value,
  ];
  const title = names
    .filter((n) => n && n.trim().length > 0)
    .map((n) => n?.trim())
    .join(", ");
  const weatherDesc = curcon ? curcon?.weatherDesc[0]?.value : undefined;
  return { title, curcon, weatherDesc, area };
}
export function getHourlyForecastData(data: Weather): Weather {
  return data;
}

export function getWeatherForecastData(data: Weather): Weather {
  return data;
}
