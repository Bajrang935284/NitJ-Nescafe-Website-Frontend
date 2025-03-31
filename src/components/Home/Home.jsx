
// import React from 'react';
// import "../Home/home.css";
// import { useUser } from '../Context/UserContext';
// import { useMenu } from '../Context/MenuContext';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const { user } = useUser();
//   const { menuItems, loading, error } = useMenu();
//   const navigate = useNavigate();

//   const handleQuickPickup = () => {
//     navigate('/search');
//   };

//   const handleExploreMenu = () => {
//     navigate('/menu');
//   };

//   return (
//     <div className='home'>
//       <h2 className='hero-heading'>Order Online, Skip the Line!</h2>
      
//       <div className='hero-section'>
//         {/* Quick Pickup Card */}
//         <div className='card pickup-card' onClick={handleQuickPickup}>
//           <div className="card-content">
//             <h3>Nescafe Quick Pickup ⚡</h3>
//             <p className='card-description'>
//               Your order will be prepared instantly. We'll notify you when it's ready for pickup.
//             </p>
            
//             <div className="cta-section">
//               <button className='cta-btn pickup-cta'>
//                 Reserve & Pickup →
//               </button>
              
//               <div className="card-image">
//                 <div className='pickup-image'>
//                   <img 
//                     width={100} 
//                     src="https://images.ctfassets.net/trvmqu12jq2l/2fJeVuQu2dnsTUVgZ7fP5W/87f77ed7850a9acc96dba69c52e1b346/Copy_of_Untitled_Design.png?w=1200&h=1073&fm=png&f=faces&fit=fill" 
//                     alt="Pickup Coffee" 
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Explore Menu Card */}
//         <div className='card delivery-card' onClick={handleExploreMenu}>
//           <div className="card-content">
//             <h3>Explore Our Menu</h3>
//             <p className='card-description'>
//               Browse through our delicious selection of coffees, snacks, and more. Find your perfect pick!
//             </p>
            
//             <div className="cta-section">
//               <button className='cta-btn delivery-cta'>
//                 View Full Menu →
//               </button>
              
//               <div className="card-image">
//                 <div className='delivery-image'>
//                   <img 
//                     width={100} 
//                     src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" 
//                     alt="Coffee Menu" 
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <hr className='hr'></hr>

//       {/* Featured Items Section (if needed) */}
//       {!loading && menuItems && menuItems.length > 0 && (
//         <div className="orderFood">
//           <h1>Featured Items</h1>
//           <div className="bestFoodItem">
//             {menuItems.slice(0, 3).map((item) => (
//               <div key={item.id} className="food-item">
//                 <img src={item.image} alt={item.name} />
//                 <h3>{item.name}</h3>
//                 <p>{item.description}</p>
//                 <span>₹{item.price}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="random"></div>
//     </div>
//   );
// };
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

  // Capture scroll (wheel) events and resume video/change text without scrolling
  useEffect(() => {
    const handleScroll = (e) => {
      // Prevent default scroll behavior
      e.preventDefault();
      if (videoSection === 1) {
        setVideoSection(2);
        if (videoRef.current) {
          videoRef.current.currentTime = FIRST_SECTION_END_TIME;
          videoRef.current.play();
        }
        // Remove the listener so that this event is only handled once
        window.removeEventListener('wheel', handleScroll, { passive: false });
      }
    };

    // Listen for wheel events with passive set to false so we can prevent default
    window.addEventListener('wheel', handleScroll, { passive: false });

    // Optionally, also listen for touch events for mobile devices
    const handleTouch = (e) => {
      e.preventDefault();
      if (videoSection === 1) {
        setVideoSection(2);
        if (videoRef.current) {
          videoRef.current.currentTime = FIRST_SECTION_END_TIME;
          videoRef.current.play();
        }
        window.removeEventListener('touchstart', handleTouch);
      }
    };
    window.addEventListener('touchstart', handleTouch, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll, { passive: false });
      window.removeEventListener('touchstart', handleTouch, { passive: false });
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
            
           
          </div>
        ) : (
          <div className="overlay-content">
            
            <button className="action-button" onClick={handleExploreMenu}>
            Explore Our Menu
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
