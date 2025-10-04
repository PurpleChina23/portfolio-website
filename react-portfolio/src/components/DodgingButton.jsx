import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './DodgingButton.css';

const DodgingButton = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  const dodge = (mouseX, mouseY) => {
    if (!buttonRef.current || !containerRef.current) return;

    const button = buttonRef.current.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();

    const buttonCenterX = button.left + button.width / 2;
    const buttonCenterY = button.top + button.height / 2;

    const distance = Math.sqrt(
      Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
    );

    // If mouse is within 400px, dodge MUCH faster and more aggressively
    if (distance < 400) {
      setIsDodging(true);

      // Calculate dodge direction (away from mouse) with added randomness
      const angle = Math.atan2(buttonCenterY - mouseY, buttonCenterX - mouseX) + (Math.random() - 0.5) * 0.5;
      const dodgeDistance = 250;

      let newX = position.x + Math.cos(angle) * dodgeDistance;
      let newY = position.y + Math.sin(angle) * dodgeDistance;

      // Keep button within container bounds
      const maxX = (container.width - button.width) / 2;
      const maxY = (container.height - button.height) / 2;

      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));

      setPosition({ x: newX, y: newY });

      setTimeout(() => setIsDodging(false), 100);
    }
  };

  const handleClick = () => {
    alert('Clickety-click! You\'re awesome 👍');
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      dodge(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position]);

  return (
    <div ref={containerRef} className="dodging-button-container">
      <motion.button
        ref={buttonRef}
        className="dodging-button"
        onClick={handleClick}
        animate={{
          x: position.x,
          y: position.y,
          scale: isDodging ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1200,
          damping: 8
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Press Me
      </motion.button>
    </div>
  );
};

export default DodgingButton;
