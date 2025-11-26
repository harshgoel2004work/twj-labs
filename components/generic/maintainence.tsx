import { ArrowUpRight, BarChart3, CheckCircle, SearchIcon, Zap } from "lucide-react";
import { BiLineChartDown } from "react-icons/bi";

export const SupportChat = () => {
  return (
    <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl p-4 bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg w-[70%]">
        <div className={`w-full h-full flex flex-col gap-4 `}>
            <div className="message flex items-start gap-2 ">
                <div className="bg-neutral-900 rounded-full w-8 font-medium text-white/60 flex items-center justify-center aspect-square text-xs">
                    A
                </div>

                <div className="bg-neutral-900 border border-white/10 p-2 rounded-lg w-[70%] text-xs font-medium text-white/70">
                    Hi i think our website is down, can you help me?
                </div>
            </div>

             <div className="message flex items-start gap-2 justify-end">
                <div className="bg-neutral-900 border border-white/10 p-2 rounded-lg w-[70%] text-xs font-medium text-white/70">
                    Sure! Let us check the server status for you.
                </div>

                <div className="bg-neutral-900 rounded-full w-8 font-medium text-white/60 flex items-center justify-center aspect-square text-xs">
                    T
                </div>
            </div>

            <div className="message flex items-start gap-2 ">
                <div className="bg-neutral-900 rounded-full w-8 font-medium text-white/60 flex items-center justify-center aspect-square text-xs">
                    A
                </div>

                <div className="bg-neutral-900 border border-white/10 p-2 rounded-lg w-[70%] text-xs font-medium text-white/70">
                    Thank you so much for your help!
                </div>
            </div>

        </div>
    </div>
  );
};

export const MaintainenceDueDate = () => {
    return (
        <div className='relative flex items-center space-x-3 overflow-hidden rounded-xl p-4 bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg w-[80%] '>
            <BiLineChartDown className="text-red-500"/>
            <p className='text-white/40 font-manrope font-medium text-sm'>Your Website is facing server issues</p>
        </div>
    )
}