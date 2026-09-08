import { useState } from 'react';


export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="top-banner">
      <div className="banner-text">
        <span>Sign up and get 20% off to your first order. </span>
        <a href="#signup" className="banner-link">
          Sign Up Now
        </a>
      </div>
      <button 
        onClick={() => setIsVisible(false)} 
        className="close-btn"
        aria-label="Close Announcement"
      >
        ✕
      </button>
    </div>
  );
}