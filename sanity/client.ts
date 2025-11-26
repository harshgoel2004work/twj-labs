// lib/sanity/client.ts
import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // Set to true for production for faster response
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}