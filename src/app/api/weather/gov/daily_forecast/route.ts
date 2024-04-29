export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const appid = searchParams.get("appid");
  const NUMBER_OF_DAYS = 10;

  if (!appid) {
    return Response.json(
      { message: "OpenWeather API key not found in environment variables" },
      { status: 401 },
    );
  }

  if (!lat || !lon) {
    return Response.json(
      { message: "Missing lat, or long param" },
      { status: 400 },
    );
  }
  // const res = await fetch(
  //   `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${NUMBER_OF_DAYS}&units=metric&appid=${appid}`,
  //   {
  //     next: { revalidate: 900 },
  //   },
  // );

    const LATITUDE = '40.730610';
    const LONGITUDE = '-73.935242';
  
    
      const response = await fetch(
        `https://api.weather.gov/points/${LATITUDE},${LONGITUDE}`
      ).then((res) => res.json());
  
      const forecast = await fetch(response.properties.forecast).then((res) =>
        res.json()
      );
  
      return {
        status: 200,
        props: {
          city: response.properties.relativeLocation.properties.city,
          date: new Date(forecast.properties.updated).toLocaleDateString(),
          time: new Date(forecast.properties.updated).toLocaleTimeString(),
          forecast: forecast.properties.periods
        }
      };
    

  





  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // const data: WeatherData = await res.json();

  return Response.json(data);
}
