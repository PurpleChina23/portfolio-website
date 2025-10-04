import { useEffect, useRef, useState } from 'react';
import './ScrollImageSequence.css';

const ScrollImageSequence = ({
  frameCount = 150,  // Total number of frames
  folderPath = './frames',  // Folder in public/ containing frames
  filePrefix = 'frame',  // Prefix for frame files
  fileExtension = 'jpg'  // Image format (jpg, png, webp)
}) => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const frameIndexRef = useRef(0);

  // Preload all images
  useEffect(() => {
    const loadedImages = [];
    let loaded = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(4, '0'); // e.g., 0001, 0002
      img.src = `${folderPath}/${filePrefix}_${frameNumber}.${fileExtension}`;

      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
      };

      img.onerror = () => {
        console.warn(`Failed to load: ${img.src}`);
        loaded++;
        setImagesLoaded(loaded);
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, [frameCount, folderPath, filePrefix, fileExtension]);

  // Handle scroll and render frames
  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const renderFrame = (index) => {
      if (!images[index] || !images[index].complete) return;

      const img = images[index];

      // Calculate scaling to cover the canvas (like object-fit: cover)
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      // Slow down animation - use only 30% of frames to make it play slower
      const slowdownFactor = 0.3;
      const maxFrameToUse = Math.floor(frameCount * slowdownFactor);

      const frameIndex = Math.min(
        Math.floor(scrollFraction * maxFrameToUse),
        maxFrameToUse
      );

      if (frameIndex !== frameIndexRef.current) {
        frameIndexRef.current = frameIndex;
        requestAnimationFrame(() => renderFrame(frameIndex));
      }
    };

    const handleResize = () => {
      setCanvasSize();
      requestAnimationFrame(() => renderFrame(frameIndexRef.current));
    };

    // Initial render
    renderFrame(0);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [images, frameCount]);

  const loadingPercent = Math.round((imagesLoaded / frameCount) * 100);

  return (
    <div className="scroll-sequence-wrapper">
      <canvas ref={canvasRef} className="scroll-sequence-canvas" />
      {imagesLoaded < frameCount && (
        <div className="loading-overlay">
          <div className="loading-bar">
            <div
              className="loading-progress"
              style={{ width: `${loadingPercent}%` }}
            />
          </div>
          <p>Loading frames... {loadingPercent}%</p>
        </div>
      )}
    </div>
  );
};

export default ScrollImageSequence;
