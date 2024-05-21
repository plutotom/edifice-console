import { google } from "googleapis";
import type { Event } from "../lib/calTypes";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_CALENDAR_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CALENDAR_SERVICE_EMAIL;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER;

const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  // CREDENTIALS_PATH,
  undefined,
  GOOGLE_PRIVATE_KEY,
  SCOPES,
);

// @ts-expect-error - Calendar is complaining but seems the type is not set right
const client = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});

// make a function to get the events
const getEvents = async (): Promise<Event[]> => {
  const res = (await client.events
    .list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    })
    .then((res) => res.data.items ?? [])) as Event[];

  // console.log(res);
  return res; // Explicitly cast res to Event[]
};

export default getEvents;
