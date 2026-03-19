'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// The sweeping blob overlay
const SweepOverlay = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ x: '-120%', y: '80%', rotate: -15 }}
          animate={{ x: '-5%',   y: '-5%',  rotate: -15 }}
          exit={{    x: '110%',  y: '-90%', rotate: -15 }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1], // custom expo-like
          }}
          style={{
            position: 'absolute',
            width: '130vw',
            height: '130vh',
            background: '#080808',
            borderRadius: '60% 40% 50% 50% / 40% 50% 50% 60%',
            filter: 'blur(40px)',
            willChange: 'transform',
          }}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sweeping, setSweeping] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const pendingChildren = useRef(children);

  useEffect(() => {
    pendingChildren.current = children;
    setSweeping(true);

    // Swap page content at peak (mid-transition)
    const swap = setTimeout(() => {
      setDisplayChildren(pendingChildren.current);
    }, 700); // matches first half duration

    const done = setTimeout(() => {
      setSweeping(false);
    }, 1400); // full duration

    return () => { clearTimeout(swap); clearTimeout(done); };
  }, [pathname]);

  return (
    <>
      {displayChildren}
      <SweepOverlay isVisible={sweeping} />
    </>
  );
}