import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AnimatedSectionTitle.css';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSectionTitle = ({ text, animationType = 'fade' }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const chars = title.querySelectorAll('.char');

    switch (animationType) {
      case 'split':
        // Characters split from center
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            x: (i) => (i < chars.length / 2 ? -100 : 100),
            rotateY: 90
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: title,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        break;

      case 'bounce':
        // Characters bounce in from top
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: -100,
            scale: 0
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: title,
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        break;

      case 'wave':
        // Characters wave in with rotation
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 50,
            rotation: -45,
            scale: 0.5
          },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.04,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        break;

      default:
        // Simple fade
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: title,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === title) trigger.kill();
      });
    };
  }, [animationType]);

  const renderChars = () => {
    return text.split('').map((char, index) => (
      <span key={index} className="char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <h2 ref={titleRef} className={`animated-section-title ${animationType}`}>
      {animationType !== 'fade' ? renderChars() : text}
    </h2>
  );
};

export default AnimatedSectionTitle;
