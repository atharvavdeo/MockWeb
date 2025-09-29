import { useState, useEffect } from 'react';

export const useScrollVisibility = (threshold = 100) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const footerElement = document.querySelector('footer');
      
      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        const footerTop = footerRect.top;
        const windowHeight = window.innerHeight;
        
        // Start fading when footer is 100px from entering the viewport
        if (footerTop - windowHeight < threshold) {
          const opacity = Math.max(0, (footerTop - windowHeight + threshold) / threshold);
          setIsVisible(opacity > 0);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
};