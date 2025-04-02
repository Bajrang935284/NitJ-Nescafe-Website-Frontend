

import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoSection, setVideoSection] = useState(1);
  const FIRST_SECTION_END_TIME = 2.3; // First 2 seconds of video

  const handleQuickPickup = () => {
    navigate('/search');
  };

  const handleExploreMenu = () => {
    navigate('/menu');
  };

  // Control video on initial load
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleTimeUpdate = () => {
        if (videoSection === 1 && videoElement.currentTime >= FIRST_SECTION_END_TIME) {
          videoElement.pause();
        }
      };
      
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.play().catch(err => console.log("Video autoplay prevented:", err));
      
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [videoSection]);

  // Modified scroll handling - only prevent default on the specific container
  useEffect(() => {
    const container = document.querySelector('.nescafe-home');
    
    if (!container) return;
    
    const handleScroll = (e) => {
      if (videoSection === 1) {
        // Only prevent default if we're in section 1
        e.preventDefault();
        setVideoSection(2);
        if (videoRef.current) {
          videoRef.current.currentTime = FIRST_SECTION_END_TIME;
          videoRef.current.play();
        }
      }
    };

    // Only add these event listeners to the specific container, not the whole window
    container.addEventListener('wheel', handleScroll, { passive: false });
    
    const handleTouch = (e) => {
      if (videoSection === 1 && e.target.closest('.nescafe-home')) {
        // Only handle touch events within our container
        setVideoSection(2);
        if (videoRef.current) {
          videoRef.current.currentTime = FIRST_SECTION_END_TIME;
          videoRef.current.play();
        }
      }
    };
    
    // Use touchend instead of touchstart to allow normal tapping behavior
    document.addEventListener('touchend', handleTouch);

    return () => {
      container.removeEventListener('wheel', handleScroll, { passive: false });
      document.removeEventListener('touchend', handleTouch);
    };
  }, [videoSection]);

  return (
    <div className="nescafe-home">
      {/* Video background */}
      <div className="video-container">
        <video 
          ref={videoRef}
          src="https://www.nescafe.com/in/themes/custom/nescafe/assets/homepage/large.mp4"
          muted
          playsInline
          className="background-video"
        />
      </div>

      {/* Fixed overlay content that changes based on state */}
      <div className="fixed-overlay">
        {videoSection === 1 ? (
          <div className="overlay-content">
            <h3>Order Online and Get your favorite food  without waiting in queue
            </h3>
            
          </div>
        ) : (
          <div className="overlay-content">
            
            
          <h3>We will notify you as soon as your order is ready!</h3>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;