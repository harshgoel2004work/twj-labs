import CareersClient from "@/components/careers/careers-client";
import { client } from "@/sanity/client";


export const revalidate = 120; // ISR: Revalidate data every 120 seconds

// Define the GROQ query based on your schema
// We order by featured first, then by date posted
const query = `
  *[_type == "jobPost"] | order(featured desc, postedAt desc) {
    _id,
    title,
    "slug": slug.current,
    department,
    location,
    remote,
    jobType,
    experienceLevel,
    featured
  }
`;

export default async function CareersPage() {
  const jobs = await client.fetch(query);

  return <CareersClient jobs={jobs} />;
}