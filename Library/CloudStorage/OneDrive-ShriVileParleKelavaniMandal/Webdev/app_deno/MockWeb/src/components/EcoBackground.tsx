import React, { useEffect, useRef } from 'react';
import './EcoBackground.css';

// Add a prop to control the animation style
interface EcoBackgroundProps {
  animationMode?: 'scroll' | 'pulsate';
}

const EcoBackground: React.FC<EcoBackgroundProps> = ({ animationMode = 'scroll' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const currentProgress = useRef(0);

  useEffect(() => {
    // If mode is 'pulsate', we don't need the scroll listener
    if (animationMode === 'pulsate') {
        if (containerRef.current) {
            containerRef.current.classList.add('pulsate-animation');
        }
        return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreference = () => {
      if (mediaQuery.matches) {
        if (containerRef.current) {
          containerRef.current.style.setProperty('--progress', '1');
        }
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      } else {
        if (!animationFrameId.current) {
          updateProgress();
        }
      }
    };

    const updateProgress = () => {
      if (mediaQuery.matches) return;

      const targetProgress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));

      const dampingFactor = Math.abs(targetProgress - currentProgress.current) > 0.1 ? 0.2 : 0.1;
      currentProgress.current += (targetProgress - currentProgress.current) * dampingFactor;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--progress', currentProgress.current.toFixed(3));
      }

      animationFrameId.current = requestAnimationFrame(updateProgress);
    };

    handleMotionPreference();
    if (!mediaQuery.matches) {
      updateProgress();
    }

    mediaQuery.addEventListener('change', handleMotionPreference);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      mediaQuery.removeEventListener('change', handleMotionPreference);
    };

  }, [animationMode]); // Add animationMode to the dependency array

  return (
    <div
      ref={containerRef}
      className="eco-background"
      style={{ '--progress': 0 } as React.CSSProperties}
    >
      <div className="halo"></div>
      <div className="blob-stack absolute inset-0">
        <div className="blob primary-blob"></div>
        <div className="blob secondary-blob"></div>
        <div className="blob tertiary-blob"></div>
      </div>
      <div className="grain-overlay">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="grain-filter" x="0" y="0" width="100%" height="100%">
              <feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" type="fractalNoise" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0.06" />
              </feComponentTransfer>
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#grain-filter)" />
        </svg>
      </div>
      <div className="vignette"></div>
    </div>
  );
};

export default EcoBackground;