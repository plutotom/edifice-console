// pages/api/auth/google.ts
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request, res: Response) {
  if (req.method === "POST") {
    const { code } = req.body as { code: string };
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
    const client_secret = process.env.GOOGLE_CALENDAR_SECRET ?? "";
    const redirect_uri = process.env.REDIRECT_URI ?? "localhost:3000";
    const grant_type = "authorization_code";

    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id,
          client_secret,
          redirect_uri,
          grant_type,
        }),
      });

      const tokens = await response.json();
      console.log(tokens);

      // Send the tokens back to the frontend, or store them securely and create a session
      res.status(200).json(tokens);
    } catch (error) {
      // Handle errors in the token exchange
      console.error("Token exchange error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
