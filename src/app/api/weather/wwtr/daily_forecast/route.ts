// Daily forecast route
import type { Weather } from "../../../../../lib/wttrTypes";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json({ message: "Missing City param" }, { status: 400 });
  }

  const res = await fetch(`https://wttr.in/${city}?format=j1&lang=en`, {
    next: { revalidate: 900 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: Weather = (await res.json()) as Weather;

  return Response.json(data);
}

// export class Wttr {
//   private url = "https://wttr.in";

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   public async fetch(city?: string, params: { [key: string]: string } = {}): Promise<any> {
//     try {
//       const ps = paramString(params);
//       const fullUrl = this.url + "/" + (city ? city : "") + ps;
//       console.log(`send GET request: ${fullUrl}`);
//       const response = await fetch(fullUrl, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("response date header: ", response.headers.get("Date"));
//       const json = await toJsonOrError(response);
//       return json;
//     } catch (error: unknown) {
//       throw Error(getErrorMessage(error));
//     }
//   }

//   public async getWeather(city?: string, language?: string | undefined): Promise<Weather> {
//     // setting lang: "en" manipulate the e.g. kmph values
//     const params: Record<string, string> = {
//       format: "j1",
//     };
//     if (language && supportedLanguages.includes(language)) {
//       params.lang = language;
//     }
//     return (await this.fetch(city, params)) as Weather;
//   }
// }
