import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/client";
import Image from "next/image";

// Helper to create IDs from text (e.g., "My Header" -> "my-header")
export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full aspect-video my-8 rounded-xl overflow-hidden border border-white/10">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Blog Image"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children, value }: any) => {
      // Generate ID from the raw text content
      const id = slugify(value.children[0].text); 
      return (
        <h2 id={id} className="scroll-mt-32 text-3xl font-bold text-white mt-12 mb-6">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }: any) => {
      const id = slugify(value.children[0].text);
      return (
        <h3 id={id} className="scroll-mt-32 text-xl font-semibold text-indigo-200 mt-8 mb-4">
          {children}
        </h3>
      );
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-indigo-500 bg-white/5 p-6 rounded-r-lg text-indigo-100 italic my-8">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-slate-300 leading-relaxed mb-6 text-lg">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside text-slate-300 space-y-2 mb-8 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside text-slate-300 space-y-2 mb-8 ml-4">
        {children}
      </ol>
    ),
  },
};

export default function BlogContent({ content }: { content: any }) {
  return <PortableText value={content} components={components} />;
}