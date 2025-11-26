import { ArrowUpRight, BarChart, BarChart3, CheckCircle, Eye, SearchIcon, TrendingUp,  Zap } from "lucide-react";
import { BiLineChartDown } from "react-icons/bi";

export const TextEditor = () => {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-xl  bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg w-[70%] h-[40vh]">
        <div className="bg-black/30 p-3 px-4 text-xs font-semibold text-white/50">
            Editor
        </div>
        <div className="grid grid-cols-4 h-full">
            <div className="col-span-1 w-full bg-black/40 h-full py-6 px-5 flex flex-col items-center space-y-4">
                <span className="w-full border border-white/5"></span>
                <span className="w-full border border-white/5"></span>
                <span className="w-full border border-white/5"></span>
            </div>

            <div className="pt-4 px-6 flex items-center justify-center w-full col-span-3">
                <div className="w-full h-full bg-white/5 p-5 px-6 flex flex-col space-y-4">
                    <span className="w-full border border-white/5"></span>
                    <span className="w-full border border-violet-500/30 p-1 flex items-center">
                        <span className="w-full border border-white/5"></span>
                    </span>
                    <span className="w-full border border-white/5"></span>
                    <span className="w-full border border-white/5"></span>
                    <span className="w-full border border-white/5"></span>
                    <span className="w-full border border-white/5"></span>
                </div>
            </div>
        </div>

    </div>
  );
};

export const AnalyticsCopywriting = () => {
    return (

        <div className='relative flex space-x-3 overflow-hidden rounded-xl items-center justify-between p-4 bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg w-[80%] '>
            <div className="flex items-center gap-3">
                <div className="text-[8px] flex flex-col items-center justify-center text-green-500/50 font-semibold">
                    <p className="text-green-500/50 text-xs font-semibold">97/100</p>
                    
                </div>
            <p className='text-white/40 font-manrope font-medium text-xs'>Content Health</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <CheckCircle size={20} className='text-green-500/50'/>
                    <p className='text-white/40 font-manrope font-medium text-xs'>Tone</p>
                </div>
                <div className="flex items-center gap-3">
                    <BarChart size={20} className='text-violet-500/50'/>
                    <p className='text-white/40 font-manrope font-medium text-xs'>CTR</p>
                </div>
            </div>



        </div>
    )
}