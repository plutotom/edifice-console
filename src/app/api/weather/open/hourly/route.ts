export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const appid = searchParams.get("appid");
  const HOURS = 23;

  if (!appid) {
    return Response.json(
      { message: "OpenWeather API key not found in environment variables" },
      { status: 401 },
    );
  }
  if (!lat || !lon) {
    return Response.json({ message: "Missing parameters" }, { status: 400 });
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&cnt=${HOURS}&units=imperial&appid=${appid}`;
  return Response.json({ lat, lon, appid, HOURS, searchParams, url });

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&cnt=${HOURS}&units=imperial&appid=${appid}`,
    {
      next: { revalidate: 900 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: any = await res.json();

  return Response.json(data);
}
