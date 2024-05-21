import { google } from "googleapis";

export const authGoogleCal = async () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const client_secret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar",
  ];

  const YOUR_REDIRECT =
    process.env.NEXT_PUBLIC_GOOGLE_CAL_REDIRECT_URL ?? "http://localhost:3000";

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    client_secret,
    YOUR_REDIRECT,
  );

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",

    scope: SCOPES,
  });

  // This will provide an object with the access_token and refresh_token.
  // Save these somewhere safe so they can be used at a later time.
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  console.log(oauth2Client);
};
