import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DEFAULT_LOCATION } from "../lib/config";
import { getWttrData } from "~/actions/getWttrData";
import CurrentWeather from "../components/weeather/CurrentWeather";
import type { Weather } from "~/lib/wttrTypes";
import Time from "../components/ui/Time";
export const dynamic = "force-dynamic"; // makes sure changes update on page if database data changes

export default async function HomePage() {
  const city = DEFAULT_LOCATION.city || "Elgin";
  const wttrData = (await getWttrData(city)) as Weather;

  const lastUpdated = new Date();

  return (
    <main className="p-3">
      <div>{wttrData && <CurrentWeather data={wttrData} />}</div>
      <p>Last Updated: {lastUpdated.toLocaleString()}</p>
    </main>
  );
}
