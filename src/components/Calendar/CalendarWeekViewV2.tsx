"use client";
import React, { useEffect, useState } from "react";
import type { Event } from "../../lib/calTypes";
// const {google} = require('googleapis');
import { google, GoogleApis } from "googleapis";
import { authGoogleCal } from "~/actions/authGoogleCal";

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

const CalendarWeekViewV2: React.FC = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [content, setContent] = useState<Event[]>([]);
  const [tokenClient, setTokenClient] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const loadScript = (src: string, onLoad: () => void) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = onLoad;
      document.body.appendChild(script);
    };

    loadScript("https://apis.google.com/js/api.js", gapiLoaded);
    loadScript("https://accounts.google.com/gsi/client", gisLoaded);
  }, []);

  const gapiLoaded = () => {
    window.gapi.load("client", initializeGapiClient);
  };

  const initializeGapiClient = async () => {
    // await window.gapi.client.init({
    //   apiKey: API_KEY,
    //   discoveryDocs: [DISCOVERY_DOC],
    // });
    await authGoogleCal();
    console.log("finished authGoogleCal");
    setGapiInited(true);
  };

  const gisLoaded = () => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "" as any, // will be defined later
    });
    setTokenClient(client);
    setGisInited(true);
  };

  useEffect(() => {
    if (gapiInited && gisInited) {
      document.getElementById("authorize_button")!.style.visibility = "visible";
    }
  }, [gapiInited, gisInited]);

  const handleAuthClick = () => {
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setIsAuthorized(true);
      await listUpcomingEvents();
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  };

  const handleSignoutClick = () => {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token, () => {
        window.gapi.client.setToken("");
        setContent("");
        setIsAuthorized(false);
      });
    }
  };

  const listUpcomingEvents = async () => {
    let response;
    try {
      const currentDate = new Date();
      const nextWeek = new Date(
        currentDate.getTime() + 7 * 24 * 60 * 60 * 1000,
      );
      const request = {
        calendarId: "primary",
        timeMin: currentDate.toISOString(),
        timeMax: nextWeek.toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 1000,
        orderBy: "startTime",
      };
      response = await window.gapi.client.calendar.events.list(request);
    } catch (err: any) {
      //   setContent(err.message);
      return;
    }

    const events: Event[] = response.result.items;
    if (!events || events.length === 0) {
      setContent([]);
      return;
    }

    setContent(events);
  };

  return (
    <div>
      <button
        id="authorize_button"
        onClick={handleAuthClick}
        style={{ visibility: "hidden" }}
      >
        Authorize
      </button>
      {/* <button
        id="signout_button"
        onClick={handleSignoutClick}
        style={{ visibility: isAuthorized ? "visible" : "hidden" }}
      >
        Sign Out
      </button> */}
      <pre id="content" style={{ whiteSpace: "pre-wrap" }}>
        {content.length > 0
          ? content?.map((event: Event) => {
              const start = event.start.dateTime || event.start.date;
              return `${start} - ${event.summary}\n`;
            })
          : "No events found."}
      </pre>
    </div>
  );
};

export default CalendarWeekViewV2;
