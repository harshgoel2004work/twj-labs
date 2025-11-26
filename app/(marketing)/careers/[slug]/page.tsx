import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import JobPostClient, { JobPostDetails } from "@/components/careers/job-post-client";

// 2. Fetch Data Function
async function getJob(slug: string): Promise<JobPostDetails | null> {
    // 1. Define GROQ Query for Single Job
const query = `
  *[_type == "jobPost" && slug.current == '${slug}'][0] {
    _id,
    title,
    department,
    location,
    remote,
    jobType,
    experienceLevel,
    salaryRange,
    postedAt,
    description,
    responsibilities,
    qualifications,
    benefits,
    applyEmail,
    applyUrl
  }
`;
  return client.fetch(query, { slug });
}


// 3. Page Component
export default async function JobDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
  const job = await getJob(slug);

  if (!job) {
    return notFound();
  }

  // Format date for display
  const formattedJob = {
    ...job,
    postedAt: new Date(job.postedAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };

  return <JobPostClient job={formattedJob} />;
}

// 4. (Optional) SSG Static Params for faster build
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "jobPost"]{ "slug": slug.current }`);
  return slugs.map((s: any) => ({ slug: s.slug }));
}