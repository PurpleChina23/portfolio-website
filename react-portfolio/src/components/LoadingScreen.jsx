import { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const phrasesRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const phrases = shuffleArray([
      "Initializing AI models",
      "Loading portfolio",
      "Compiling projects",
      "Preparing experience",
      "Building timeline",
      "Setting up animations",
      "Optimizing performance",
      "Loading resources",
      "Configuring interface",
      "Almost ready"
    ]);

    const checkmarkIdPrefix = "loadingCheckSVG-";
    const checkmarkCircleIdPrefix = "loadingCheckCircleSVG-";
    const verticalSpacing = 50;

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function createSVG(tag, properties, children) {
      const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
      Object.keys(properties).forEach(prop => {
        element.setAttribute(prop, properties[prop]);
      });
      if (children) {
        children.forEach(child => element.appendChild(child));
      }
      return element;
    }

    function createPhraseSvg(phrase, yOffset) {
      const text = createSVG("text", {
        fill: "#E8E6F0",
        x: 50,
        y: yOffset,
        "font-size": 18,
        "font-family": "Inter, sans-serif"
      });
      text.appendChild(document.createTextNode(phrase + "..."));
      return text;
    }

    function createCheckSvg(yOffset, index) {
      const check = createSVG("polygon", {
        points: "21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708 ",
        fill: "rgba(232, 230, 240, 1)",
        id: checkmarkIdPrefix + index
      });
      const circle_outline = createSVG("path", {
        d: "M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z",
        fill: "#E8E6F0"
      });
      const circle = createSVG("circle", {
        id: checkmarkCircleIdPrefix + index,
        fill: "rgba(212, 189, 255, 0)",
        cx: 16,
        cy: 16,
        r: 15
      });
      return createSVG("g", {
        transform: `translate(10 ${yOffset - 20}) scale(.9)`
      }, [circle, check, circle_outline]);
    }

    function addPhrasesToDocument(phrases) {
      const container = phrasesRef.current;
      if (!container) return;

      // Clear any existing content first
      container.innerHTML = '';

      phrases.forEach((phrase, index) => {
        const yOffset = 30 + verticalSpacing * index;
        container.appendChild(createPhraseSvg(phrase, yOffset));
        container.appendChild(createCheckSvg(yOffset, index));
      });
    }

    function easeInOut(t) {
      const period = 200;
      return (Math.sin(t / period + 100) + 1) / 2;
    }

    addPhrasesToDocument(phrases);
    const startTime = Date.now();
    const upwardMovingGroup = phrasesRef.current;
    upwardMovingGroup.currentY = 0;

    const checks = phrases.map((_, i) => ({
      check: document.getElementById(checkmarkIdPrefix + i),
      circle: document.getElementById(checkmarkCircleIdPrefix + i)
    }));

    function animateLoading() {
      const now = Date.now();
      upwardMovingGroup.setAttribute("transform", `translate(0 ${upwardMovingGroup.currentY})`);
      upwardMovingGroup.currentY -= 1.35 * easeInOut(now);

      checks.forEach((check, i) => {
        const colorChangeBoundary = -i * verticalSpacing + verticalSpacing + 15;
        if (upwardMovingGroup.currentY < colorChangeBoundary) {
          const alpha = Math.max(Math.min(1 - (upwardMovingGroup.currentY - colorChangeBoundary + 15) / 30, 1), 0);
          check.circle.setAttribute("fill", `rgba(212, 189, 255, ${alpha})`);
          const checkColor = [
            Math.round(232 * (1 - alpha) + 186 * alpha),
            Math.round(230 * (1 - alpha) + 85 * alpha)
          ];
          check.check.setAttribute("fill", `rgba(232, ${checkColor[0]}, ${checkColor[1]}, 1)`);
        }
      });

      if (now - startTime < 4000 && upwardMovingGroup.currentY > -520) {
        requestAnimationFrame(animateLoading);
      } else {
        setFadeOut(true);
        setTimeout(() => {
          onLoadingComplete && onLoadingComplete();
        }, 500);
      }
    }

    animateLoading();
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-phrase-box">
        <svg width="100%" height="100%">
          <defs>
            <mask id="mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
              <linearGradient id="linearGradient" gradientUnits="objectBoundingBox" x2="0" y2="1">
                <stop stopColor="white" stopOpacity="0" offset="0%" />
                <stop stopColor="white" stopOpacity="1" offset="30%" />
                <stop stopColor="white" stopOpacity="1" offset="70%" />
                <stop stopColor="white" stopOpacity="0" offset="100%" />
              </linearGradient>
              <rect width="100%" height="100%" fill="url(#linearGradient)" />
            </mask>
          </defs>
          <g width="100%" height="100%" style={{ mask: 'url(#mask)' }}>
            <g id="phrases" ref={phrasesRef}></g>
          </g>
        </svg>
      </div>
      <div className="loading-footer">
        <div className="loading-logo">MC</div>
        Michael Chen
      </div>
    </div>
  );
};

export default LoadingScreen;
