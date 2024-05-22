export const getWttrData = async (city: string) => {
  const httpsOrNot = process?.env?.VERCEL_URL?.includes("localhost")
    ? "http"
    : "https" || "http";

  console.log(
    "Using" +
      httpsOrNot +
      "://" +
      process.env.VERCEL_URL +
      "/api/weather/wwtr?city=" +
      city,
  );

  const data = await fetch(
    `${httpsOrNot}://${process.env.VERCEL_URL}/api/weather/wwtr?city=${city}`,
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  // console.log("Called action here" + new Date().toLocaleTimeString());
  return data.json();
};
