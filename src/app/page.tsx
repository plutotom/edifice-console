import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DEFAULT_LOCATION } from "../lib/config";

import { getTodos } from "~/server/queries";
import CurrentWeather from "../components/widgets/CurrentWeather";
export const dynamic = "force-dynamic"; // makes sure changes update on page if database data changes

import { getHourlyData } from "../actions/getHourlyData";
import { getTenDayForecast } from "../actions/getTenDayForecast";

import { HourlyForecastResponse, TenDayForecastData } from "../lib/types";
import { getWttrData } from "~/actions/getWttrData";

export default async function HomePage() {
  const todos = await getTodos();
  const { lat, lon } = DEFAULT_LOCATION.coord;
  const city = DEFAULT_LOCATION.city || "Elgin";

  const { wttrData } = getWttrData(city);
  console.log(wttrData);
  // const { title, curcon, weatherDesc, area } = getMetaData(data);

  return (
    <main className="">
      <Card className="w-[350px]">
        <h1>Edifice Console</h1>

        {todos?.map((todo) => (
          <div key={todo.id}>
            <p>{todo.text}</p>
            <p>{todo.description}</p>
          </div>
        ))}
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          {/* <CurrentWeather data={hourly_data.list[0]} city={hourly_data.city} /> */}
          {/* <TenDayForecast data={ten_day_forecast} /> */}
        </div>
        <CardHeader>
          <CardTitle>Edifice Console</CardTitle>
          <CardDescription>Edifice Console</CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
