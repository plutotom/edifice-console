export const getWttrData = async (city: string) => {
  const httpsOrNot = process?.env?.VERCEL_URL?.includes("localhost")
    ? "http"
    : "https" || "http";

  const data = await fetch(
    `${httpsOrNot}://${process.env.VERCEL_URL}/api/weather/daily_forecast?city=${city}`,
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }

  return data.json();
};
