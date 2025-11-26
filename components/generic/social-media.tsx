import { ArrowUpRight, BarChart3, CheckCircle, SearchIcon, TrendingUp, Zap } from "lucide-react";

export const SocialMediaPost = () => {
  return (
    <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl p-0 bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg w-[70%]">
      
      <div className="w-full p-3 bg-black/30 flex items-center gap-3">
        <div className="bg-neutral-800 rounded-full w-8 font-medium text-white/60 flex items-center justify-center aspect-square text-xs">
            A
        </div>
        <p className="font-medium text-sm text-white/60">Lutune Ai</p>
      </div>

      <div className="min-h-[35vh] flex flex-col items-center justify-center">
        <p className="text-center max-w-[80%] text-2xl font-semibold text-white/10 -translate-y-2">Building something amazing with Lutune AI</p>
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