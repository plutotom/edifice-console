"use client";
import {
  hasGrantedAnyScopeGoogle,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";

import React from "react";
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

function SignIn() {
  const handleLoginSuccess = (tokens) => {
    console.log(tokens);
    const hasAccess = hasGrantedAnyScopeGoogle(
      tokens,
      "https://www.googleapis.com/auth/calendar.readonly",
    );

    if (!hasAccess) {
      console.error("User has not granted the required scopes");

      return;
    }

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
      <SignIn />
    </div>
  );
}

export { OneTapLogin, SignIn };
