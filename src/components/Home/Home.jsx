
// import React, { useRef, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./home.css";

// const Home = () => {
//   const navigate = useNavigate();
//   const videoRef = useRef(null);
//   const [videoSection, setVideoSection] = useState(1);
//   const FIRST_SECTION_END_TIME = 2.3; // First 2 seconds of video

//   const handleQuickPickup = () => {
//     navigate('/search');
//   };

//   const handleExploreMenu = () => {
//     navigate('/menu');
//   };

//   // Control video on initial load
//   useEffect(() => {
//     const videoElement = videoRef.current;
//     if (videoElement) {
//       const handleTimeUpdate = () => {
//         if (videoSection === 1 && videoElement.currentTime >= FIRST_SECTION_END_TIME) {
//           videoElement.pause();
//         }
//       };
      
//       videoElement.addEventListener('timeupdate', handleTimeUpdate);
//       videoElement.play().catch(err => console.log("Video autoplay prevented:", err));
      
//       return () => {
//         videoElement.removeEventListener('timeupdate', handleTimeUpdate);
//       };
//     }
//   }, [videoSection]);

//   // Capture scroll (wheel) events and resume video/change text without scrolling
//   useEffect(() => {
//     const handleScroll = (e) => {
//       // Prevent default scroll behavior
//       e.preventDefault();
//       if (videoSection === 1) {
//         setVideoSection(2);
//         if (videoRef.current) {
//           videoRef.current.currentTime = FIRST_SECTION_END_TIME;
//           videoRef.current.play();
//         }
//         // Remove the listener so that this event is only handled once
//         window.removeEventListener('wheel', handleScroll, { passive: false });
//       }
//     };

//     // Listen for wheel events with passive set to false so we can prevent default
//     window.addEventListener('wheel', handleScroll, { passive: false });

//     // Optionally, also listen for touch events for mobile devices
//     const handleTouch = (e) => {
//       e.preventDefault();
//       if (videoSection === 1) {
//         setVideoSection(2);
//         if (videoRef.current) {
//           videoRef.current.currentTime = FIRST_SECTION_END_TIME;
//           videoRef.current.play();
//         }
//         window.removeEventListener('touchstart', handleTouch);
//       }
//     };
//     window.addEventListener('touchstart', handleTouch, { passive: false });

//     return () => {
//       window.removeEventListener('wheel', handleScroll, { passive: false });
//       window.removeEventListener('touchstart', handleTouch, { passive: false });
//     };
//   }, [videoSection]);

//   return (
//     <div className="nescafe-home">
//       {/* Video background */}
//       <div className="video-container">
//         <video 
//           ref={videoRef}
//           src="https://www.nescafe.com/in/themes/custom/nescafe/assets/homepage/large.mp4"
//           muted
//           playsInline
//           className="background-video"
//         />
//       </div>

//       {/* Fixed overlay content that changes based on state */}
//       <div className="fixed-overlay">
//         {videoSection === 1 ? (
//           <div className="overlay-content">
//             <h1>Order Online, Skip the Line!</h1>
//             <p>Get your favorite coffee without waiting</p>
            
           
//           </div>
//         ) : (
//           <div className="overlay-content">
            
//             <button className="action-button" onClick={handleExploreMenu}>
//             Explore Our Menu
//             </button>
            
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

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
            <h1>Order Online, Skip the Line!</h1>
            <p>Get your favorite coffee without waiting</p>
            {/* Add a button here for mobile users to tap */}
            <button className="action-button" onClick={() => setVideoSection(2)}>
              Continue
            </button>
          </div>
        ) : (
          <div className="overlay-content">
            <button className="action-button" onClick={handleExploreMenu}>
              Explore Our Menu
            </button>
            <button className="action-button secondary" onClick={handleQuickPickup}>
              Quick Pickup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;