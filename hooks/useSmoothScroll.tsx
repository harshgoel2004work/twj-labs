import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

/**
 * useSmoothScroll hook provides a performant, momentum-based smooth scroll.
 * It hijacks the native scroll on non-touch devices to provide a luxury feel.
 * 
 * @param ease The interpolation factor (0.01 - 0.2). Higher is snappier.
 */
export function useSmoothScroll(ease = 0.1) {
  const currentY = useRef(0);
  const targetY = useRef(0);
  const rafId = useRef<number>(0);
  const isAnimating = useRef(false);
  const pathname = usePathname();

  // Reset scroll on navigation
  useEffect(() => {
    currentY.current = 0;
    targetY.current = 0;
    isAnimating.current = false;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Disable on touch devices (native momentum is better there)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      document.documentElement.style.overflow = "";
      return;
    }

    // Lock native scroll on root
    document.documentElement.style.overflow = "hidden";

    const getMaxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const tick = () => {
      // If we're close enough, snap to target and stop loop
      const diff = targetY.current - currentY.current;
      if (Math.abs(diff) < 0.1) {
        currentY.current = targetY.current;
        window.scrollTo(0, currentY.current);
        isAnimating.current = false;
        return;
      }

      currentY.current = lerp(currentY.current, targetY.current, ease);
      window.scrollTo(0, currentY.current);
      rafId.current = requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      if (!isAnimating.current) {
        isAnimating.current = true;
        rafId.current = requestAnimationFrame(tick);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Control scroll speed/sensitivity
      const scrollMultiplier = 1.0; 
      targetY.current = Math.max(
        0,
        Math.min(
          targetY.current + (e.deltaY * scrollMultiplier),
          getMaxScroll()
        )
      );
      
      startAnimation();
    };

    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (anchor) {
        const hash = anchor.getAttribute('href');
        if (hash && hash !== '#') {
          const el = document.querySelector(hash);
          if (el) {
            e.preventDefault();
            const top = el.getBoundingClientRect().top + window.scrollY;
            targetY.current = Math.max(0, Math.min(top, getMaxScroll()));
            startAnimation();
          }
        }
      }
    };

    const onResize = () => {
      // Re-cap targetY if content became shorter
      targetY.current = Math.min(targetY.current, getMaxScroll());
      startAnimation();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    document.addEventListener("click", onAnchorClick);

    // Initial positioning
    currentY.current = window.scrollY;
    targetY.current = window.scrollY;

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onAnchorClick);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [ease, pathname]);
}