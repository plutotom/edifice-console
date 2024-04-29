export interface Hourly {
  DewPointC: string;
  DewPointF: string;
  FeelsLikeC: string;
  FeelsLikeF: string;
  HeatIndexC: string;
  HeatIndexF: string;
  WindChillC: string;
  WindChillF: string;
  WindGustKmph: string;
  WindGustMiles: string;
  chanceoffog: string;
  chanceoffrost: string;
  chanceofhightemp: string;
  chanceofovercast: string;
  chanceofrain: string;
  chanceofremdry: string;
  chanceofsnow: string;
  chanceofsunshine: string;
  chanceofthunder: string;
  chanceofwindy: string;
  cloudcover: string;
  humidity: string;
  precipInches: string;
  precipMM: string;
  pressure: string;
  pressureInches: string;
  tempC: string;
  tempF: string;
  time: string;
  uvIndex: string;
  visibility: string;
  visibilityMiles: string;
  weatherCode: string;
  weatherDesc: Array<WeatherDesc>;
  winddir16Point: string;
  winddirDegree: string;
  windspeedKmph: string;
  windspeedMiles: string;
}

export interface WeatherDesc {
  value: string;
}

export interface WeatherConditions {
  humidity: string;
  temp_C: string;
  temp_F: string;
  pressure: string;
  pressureInches: string;
  cloudcover: string;
  FeelsLikeC: string;
  FeelsLikeF: string;
  uvIndex: string;
  visibility: string;
  visibilityMiles: string;
  weatherCode: string;
  weatherDesc: Array<WeatherDesc>;
  winddir16Point: string;
  winddirDegree: string;
  windspeedKmph: string;
  windspeedMiles: string;
  localObsDateTime?: string;
  precipMM?: string;
  precipInches?: string;
}

export interface AreaName {
  value: string;
}

export interface CountryName {
  value: string;
}

export interface RegionName {
  value: string;
}

export interface Area {
  areaName: Array<AreaName>;
  country: Array<CountryName>;
  region: Array<RegionName>;
  latitude: string | undefined;
  longitude: string | undefined;
  population: string | undefined;
}

export interface Astronomy {
  moon_illumination?: string;
  moon_phase?: string;
  moonrise?: string;
  moonset?: string;
  sunrise?: string;
  sunset?: string;
}

export interface WeatherData {
  avgtempC: string;
  avgtempF: string;
  mintempC: string;
  mintempF: string;
  maxtempC: string;
  maxtempF: string;
  sunHour: string;
  totalSnow_cm?: string;
  uvIndex: string;
  date: string;
  hourly: Array<Hourly>;
  astronomy?: Astronomy[];
}

export interface Weather {
  current_condition: Array<WeatherConditions>;
  nearest_area: Array<Area>;
  weather: Array<WeatherData>;
}
