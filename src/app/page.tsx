import { DEFAULT_LOCATION } from "../lib/config";
import { getWttrData } from "~/actions/getWttrData";
import getEvents from "~/actions/getGoogleCalEvents";
import CurrentWeather from "../components/weeather/CurrentWeather";
import type { Weather } from "~/lib/wttrTypes";
import Time from "../components/ui/Time";
import CalendarWeekView from "~/components/Calendar/CalendarWeekView";
import getAllNotionTodos from "~/actions/getNotionTodos";
export const dynamic = "force-dynamic"; // makes sure changes update on page if database data changes
import Todos from "~/components/Todos/Todos";
import type { Event } from "../lib/calTypes"; // Import the Event type from the correct location
import CalendarWeekViewV3 from "~/components/Calendar/CalendarWeekViewV3";
import CalendarWeekViewV2 from "~/components/Calendar/CalendarWeekViewV2";

export default async function HomePage() {
  let calendarFailed = false;
  const city = DEFAULT_LOCATION.city || "Elgin";
  // const wttrData = (await getWttrData(city)) as Weather;
  let calEventsData = [] as Event[]; // Use the imported Event type to define the type of calEventsData

  try {
    calEventsData = await getEvents();
  } catch (error) {
    console.log(error);
    calendarFailed = true;
  }

  // const notionTodos = await getAllNotionTodos(); // how to cache this on server side> in next
  return (
    <main className="p-3">
      <Time />
      <div> {new Date().toLocaleTimeString()}</div>
      {/* <div>{wttrData && <CurrentWeather data={wttrData} />}</div> */}
      {/* <Todos data={[...notionTodos]} /> */}
      <div>
        {calendarFailed ? (
          <p>Failed to get calendar </p>
        ) : (
          // calEventsData && <CalendarWeekView data={calEventsData} />
          // calEventsData && <CalendarWeekViewV2 />
          calEventsData && <CalendarWeekViewV3 />
        )}
      </div>
      <p>
        Last Weather Observation:{" "}
        {/* {wttrData.current_condition[0]?.localObsDateTime} */}
      </p>
    </main>
  );
}
