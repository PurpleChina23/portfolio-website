import { useEffect, useState } from 'react';
import DodgingButton from './components/DodgingButton';
import ShinyText from './components/ShinyText';
import ScrollImageSequence from './components/ScrollImageSequence';
import RoadMapTimeline from './components/RoadMapTimeline';
import TextType from './components/TextType';
import { BounceGradientText } from './components/BounceGradientText';
import TechScroll from './components/TechScroll';
import SlideInText from './components/SlideInText';
import BlogHorizontalScroll from './components/BlogHorizontalScroll';
import GooeyNav from './components/GooeyNav';
import AnimatedSectionTitle from './components/AnimatedSectionTitle';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Reset scroll position on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.15}s`;
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <div className="App">
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

      <ScrollImageSequence
        frameCount={301}
        folderPath="/frames"
        filePrefix="frame"
        fileExtension="jpg"
      />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-title-wrapper">
            <TextType text="Hey! You Made It" typingSpeed={60} loop={false} showCursor={true} initialDelay={1000} />
            <BounceGradientText delay={0.3}>I'm Michael Chen</BounceGradientText>
          </div>
          <ShinyText
            text="AI'm on It: Turning Data Into Decisions"
            speed={3}
            className="hero-subtitle"
          />
          <p className="hero-motto">"Transforming complex problems into actionable insights"</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <AnimatedSectionTitle text="About Me" animationType="split" />
          <div className="blog-card about-content">
            <p>I'm a data-driven innovator passionate about cutting-edge AI. Currently pursuing a Master of Data Analytics (Artificial Intelligence) at Western University, I completed my Honours BSc in Mathematics & Computer Science at the University of Toronto, building a strong foundation in ML, deep learning, computer vision, and data analysis.</p>
            <p>I transform complex problems into actionable insights through code, data, and creativity. Thriving in fast-paced environments, I bridge technical concepts with practical outcomes while maintaining strong problem-solving skills and effective time management.</p>
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section id="career" className="career">
        <div className="container">
          <AnimatedSectionTitle text="Career" animationType="wave" />
          <div className="blog-card">
            <RoadMapTimeline />
          </div>
        </div>
      </section>

      {/* Blog Section - Horizontal Scroll with GSAP */}
      <BlogHorizontalScroll />

      {/* Tech Stack Scrolling */}
      <TechScroll />

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="blog-card contact-content">
            <p className="contact-description">I'm always open to discussing new projects, creative ideas, or opportunities.</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/michael-lx-chen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2" fill="white"/>
                </svg>
              </a>
              <a href="https://github.com/PurpleChina23" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                </svg>
              </a>
            </div>
            <div className="contact-info">
              <a href="mailto:mchen522@uwo.ca" className="cta-button">Contact me</a>
            </div>
          </div>
        </div>
      </section>

      {/* Dodging Button */}
      <DodgingButton />

      {/* Slide In Text */}
      <SlideInText text="Michael" />

      {/* Gooey Navigation */}
      <div style={{ position: 'fixed', top: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
        <GooeyNav
          items={[
            { label: 'Home', href: '#home' },
            { label: 'About', href: '#about' },
            { label: 'Career', href: '#career' },
            { label: 'Projects', href: '#projects' },
            { label: 'Contact', href: '#contact' }
          ]}
          initialActiveIndex={0}
        />
      </div>
    </div>
  );
}

export default App;
