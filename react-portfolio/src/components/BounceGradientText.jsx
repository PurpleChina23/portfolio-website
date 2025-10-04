import { motion } from 'framer-motion';
import './BounceGradientText.css';

export const BounceGradientText = ({ children, delay = 0 }) => {
  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: delay + i * 0.05,
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    })
  };

  const letters = children.split('');

  return (
    <div className="bounce-gradient-container">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="bounce-gradient-letter"
          custom={index}
          initial="hidden"
          animate="visible"
          variants={letterVariants}
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};
