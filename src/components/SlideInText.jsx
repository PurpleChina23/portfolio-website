import { useEffect, useState, useRef } from 'react';
import './SlideInText.css';

const SlideInText = ({ text = "Michael" }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled near bottom
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      // Start animation when within 500px of bottom
      if (distanceFromBottom < 500) {
        // Calculate progress (0 to 1) based on scroll position
        const progress = Math.min(1, (500 - distanceFromBottom) / 500);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="slide-in-text-container" ref={containerRef}>
      <div className="slide-in-text">
        {text.split('').map((char, index) => {
          // Calculate individual letter progress with stagger
          const letterDelay = index * 0.08;
          const letterProgress = Math.max(0, Math.min(1, (scrollProgress - letterDelay) * 3));

          return (
            <span
              key={index}
              className="slide-in-letter"
              style={{
                transform: `translateX(${(1 - letterProgress) * 100}vw)`,
                opacity: letterProgress
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SlideInText;
