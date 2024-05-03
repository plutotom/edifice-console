"use client";
import type { ForecastData } from "../../lib/types";

const WeatherForecast = ({
  weatherForecast,
}: {
  weatherForecast: ForecastData;
}) => {
  console.log(weatherForecast);
  return (
    <>
      <div className="card card-weather-forecast">
        <div className="forecastDay">
          {/* <h3>{weatherForecast.today.day}</h3>
          <FontAwesomeIcon icon={weatherForecast.today.icon} /> */}
          <p>
            {/* {weatherForecast.today.description.length > 20
              ? // gets the first two elements based on the " " then joins them (sense they are an array) with a space
                weatherForecast.today.description.split(" ", 2).join(" ")
              : // ? weatherForecast.today.description.slice(0, 20)
                weatherForecast.today.description} */}
          </p>

          <p>
            <span className="border-thin" style={{ textDecoration: "none" }}>
              {/* {weatherForecast?.today?.temp?.high} */}
            </span>
            {"/"}
            <span className="border-thin" style={{ textDecoration: "none" }}>
              {/* {weatherForecast?.today?.temp?.low} */}
            </span>
          </p>
        </div>
        <div className="forecastDay">
          {/* <h3>{weatherForecast.tomorrow.day}</h3>
          <FontAwesomeIcon icon={weatherForecast.tomorrow.icon} /> */}
          <p>
            {/* {weatherForecast.tomorrow.description.length > 20
              ? // gets the first two elements based on the " " then joins them (sense they are an array) with a space
                weatherForecast.tomorrow.description.split(" ", 2).join(" ")
              : // ? weatherForecast.today.description.slice(0, 20)
                weatherForecast.tomorrow.description} */}
          </p>
          <p>
            <span className="border-thin" style={{ textDecoration: "none" }}>
              {/* {weatherForecast.tomorrow.temp.high} */}
            </span>
            {"/"}
            <span className="border-thin" style={{ textDecoration: "none" }}>
              {/* {weatherForecast.tomorrow.temp.low} */}
            </span>
          </p>
        </div>
        <div className="forecastDay">
          {/* <h3>{weatherForecast.dayAfterTomorrow.day}</h3> */}
          {/* <FontAwesomeIcon icon={weatherForecast.dayAfterTomorrow.icon} /> */}
          <p>
            {/* {weatherForecast.dayAfterTomorrow.description.length > 20
              ? // gets the first two elements based on the " " then joins them (sense they are an array) with a space
                weatherForecast.dayAfterTomorrow.description
                  .split(" ", 2)
                  .join(" ")
              : // ? weatherForecast.dayAfterTomorrow.description.slice(0, 20)
                weatherForecast.dayAfterTomorrow.description} */}
          </p>
          <p>
            <span className="border-thin" style={{ textDecoration: "none" }}>
              {/* {weatherForecast.dayAfterTomorrow.temp.high || "Na"} */}
            </span>
            {"/"}
            <span className="border-thin" style={{ textDecoration: "none" }}>
              {/* {weatherForecast.dayAfterTomorrow.temp.low} */}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
export default WeatherForecast;
