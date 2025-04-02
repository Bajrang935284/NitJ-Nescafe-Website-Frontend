

import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, SearchIcon, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../Header/header.css';
import DeliveryAddressSelector from '../address/DeliveryAddress';
import { useUser } from '../Context/UserContext';
import AuthModal from '../Auth/Auth';
import CartIcon from '../CartIcon';
import LocationIcon from '../LocationIcon';
import { useCart } from '../Context/CartContext';
import MobileFooter from '../MobileFooter/MobileFooter';
import Logo from '../Logo';
import ArrowDown from '../ArrowDown';
import ProfileIcon from '../Profile/ProfileIcon';

const Header = () => {
  const { user, isLoading, signIn, signUp, logout } = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDeliveryAddressOpen, setIsDeliveryAddressOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // State to track if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we should show the header based on route and device
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  // Determine if header should be shown based on mobile status and route
  // Only hide on mobile when not on home page
  const shouldShowHeader = !isMobile || (isMobile && isHomePage);
  
  // Check for mobile viewport on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check initially
    checkMobile();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAuthSubmit = async (isLogin, formData) => {
    const success = isLogin ? await signIn(formData) : await signUp(formData);
    if (success) {
      setIsAuthModalOpen(false);
    }
  };

  // If we're on mobile and not on home page, don't render the header at all
  if (!shouldShowHeader) {
    return null;
  }

  return (
    <div className="header-container">
      <header className="header">
        {/* Logo Section */}
        <div className="header-logo">
          <h2>
            <Link to="/">
              <Logo size={100} />
            </Link>
          </h2>
        </div>

        {/* Menu Section */}
        <ul className="header-menu">
          <Link to="/search">
            <li className="header-menu-item" style={{color:'white'}}>
              <SearchIcon size={20} style={{color:'white'}} />
              Search
            </li>
          </Link>

          <Link to="/menu">
            <li className="header-menu-item" style={{color:'white'}}>
              <Menu size={24} color="white" />
              Menu
            </li>
          </Link>

          {user ? (
            <Link to="/profile/orders">
              <li className="header-menu-item profile-item" style={{color:'white'}}>
                <ProfileIcon />
                {isLoading ? (
                  <span className="auth-loading" style={{color:'white'}}>Checking session...</span>
                ) : (
                  <div className="profile-section" style={{color:'white'}}>Profile</div>
                )}
              </li>
            </Link>
          ) : (
            <li 
              className="header-menu-item profile-item" 
              onClick={() => setIsAuthModalOpen(true)}
            >
              <ProfileIcon />
              {isLoading ? (
                <span className="auth-loading" style={{color:'white'}}>Checking session...</span>
              ) : (
                <div className="profile-section" style={{color:'white'}}>Log in</div>
              )}
            </li>
          )}

          <Link to="/checkout">
            <li className="header-menu-item" style={{color:'white'}} >
              <div className="cart-icon-container">
                <CartIcon />
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </div>
              Cart
            </li>
          </Link>
        </ul>
      </header>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onSubmit={handleAuthSubmit}
        />
      )}
    </div>
  );
};

export default Header;