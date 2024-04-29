export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) => {
  const http = process.env.VERCEL_URL.includes("localhost") ? "http" : "https";

  console.log(
    `https://${process.env.VERCEL_URL}/api/weather/hourly?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`,
  );

  const data = await fetch(
    `${http}://${process.env.VERCEL_URL}/api/weather/hourly?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`,
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data Get Hourly Data");
  }

  return data.json();
};
