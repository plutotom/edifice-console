import { DEFAULT_LOCATION } from "../lib/config";
import { getWttrData } from "~/actions/getWttrData";
import CurrentWeather from "../components/weeather/CurrentWeather";
import type { Weather } from "~/lib/wttrTypes";
import Time from "../components/ui/Time";
import getAllNotionTodos from "~/actions/getNotionTodos";
export const dynamic = "force-dynamic"; // makes sure changes update on page if database data changes
import Todos from "~/components/Todos/Todos";
import CalendarWeekViewV3 from "~/components/Calendar/CalendarWeekViewV3";

export default async function HomePage() {
  const city = DEFAULT_LOCATION.city || "Elgin";
  const wttrData = (await getWttrData(city)) as Weather;

  const notionTodos = await getAllNotionTodos(); // how to cache this on server side> in next
  return (
    <main className="p-3">
      <Time />
      <div> {new Date().toLocaleTimeString()}</div>
      <div>{wttrData && <CurrentWeather data={wttrData} />}</div>
      <Todos data={[...notionTodos]} />
      <div>
        {/* // calEventsData && <CalendarWeekView data={calEventsData} />
          // calEventsData && <CalendarWeekViewV2 />
           */}
        <CalendarWeekViewV3 />
      </div>
      <p>
        Last Weather Observation:{" "}
        {wttrData.current_condition[0]?.localObsDateTime}
      </p>
    </main>
  );
}
