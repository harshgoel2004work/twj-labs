import React, { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>, // Changed to HTMLElement to be more generic than HTMLDivElement
  callback: (event: MouseEvent | TouchEvent) => void // Fixed: Specific function signature
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Type check: Ensure target is actually a Node (HTML element)
      const target = event.target as Node;

      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};