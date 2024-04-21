import "server-only";
// import { db } from "./db";

//? then you can just import this, and then call getImages() in your component

// export async function getImages() {
//   const user = auth(); // auth comes from clerk if we where using it.

//   if (!user) {
//     throw new Error("Not logged in");
//   }

//   const images = await db.query.images.findMany({
//     where: {
//       userId: user.id,
//     },
//     orderBy: {
//       id: "asc",
//     },
//   });
//   return images;
// }
