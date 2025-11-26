"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SparkleIcon, ArrowRight, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the shape of the data coming from Sanity
export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: string;
  category: string;
  author: string;
  publishedAt: string; // Formatted date string
  readTime: string;
  featured: boolean;
}

const CATEGORIES = ["All", "Design", "Development", "Business", "AI"];

const BlogClient = ({ posts }: { posts: SanityPost[] }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter Logic
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // Logic: If "All" is selected, find the featured post. 
  // If a specific category is selected, just show the list.
  const featuredPost = selectedCategory === "All" 
    ? filteredPosts.find((post) => post.featured) 
    : null;

  const gridPosts = featuredPost 
    ? filteredPosts.filter((post) => post._id !== featuredPost._id)
    : filteredPosts;

  return (
    <div className="min-h-screen bg-[#060609] text-white font-manrope selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/5 border border-white/10 backdrop-blur-md text-indigo-300 text-xs font-semibold uppercase tracking-widest shadow-sm mb-6"
          >
            <SparkleIcon size={14} className="fill-current" />
            Insights & News
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text py-2 text-transparent bg-gradient-to-b from-white to-white/50 mb-4"
          >
            The Digital <span className="text-indigo-500">Frontier.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl"
          >
            Thoughts, strategies, and tutorials on design, engineering, and growing your digital business.
          </motion.p>
        </div>

        {/* --- CATEGORY FILTER --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none",
                selectedCategory === cat
                  ? "text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              {selectedCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-[#5449e8] rounded-full shadow-[0_0_20px_rgba(84,73,232,0.4)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* --- CONTENT GRID --- */}
        <motion.div layout className="flex flex-col gap-12">
          
          {/* Featured Post (Only visible on 'All' or if included in filter) */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative w-full rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-indigo-500/30 transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Image Side */}
                <div className="relative h-[300px] lg:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-black" />
                  {featuredPost.mainImage && (
                    <Image 
                        src={featuredPost.mainImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white border border-white/10">
                    Featured
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4">
                    <span>{featuredPost.category}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-slate-500">{featuredPost.readTime}</span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-indigo-200 transition-colors">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-slate-400 text-lg mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold uppercase">
                        {featuredPost.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{featuredPost.author}</p>
                        <p className="text-xs text-slate-500">{featuredPost.publishedAt}</p>
                      </div>
                    </div>
                    
                    <Link href={`/blog/${featuredPost.slug}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300">
                      <ArrowRight size={18} className="text-white -rotate-45 group-hover:rotate-0 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Standard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {gridPosts.map((post, index) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {gridPosts.length === 0 && !featuredPost && (
            <div className="text-center py-20">
                <p className="text-slate-500">No posts found in this category.</p>
            </div>
          )}

        </motion.div>

      </div>
    </div>
  );
};

const BlogCard = ({ post, index }: { post: SanityPost; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex flex-col h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full bg-[#0b090d] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col">
          
          <div className="relative w-full aspect-[16/10] overflow-hidden">
             <div className="absolute inset-0 bg-gray-900" />
             {post.mainImage && (
                <Image 
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
             )}
             <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white">
                    {post.category}
                </span>
             </div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.publishedAt}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-indigo-300 transition-colors">
                {post.title}
            </h3>

            <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-grow">
                {post.excerpt}
            </p>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold uppercase">
                        {post.author.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-slate-300">{post.author}</span>
                </div>
                <span className="text-xs font-bold text-indigo-500 group-hover:underline">Read Article</span>
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
};

export default BlogClient;