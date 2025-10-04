import { useEffect, useState, useRef } from 'react';
import './SlideInText.css';

const SlideInText = ({ text = "Michael" }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Get the contact section (Get In Touch)
      const contactSection = document.querySelector('#contact');
      if (!contactSection) return;

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const contactRect = contactSection.getBoundingClientRect();
      const contactBottom = contactRect.bottom + scrollTop;
      const viewportHeight = window.innerHeight;

      // Check if user has scrolled past the contact section
      const scrolledPastContact = scrollTop + viewportHeight > contactBottom;

      if (scrolledPastContact) {
        // Calculate how far past the contact section we've scrolled
        const distancePastContact = (scrollTop + viewportHeight) - contactBottom;
        const animationTriggerDistance = 300; // Start animating after 300px past contact

        // Calculate progress (0 to 1) based on distance scrolled past contact
        const progress = Math.min(1, distancePastContact / animationTriggerDistance);
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
