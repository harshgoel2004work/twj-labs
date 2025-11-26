"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Calendar, Clock, ChevronLeft, Link as LinkIcon, 
  Twitter, Linkedin, Facebook, SparkleIcon, 
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import BlogContent from "@/components/blog/blog-content";
import { IconType } from "react-icons";

// Define Props Interface
interface ArticleClientProps {
  post: {
    title: string;
    subtitle?: string;
    author: { name: string; role: string; image?: string; bio?: string | null; social?: string | null };
    date: string;
    readTime: string;
    category: string;
    mainImage: string;
    body: any; // Portable Text
    headings: { title: string; id: string }[]; // Extracted TOC
  };
}

const ArticleClient = ({ post }: ArticleClientProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState("");

  // Setup Intersection Observer for TOC highlighting
  useEffect(() => {
    console.log(post)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    post.headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [post.headings]);

  return (
    <div className="min-h-screen bg-[#060609] text-white font-manrope selection:bg-indigo-500/30 relative">
      
      {/* --- READING PROGRESS BAR --- */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-24 relative z-10">
        
        {/* --- BREADCRUMB --- */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-12 group">
          <ChevronLeft size={16} className="group-hover:-tranneutral-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* --- HERO SECTION --- */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6">
            <SparkleIcon size={12} className="fill-current" />
            {post.category}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
            {post.title}
          </h1>
          
          {post.subtitle && (
            <p className="text-lg text-neutral-400 leading-relaxed max-w-3xl mb-8">
              {post.subtitle}
            </p>
          )}

          {/* Meta Data */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-400 border-y border-white/5 py-4 w-full md:w-auto px-8 rounded-full">
            <div className="flex items-center gap-2">
              {post.author.image ? (
                 <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image src={post.author.image} alt={post.author.name} fill className="object-cover" />
                 </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {post.author.name.charAt(0)}
                </div>
              )}
              <span className="text-white">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* --- FEATURED IMAGE --- */}
        {post?.mainImage && (
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-20 border border-white/10 shadow-2xl shadow-indigo-500/10">
                <div className="absolute inset-0 bg-gray-900 z-0" />
                <Image 
                    src={post.mainImage || ""} 
                    alt={post.title}
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-transparent to-transparent opacity-60" />
            </div>
        )}

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Socials (Sticky) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center gap-6 sticky top-32 h-fit">
             <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 vertical-text rotate-180" style={{ writingMode: 'vertical-rl' }}>Share</p>
             <div className="w-px h-12 bg-white/10" />
             <SocialButton icon={Twitter} type="twitter"/>
             <SocialButton icon={Linkedin} type="linkedin"/>
             <SocialButton icon={Facebook} type="facebook"/>
             <SocialButton icon={LinkIcon} type="copy"/>
          </div>

          {/* CENTER: Article Content */}
          <div className="lg:col-span-8">
            
            {/* Portable Text Renderer */}
            <BlogContent content={post.body} />

            {/* Article Footer / Tags */}
            <div className="mt-16 pt-8 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                    {["Design", "UX", "Tech"].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-400 hover:text-white hover:border-white/20 transition-colors cursor-pointer">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Author Box */}
            <div className="mt-12 p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                <div className="w-20 h-20 shrink-0 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/20 overflow-hidden relative">
                    {post.author.image ? (
                        <Image src={post.author.image} alt={post.author.name} fill className="object-cover" />
                    ) : (
                        post.author.name.charAt(0)
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{post.author.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">{post.author.role}</p>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        {post.author.bio || "This author has not added a bio yet."}
                    </p>
                    <Link href={post.author.social || "#"} className="text-indigo-400 text-sm leading-relaxed hover:underline mt-3 inline-block" target="_blank" rel="noopener noreferrer">
                        Visit Profile
                    </Link>
                </div>
            </div>
          </div>

          {/* RIGHT: Table of Contents (Sticky) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
               <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Table of Contents</h4>
               <nav className="flex flex-col gap-4">
                  {post.headings.map((item) => (
                      <a 
                        key={item.id} 
                        href={`#${item.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                            setActiveSection(item.id);
                        }} 
                        className={cn(
                            "text-sm transition-all duration-300 border-l-2 pl-4 py-1 block hover:text-white",
                            activeSection === item.id 
                                ? "border-indigo-500 text-indigo-400 font-medium" 
                                : "border-white/5 text-neutral-500"
                        )}
                      >
                          {item.title}
                      </a>
                  ))}
               </nav>

               
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

function SocialButton({ icon: Icon, type }:{ icon: LucideIcon | IconType; type?: "twitter" | "linkedin" | "facebook" | "copy" }) {
  const [copied, setCopied] = useState(false);

  const share = () => {
    const url = window.location.href;

    switch (type) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;

      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;

      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;

      case "copy":
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
        break;

      default:
        break;
    }
  };

  return (
    <button
      onClick={share}
      className="p-3 hover:bg-white/10 rounded-full cursor-pointer transition-all"
      title={copied ? "Copied!" : "Share"}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

export default ArticleClient;