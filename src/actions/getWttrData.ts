export const getWttrData = async (city: string) => {
  const httpsOrNot = process?.env?.VERCEL_URL?.includes("localhost")
    ? "http"
    : "https";
  let data;
  try {
    data = await fetch(
      `${httpsOrNot}://${process.env.VERCEL_URL}/api/weather/wwtr?city=${city}`,
    );
    console.log("data from api route");
    console.log(data);
  } catch (error) {
    console.log("error in getWttrData");
    console.log("data from api route");
    console.log(data);
  }

  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }

  if (!data) {
    throw new Error("No data returned");
  } else return data.json();
};
