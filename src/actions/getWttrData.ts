export const getWttrData = async (city: string) => {
  const httpsOrNot = process?.env?.VERCEL_URL?.includes("localhost")
    ? "http"
    : "https";

  const data = await fetch(
    `${httpsOrNot}://${process.env.VERCEL_URL}/api/weather/wwtr?city=${city}`,
  );
  console.log("data from api route");
  console.log(data);
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  // console.log("Called action here" + new Date().toLocaleTimeString());
  return data.json();
};
