import React, { memo, useState } from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out', // Smoother fade-in
        pointerEvents: 'auto', // Enable mouse interaction
      }}
    >
      <Spline
        scene="https://prod.spline.design/nwqSHGDJS4TmXFZt/scene.splinecode"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

// Use React.memo for performance optimization
export default memo(SplineBackground);