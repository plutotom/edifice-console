"use client";
import {
  GoogleOAuthProvider,
  hasGrantedAnyScopeGoogle,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import React from "react";
import { hasGrantedAllScopesGoogle } from "@react-oauth/google";
import CalendarWeekView from "./CalendarWeekView";
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
// const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

function App() {
  return (
    <div>
      {CLIENT_ID && (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <CalendarWeekViewBody />
        </GoogleOAuthProvider>
      )}
    </div>
  );
}

export default App;
const CalendarWeekViewBody = () => {
  const useGetEvents = () => {
    const [events, setEvents] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    const accessToken = localStorage.getItem("GoogleAccessToken");

    React.useEffect(() => {
      const fetchEvents = async () => {
        try {
          const currentDate = new Date().toISOString();
          const nextWeek = new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
          ).toISOString();

          const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${currentDate}&timeMax=${nextWeek}`,
            // `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
          let data: Event[] = await response.json();

          setEvents(data.items);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }, []);

    return { events, loading, error };
  };

  const { events, loading } = useGetEvents();
  console.log(events);
  return (
    <div>
      <h1>Calendar Week View</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CalendarWeekView data={events} />
      )}
      <h1 className="text-3xl">break</h1>
      <OneTapLogin />
    </div>
  );
};

function SignIn() {
  const [user, setUser] = React.useState({
    accessToken: null,
    refreshToken: null,
    profile: null,
  });

  const handleLoginSuccess = (tokens) => {
    let hasAccess = hasGrantedAnyScopeGoogle(
      tokens,
      "https://www.googleapis.com/auth/calendar.readonly",
    );
    console.log("hasAccess", hasAccess);

    setUser({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      profile: tokens.profile, // User profile information
    });

    // Optionally, you might want to store the access token in local storage for persistence
    localStorage.setItem("GoogleAccessToken", tokens.access_token);
    localStorage.setItem("GoogleRefreshToken", tokens.refresh_token);

    return tokens; // Add this line to return the expected object
  };

  const googleLogin = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.readonly",
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      await handleLoginSuccess(tokenResponse);
      return tokenResponse;
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  // Check if a token exists in local storage when the component mounts
  React.useEffect(() => {
    const token = localStorage.getItem("GoogleAccessToken");
    const refreshToken = localStorage.getItem("GoogleRefreshToken");

    if (token) {
      // If a token exists, use it to authenticate the user
      // This will depend on your authentication system
      // For example, you might send a request to your backend to verify the token
      // Or you might decode the token on the client side if it's a JWT
      // Here's a simple example:
      setUser({
        accessToken: token ?? "",
        refreshToken: refreshToken ?? "", // You might also want to store the refresh token in local storage
        profile: null, // You might also want to store the user profile in local storage
      });
    }
  }, []);

  return (
    <div>
      <button onClick={() => googleLogin()}>Sign in with Google</button>
    </div>
  );
}

function OneTapLogin() {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log("One Tap login successful", credentialResponse);
      // Handle the successful login here
    },
    onError: () => {
      console.error("One Tap login failed");
      // Handle login errors here
    },
    // Additional configuration options can be provided here
    auto_select: true, // Automatically prompt the user if they have a single session
  });

  return (
    <div>
      {/* <button
        className="rounded-sm border bg-slate-500"
        id="one-tap-login-button"
        onClick={() => {
          console.log("One Tap login button clicked");
        }}
      >
        Sign in with Google One Tap
      </button> */}
      <SignIn />
    </div>
  );
}
