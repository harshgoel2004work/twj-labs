import {   } from "lucide-react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, TrendingUp } from 'lucide-react';

export const SocialMediaPost = () => {
  return (
    <div className="relative flex flex-col w-full h-[60vh] max-w-md overflow-hidden rounded-xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl">
      
      {/* --- Header --- */}
      <div className="w-full p-3 bg-black/20 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-full w-8 h-8 flex items-center justify-center border border-white/10">
            <span className="text-xs font-medium text-white/70">L</span>
          </div>
          <div className="flex flex-col">
             <p className="font-semibold text-sm text-white/90">Lutune Ai</p>
             <p className="text-[10px] text-white/40">Original Audio</p>
          </div>
        </div>
        <button className="text-white/60 hover:text-white transition-colors">
            <MoreHorizontal size={20} />
        </button>
      </div>

      {/* --- Main Content (Image Placeholder) --- */}
      <div className="h-full bg-black/40">
        <div className="w-full h-full bg-gradient-to-tr from-neutral-900 via-neutral-900 to-neutral-950 flex items-center justify-center">
            <p className="text-white/30 italic">Image/Video Content</p>
        </div>  
      </div>

      {/* --- Footer / Actions --- */}
      <div className="p-4 flex flex-col gap-3">
        
        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-white/80 hover:text-red-500 transition-colors">
                <Heart size={24} />
            </button>
            <button className="text-white/80 hover:text-blue-400 transition-colors">
                <MessageCircle size={24} />
            </button>
            {/* <button className="text-white/80 hover:text-green-400 transition-colors">
                <Send size={24} className="-rotate-45 mb-1" />
            </button> */}
          </div>
          <button className="text-white/80 hover:text-yellow-400 transition-colors">
            <Bookmark size={24} />
          </button>
        </div>

        {/* Likes Count */}
        <div className="flex items-center gap-2 text-sm text-white/90 font-semibold">
            <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                    <div key={i} className={`w-4 h-4 rounded-full border border-black bg-neutral-${i * 100 + 600}`} />
                ))}
            </div>
            <p>Liked by <span className="text-white">user_one</span> and <span className="text-white">others</span></p>
        </div>

        {/* Caption */}
        <div className="space-y-1">
            <p className="text-sm text-white/80 leading-snug">
                <span className="font-semibold text-white mr-2">Lutune Ai</span>
                We are crafting the future of interaction. Stay tuned for the reveal. <span className="text-blue-400">#design #ui #glassmorphism</span>
            </p>
            <p className="text-xs text-white/40 uppercase tracking-wide pt-1">2 hours ago</p>
        </div>

      </div>
      
    </div>
  );
};

export const SocialMediaAnalytics = () => {
    return (
        <div className='relative flex space-x-3 overflow-hidden rounded-xl items-center justify-between p-4 bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg w-[80%] '>
            <div className="flex items-center gap-3">
                <div className="text-[8px] flex flex-col items-center justify-center text-green-500/50 font-semibold">
                <TrendingUp size={20} className=''/>
                10%
            </div>
            <p className='text-white/40 font-manrope font-medium text-xs'>Engagement Rate</p>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-[8px] flex flex-col items-center justify-center text-green-500/50 font-semibold">
                <TrendingUp size={20} className=''/>
                8%
            </div>
            <p className='text-white/40 font-manrope font-medium text-xs'>Reach</p>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-[8px] flex flex-col items-center justify-center text-green-500/50 font-semibold">
                <TrendingUp size={20} className=''/>
                10.2K
            </div>
            <p className='text-white/40 font-manrope font-medium text-xs'>Followers</p>
            </div>


        </div>
    )
}