"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Database } from "lucide-react";


import { BsWordpress } from "react-icons/bs";
import { FaWebflow, FaShopify } from "react-icons/fa6";
import { Code } from "lucide-react";

export const MIGRATION_PAIRS = [
  {
    from: <BsWordpress size={30} className="opacity-50" />,
    to: <FaWebflow size={30} className="opacity-50" />,
  },
  {
    from: <FaWebflow size={30} className="opacity-50" />,
    to: <FaShopify size={30} className="opacity-50" />,
  },
  {
    from: <FaShopify size={30} className="opacity-50" />,
    to: <Code size={30} className="opacity-50" />,
  },
];



export const Migration = () => {
  const [index, setIndex] = React.useState(0);

  // change pair every X seconds
  const duration = 7000; // 6 seconds per pair
  const isLastPair = index === MIGRATION_PAIRS.length - 1;

  React.useEffect(() => {
    if (isLastPair) {
  const timer = setTimeout(() => {
    setIndex(0);     // go back to first pair
  }, duration);
  return () => clearTimeout(timer);
}

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, duration);

    return () => clearTimeout(timer);
  }, [index, isLastPair]);

  const { from, to } = MIGRATION_PAIRS[index];

  return (
    <div className="flex flex-col gap-6 h-full w-[80%] items-center">
      {/* --- TRANSFER VISUAL --- */}
      <div className="relative w-[80%] h-[20vh] flex items-center justify-between">

        {/* LEFT ICON */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`from-${index}`}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="bg-white/2 backdrop-blur-lg p-3 rounded-full border border-white/5"
          >
            {from}
          </motion.div>
        </AnimatePresence>

        {/* TRANSFER LINE */}
        <div className="h-[1px] w-full bg-white/10 relative flex items-center justify-center"> <div className="h-[1px] w-[10%] bg-linear-to-r from-transparent via-violet-500 to-transparent absolute left-0 data-transfer"> </div> </div>

        {/* RIGHT ICON */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`to-${index}`}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="bg-white/2 backdrop-blur-lg p-3 rounded-full border border-white/5"
          >
            {to}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- STATUS BOX --- */}
      <div className="bg-green-500/5 px-5 py-3 w-fit rounded-lg border border-green-500/20 flex flex-col space-y-4">
        <p className="flex items-center gap-2 text-xs text-green-600">
          <Database size={16} />
          {isLastPair
            ? "Final migration step completed."
            : "Processing migration step..."}
        </p>
      </div>
    </div>
  );
};


// export const Migration = () => {
//   return (
//    <div className="flex flex-col gap-6 h-full w-[80%] items-center">
//     <div className="relative w-[80%] h-[20vh] flex items-center justify-between">
//         <div className=" bg-white/2 backdrop-blur-lg p-3 rounded-full border border-white/5">
//             <BsWordpress size={30} className="opacity-50"/>
//         </div>
//         <div className="h-[1px] w-full bg-white/10 relative flex items-center justify-center">
//             <div className="h-[1px] w-[10%] bg-linear-to-r from-transparent via-violet-500 to-transparent absolute left-0 data-transfer">
                
//             </div>
//         </div>
//         <div className=" right-0 bg-white/2 backdrop-blur-lg p-3 rounded-full border border-white/5">
//             <FaWebflow size={30} className="opacity-50"/>
//         </div>
//     </div>
//         <div className="bg-green-500/5 px-5 py-3 w-fit rounded-lg border border-green-500/20 flex flex-col space-y-4">
//             <p className="flex items-center gap-2 text-xs text-green-600"><Database size={16}/>Integration with database successful.</p>

//         </div>
//    </div>
//   );
// };

