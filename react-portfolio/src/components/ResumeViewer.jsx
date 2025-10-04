import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ResumeViewer.css';

const ResumeViewer = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="resume-fullscreen">
      <div className="resume-header">
        <button className="resume-back" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Back to Portfolio</span>
        </button>
        <a href={`${import.meta.env.BASE_URL}resume.pdf`} download="Michael_Chen_Resume.pdf" className="resume-download-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>Download</span>
        </a>
      </div>
      <iframe
        src={`${import.meta.env.BASE_URL}resume.pdf`}
        title="Resume"
        className="resume-iframe-fullscreen"
      />
    </div>,
    document.body
  );
};

export default ResumeViewer;
