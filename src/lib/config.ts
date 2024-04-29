import type { Location } from "./types";

export const DEFAULT_LOCATION: Location = {
  city: "Elgin",
  coord: {
    lon: "-88.2826",
    lat: "42.0354",
  },
};

export const DEFAULT_SUGGESTIONS = [
  {
    description: "London, United Kingdom",
  },
  {
    description: "Paris, France",
  },
  {
    description: "Amsterdam, Netherlands",
  },
  {
    description: "Dublin, Ireland",
  },
  {
    description: "Lisbon, Portugal",
  },
];

export const OTHER_LARGE_CITIES = [
  {
    city: "Elgin",
    country: "United States",
    coord: {
      //   42.0354° N, 88.2826° W
      lat: 42.0354,
      lon: -88.2826,
    },
  },
  {
    city: "New York",
    country: "United States",
    coord: {
      lat: 40.7127753,
      lon: -74.0059728,
    },
  },
  {
    city: "Shanghai",
    country: "China",
    coord: {
      lat: 31.2222226,
      lon: 121.458069,
    },
  },
  {
    city: "Tokyo",
    country: "Japan",
    coord: {
      lat: 35.6764225,
      lon: 139.650027,
    },
  },
  {
    city: "Sydney",
    country: "Australia",
    coord: {
      lat: -33.8688197,
      lon: 151.2092955,
    },
  },
  {
    city: "São Paulo",
    country: "Brazil",
    coord: {
      lat: -23.5475493,
      lon: -46.6358888,
    },
  },
];
