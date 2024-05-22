// Daily forecast route
import type { Weather } from "../../../../lib/wttrTypes";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json({ message: "Missing City param" }, { status: 400 });
  }
  console.log(city);
  console.log("url" + request.url);
  console.log("url" + `https://wttr.in/${city}?format=j1&lang=en`);

  const res = await fetch(`https://wttr.in/${city}?format=j1&lang=en`, {
    next: { revalidate: 900 },
  });

  console.log("res in apit route");
  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch data in daily_forecast route");
  }

  const data: Weather = (await res.json()) as Weather;

  return Response.json(data);
}
