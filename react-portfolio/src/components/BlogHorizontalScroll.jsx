import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSectionTitle from './AnimatedSectionTitle';
import './BlogHorizontalScroll.css';

gsap.registerPlugin(ScrollTrigger);

const BlogHorizontalScroll = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const cards = gsap.utils.toArray('.blog-card-scroll');

    // Calculate scroll distance - reduce multiplier to make it faster
    const scrollDistance = window.innerHeight * 3;
    const pauseDistance = window.innerHeight * 5; // Additional scroll distance for the pause

    // Calculate positions
    const cardWidth = 400;
    const gap = 64; // 4rem margin-right from CSS

    // Calculate total width of all cards
    const totalCardsWidth = cards.length * cardWidth + (cards.length - 1) * gap;

    // Start position: all cards off-screen to the right
    const startOffset = window.innerWidth;

    // End position: stop a bit more to the left of center
    const endOffset = -(totalCardsWidth / 2 - window.innerWidth / 2) - 70;

    // Set initial position
    gsap.set(container, { x: startOffset });

    // Create timeline for the animation with pause
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance + pauseDistance}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    // Animate cards to center (takes 3 viewport heights)
    tl.to(container, {
      x: endOffset,
      ease: 'none',
      duration: scrollDistance
    })
    // Hold position (pause for 5 viewport heights)
    .to(container, {
      x: endOffset,
      ease: 'none',
      duration: pauseDistance
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const blogData = [
    {
      title: 'Piano Melody Generator',
      date: 'PyTorch • Dec 2023',
      description: 'Led a 4-member team to design LSTM/GRU models for MIDI-based melody generation, achieving a 6.78/10 listener rating through optimized 2-layer LSTM architecture.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      )
    },
    {
      title: 'Student Performance Predictor',
      date: 'R • Jun 2024',
      description: 'Built and deployed a multiple linear regression model achieving 95% accuracy through advanced feature engineering, ANOVA selection, and multicollinearity diagnostics.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      )
    },
    {
      title: 'Hybrid ML Predictive Model',
      date: 'PyTorch • Aug 2023',
      description: 'Designed a neural network hybrid combining Item Response Theory with deep learning, improving prediction accuracy by 30% through PCA and hyperparameter optimization.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      )
    }
  ];

  return (
    <section id="projects" className="blog-scroll-section" ref={sectionRef}>
      <div className="blog-main-title">
        <AnimatedSectionTitle text="Projects" animationType="bounce" />
      </div>
      <div className="blog-scroll-container" ref={containerRef}>
        {blogData.map((blog, index) => (
          <article key={index} className="blog-card-scroll">
            <div className="blog-card-icon">{blog.icon}</div>
            <h3>{blog.title}</h3>
            <p className="blog-date">{blog.date}</p>
            <p>{blog.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogHorizontalScroll;
