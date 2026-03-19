import { client } from "@/sanity/client"; // Adjust path to your sanity client
import BlogClient from "@/components/blog/blog-client";

// 1. Helper to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

import { getPosts } from "@/lib/blog";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function BlogPage() {
  const rawPosts = await getPosts();

  // 3. Transform data if necessary (e.g. format dates)
  const posts = rawPosts.map((post: any) => ({
    ...post,
    publishedAt: formatDate(post.publishedAt),
    // If you didn't get the URL in GROQ, use urlFor here:
    // mainImage: urlFor(post.mainImage).url() 
  }));

  return <BlogClient posts={posts} />;
}