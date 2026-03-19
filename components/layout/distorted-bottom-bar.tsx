import React, { useState, useEffect } from 'react';

const ProgressiveBlurBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate if we are at the bottom of the page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Buffer of 20px so it starts vanishing just before the absolute end
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 20;
      setIsVisible(!isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const layers = [
    { blur: '1px', mask: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,  rgba(0,0,0,1) 10%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 40%)' },
    { blur: '2px', mask: 'linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 50%)' },
    { blur: '4px', mask: 'linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 35%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 65%)' },
    { blur: '8px', mask: 'linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 78%)' },
    { blur: '16px', mask: 'linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 95%)' },
    { blur: '32px', mask: 'linear-gradient(to bottom, rgba(0,0,0,0) 72%, rgba(0,0,0,1) 88%)' },
    { blur: '48px', mask: 'linear-gradient(to bottom, rgba(0,0,0,0) 84%, rgba(0,0,0,1) 100%)' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        pointerEvents: 'none',
        zIndex: 50,
        // Smooth transition for the vanishing act
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: `blur(${layer.blur})`,
            WebkitBackdropFilter: `blur(${layer.blur})`,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask,
          }}
        />
      ))}
    </div>
  );
};

export default ProgressiveBlurBar;