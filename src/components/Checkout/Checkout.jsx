
// import React from 'react';
// import { useEffect } from 'react';
// import { useCart } from '../Context/CartContext';
// import { Plus, Minus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import './checkout.css';
// import { useCanteen } from '../Context/CanteenSettingsContext'; // Make sure this path is correct

// const Checkout = () => {
//   const { cartItems, increaseQuantity, decreaseQuantity } = useCart();
//   const navigate = useNavigate();
//   const { settings, isLoading, isCanteenOpen } = useCanteen();

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   useEffect(() => {
//     console.log("Settings:", settings);
//     console.log("Is canteen open:", isCanteenOpen());
//   }, [settings]);

//   const handleProceedToPayment = () => {
//     // Don't check if data is still loading
//     if (isLoading) {
//       alert('Please wait while we check canteen availability...');
//       return;
//     }
    
//     // Check if canteen is open
//     if (!isCanteenOpen()) {
//       let alertMessage = 'Canteen is currently closed.';
//       if (settings) {
//         alertMessage += ` Our operating hours are from ${settings.openTime} to ${settings.closeTime}.`;
//       }
//       alert(alertMessage + ' Please order during operating hours.');
//       return;
//     }
    
//     navigate('/payment', { state: { orderType: 'pickup', totalPrice } });
//   };

//   return (
//     <div className="checkout-container">
//       {cartItems.length === 0 ? (
//         <div className="empty-cart-container">
//           <h1 className="empty-cart-heading">Your Cart is Empty</h1>
//           <p className="empty-cart-subheading">
//             Looks like you haven't added anything to your cart yet
//           </p>
//           <button
//             className="return-home-btn"
//             onClick={() => navigate('/')}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="checkout-content">
//           {/* Left Side - Pickup Information & Payment */}
//           <div className="left-section">
//             {/* Pickup Information */}
//             <div className="checkout-card">
//               <h2 className="section-heading">Pickup Information</h2>
//               <p className="pickup-message">
//                 Your order will be prepared at the canteen. We'll notify you when it's ready for pickup.
//               </p>
//             </div>

//             {/* Payment Card */}
//             <div className="checkout-card payment-section">
//               <h3 className="section-heading">Payment</h3>
//               <button
//                 className="proceed-pay-btn"
//                 onClick={handleProceedToPayment}
//               >
//                 Proceed to Pay ₹{totalPrice.toFixed(2)}
//               </button>
//             </div>
//           </div>

//           {/* Right Side - Cart Items */}
//           <div className="right-section">
//             <div className="cart-card">
//               <h2 className="cart-heading">Your Order ({cartItems.length})</h2>
//               <div className="cart-items-list">
//                 {cartItems.map((cartItem) => (
//                   <div key={cartItem._id} className="cart-item">
//                     <div className="item-info">
//                       <h3 className="item-title">{cartItem.title}</h3>
//                       <p className="item-price">₹{(cartItem.price * cartItem.quantity).toFixed(2)}</p>
//                     </div>
//                     <div className="quantity-controls">
//                       <button onClick={() => decreaseQuantity(cartItem._id)} className="quantity-btn">
//                         <Minus size={18} />
//                       </button>
//                       <span className="quantity">{cartItem.quantity}</span>
//                       <button onClick={() => increaseQuantity(cartItem._id)} className="quantity-btn">
//                         <Plus size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="cart-total">
//                 <span>Total Amount:</span>
//                 <span className="total-price">₹{totalPrice.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;

// import React, { useEffect } from 'react';
// import { useCart } from '../Context/CartContext';
// import { Plus, Minus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import './checkout.css';
// import { useCanteen } from '../Context/CanteenSettingsContext';

// const Checkout = () => {
//   const { cartItems, increaseQuantity, decreaseQuantity } = useCart();
//   const navigate = useNavigate();
//   const { settings, isLoading, isCanteenOpen } = useCanteen();

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   useEffect(() => {
//     console.log("Settings:", settings);
//     console.log("Is canteen open:", isCanteenOpen());
//   }, [settings]);

//   const handleProceedToPayment = () => {
//     // Don't check if data is still loading
//     if (isLoading) {
//       alert('Please wait while we check canteen availability...');
//       return;
//     }
    
//     // Check if canteen is open
//     if (!isCanteenOpen()) {
//       let alertMessage = 'Canteen is currently closed.';
//       if (settings) {
//         alertMessage += ` Our operating hours are from ${settings.openTime} to ${settings.closeTime}.`;
//       }
//       alert(alertMessage + ' Please order during operating hours.');
//       return;
//     }
    
//     navigate('/payment', { state: { orderType: 'pickup', totalPrice } });
//   };

//   // If cart is empty, show the empty cart message
//   if (cartItems.length === 0) {
//     return (
//       <div className="checkout-container">
//         <div className="empty-cart-container">
//           <h1 className="empty-cart-heading">Your Cart is Empty</h1>
//           <p className="empty-cart-subheading">
//             Looks like you haven't added anything to your cart yet
//           </p>
//           <button
//             className="return-home-btn"
//             onClick={() => navigate('/')}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="checkout-container">
//       <div className="checkout-content">
//         {/* Right Side - Cart Items (shown first on mobile) */}
//         <div className="right-section">
//           <div className="cart-card">
//             <h2 className="cart-heading">Your Order ({cartItems.length})</h2>
//             <div className="cart-items-list">
//               {cartItems.map((cartItem) => (
//                 <div key={cartItem._id} className="cart-item">
//                   <div className="item-info">
//                     <h3 className="item-title">{cartItem.title}</h3>
//                     <p className="item-price">₹{(cartItem.price * cartItem.quantity).toFixed(2)}</p>
//                   </div>
//                   <div className="quantity-controls">
//                     <button onClick={() => decreaseQuantity(cartItem._id)} className="quantity-btn">
//                       <Minus size={18} />
//                     </button>
//                     <span className="quantity">{cartItem.quantity}</span>
//                     <button onClick={() => increaseQuantity(cartItem._id)} className="quantity-btn">
//                       <Plus size={18} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {/* Left Side - Pickup Information */}
//         <div className="left-section">
//           <div className="checkout-card">
//             <h2 className="section-heading">Pickup Information</h2>
//             <p className="pickup-message">
//               Your order will be prepared at the canteen. We'll notify you when it's ready for pickup.
//             </p>
//           </div>
//         </div>
//       </div>
      
//       {/* Fixed bottom bar for total and payment button */}
//       <div className="checkout-fixed-bottom">
//         <div className="total-section">
//           <span className="total-label">Total Amount</span>
//           <span className="total-amount">₹{totalPrice.toFixed(2)}</span>
//         </div>
//         <div className="payment-button-container">
//           <button
//             className="make-payment-btn"
//             onClick={handleProceedToPayment}
//           >
//             Make Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import { Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './checkout1.css';
import { useCanteen } from '../Context/CanteenSettingsContext';
import BackAero from '../orders/BackAero';

const Checkout = () => {
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const { settings, isLoading, isCanteenOpen } = useCanteen();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    console.log("Settings:", settings);
    console.log("Is canteen open:", isCanteenOpen());
  }, [settings]);

  const handleProceedToPayment = () => {
    // Don't check if data is still loading
    if (isLoading) {
      alert('Please wait while we check canteen availability...');
      return;
    }
    
    // Check if canteen is open
    if (!isCanteenOpen()) {
      let alertMessage = 'Canteen is currently closed.';
      if (settings) {
        alertMessage += ` Our operating hours are from ${settings.openTime} to ${settings.closeTime}.`;
      }
      alert(alertMessage + ' Please order during operating hours.');
      return;
    }
    
    navigate('/payment', { state: { orderType: 'pickup', totalPrice } });
  };

  const handleBack = () => {
    navigate('/');
  }

  // If cart is empty, show the empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className='backArrow'><BackAero/></div>
        <div className="empty-cart-container">
          <h1 className="empty-cart-heading">Your Cart is Empty</h1>
          <p className="empty-cart-subheading">
            Looks like you haven't added anything to your cart yet
          </p>
          <button
            className="return-home-btn"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
         <div className='backArrow' onClick={handleBack}><BackAero/></div>
      <div className="checkout-content">
        {/* Left Side - Pickup Information & Payment Button */}
        <div className="left-section">
          {/* Pickup Information */}
          <div className="checkout-card">
            <h2 className="section-heading">Pickup Information</h2>
            <p className="pickup-message">
              Your order will be prepared at the Nescafe. We'll notify you when it's ready for pickup.
            </p>
          </div>
          
          {/* Payment Section - Visible on desktop */}
          <div className="checkout-card payment-section">
            <h2 className="section-heading">Payment</h2>
            <button
              className="proceed-pay-btn"
              onClick={handleProceedToPayment}
            >
              Proceed to Pay ₹{totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
        
        {/* Right Side - Cart Items */}
        <div className="right-section">
          <div className="cart-card">
            <h2 className="cart-heading">Your Order ({cartItems.length})</h2>
            <div className="cart-items-list">
              {cartItems.map((cartItem) => (
                <div key={cartItem._id} className="cart-item">
                  <div className="item-info">
                    <h3 className="item-title">{cartItem.title}</h3>
                    <p className="item-price">₹{(cartItem.price * cartItem.quantity).toFixed(2)}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(cartItem._id)} className="quantity-btn">
                      <Minus size={18} />
                    </button>
                    <span className="quantity">{cartItem.quantity}</span>
                    <button onClick={() => increaseQuantity(cartItem._id)} className="quantity-btn">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <span>Total Amount:</span>
              <span className="total-price">₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed bottom bar for mobile only */}
      <div className="checkout-fixed-bottom">
        <div className="total-section">
          <span className="total-label">Total Amount</span>
          <span className="total-amount">₹{totalPrice.toFixed(2)}</span>
        </div>
        <div className="payment-button-container">
          <button
            className="make-payment-btn"
            onClick={handleProceedToPayment}
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;