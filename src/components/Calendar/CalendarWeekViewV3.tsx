"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import CalendarWeekView from "./CalendarWeekView";
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

import { OneTapLogin } from "./CalendarSignin";
import { ResponseError, myFetch } from "~/lib/hooks/fetchWrapper";

function App() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        // TODO - try refreshing the token

        setError(err as Error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <p>Calendar!</p>
      {error && <div>{error.message}</div>}

      {CLIENT_ID && (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <div>
            <div>
              {!error && (
                <>
                  <h1>Calendar Week View</h1>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    events && <CalendarWeekView data={events} />
                  )}
                </>
              )}
            </div>

            {!events && <OneTapLogin />}
          </div>
        </GoogleOAuthProvider>
      )}
    </div>
  );
}

export default App;

const fetchEvents = async () => {
  let data: Event[] = [];
  const accessToken = localStorage.getItem("GoogleAccessToken");

  try {
    const currentDate = new Date().toISOString();
    const nextWeek = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString();

    const res = await myFetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${currentDate}&timeMax=${nextWeek}`,
      // `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const temp = (await res.json()) as { items: Event[] };
    data = temp.items;
  } catch (err: unknown) {
    if (err instanceof ResponseError) {
      // Nice and type-safe!
      switch (err.response.status) {
        case 401:
          throw new Error("You are not authorized to view this page");
        case 404:
          throw new Error("The user could not be found");
        default:
          throw new Error("An unknown error occured when fetching the user", {
            cause: err,
          });
      }
    } else {
      throw new Error("An unknown error occured when fetching the user", {
        cause: err,
      });
    }
  }

  return data;
};
