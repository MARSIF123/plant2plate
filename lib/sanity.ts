import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-26", // use current date
  useCdn: false, // true for caching, false for fresh data
  token: process.env.SANITY_API_TOKEN, // required for mutations
});
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source).url();
}
