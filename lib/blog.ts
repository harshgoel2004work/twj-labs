import { client } from "@/sanity/client";

export async function getPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      excerpt,
      category,
      "author": author->name,
      publishedAt,
      readTime,
      featured
    }
  `;
  return client.fetch(query);
}
