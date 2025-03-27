// import React from 'react'
// import "../Home/home.css";
// import { useUser } from '../Context/UserContext';
// import { useMenu } from '../Context/MenuContext';
// import { useNavigate } from 'react-router-dom';
// const Home = () => {

//   const {user} = useUser();
//   const { menuItems, loading, error } = useMenu();

//   const navigate = useNavigate();

//   const handleOnclick = ()=>{
//     navigate('/search');
//   }
//   return (
//     <div className='home'>
//   <h2 className='hero-heading'>Order Online, Skip the Line!</h2>
//   <div className='hero-section'>
  
//     {/* Delivery Card */}
//     <div className='card delivery-card' onClick={handleOnclick} >
   
//       <div className="card-content" >
//         <h3>Snackers@Hostel</h3>
//         <p className='card-description'>
//           Deliver your favorites straight to your hostel. Fast & fresh!
//         </p>
//         <div className="cta-section">
//           <button className='cta-btn delivery-cta'>
//             Order to Hostel →
//           </button>
//           <div className="card-image ">
//             <div className='delivery-image '>
//               <img width={250} src="https://i.pinimg.com/originals/ca/8c/e0/ca8ce0e32164abfeb314767e919120ee.jpg" alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Pickup Card */}
//     <div className='card pickup-card' onClick={handleOnclick}>
//       <div className="card-content">
//         <h3>Nescafe Quick Pickup ⚡</h3>
//         <p className='card-description'>
//         Your order will be prepared. We'll notify you when it's ready for pickup.
//         </p>
//         <div className="cta-section">
//           <button className='cta-btn pickup-cta'>
//             Reserve & Pickup →
//           </button>
//           <div className="card-image ">
//             <div className='pickup-image '>
//               <img width={100} src="https://images.ctfassets.net/trvmqu12jq2l/2fJeVuQu2dnsTUVgZ7fP5W/87f77ed7850a9acc96dba69c52e1b346/Copy_of_Untitled_Design.png?w=1200&h=1073&fm=png&f=faces&fit=fill" alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <hr className='hr'></hr>
//   <div className="random"></div>
// </div>

//   )
// }

// export default Home
import React from 'react';
import "../Home/home.css";
import { useUser } from '../Context/UserContext';
import { useMenu } from '../Context/MenuContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useUser();
  const { menuItems, loading, error } = useMenu();
  const navigate = useNavigate();

  const handleQuickPickup = () => {
    navigate('/search');
  };

  const handleExploreMenu = () => {
    navigate('/menu');
  };

  return (
    <div className='home'>
      <h2 className='hero-heading'>Order Online, Skip the Line!</h2>
      
      <div className='hero-section'>
        {/* Quick Pickup Card */}
        <div className='card pickup-card' onClick={handleQuickPickup}>
          <div className="card-content">
            <h3>Nescafe Quick Pickup ⚡</h3>
            <p className='card-description'>
              Your order will be prepared instantly. We'll notify you when it's ready for pickup.
            </p>
            
            <div className="cta-section">
              <button className='cta-btn pickup-cta'>
                Reserve & Pickup →
              </button>
              
              <div className="card-image">
                <div className='pickup-image'>
                  <img 
                    width={100} 
                    src="https://images.ctfassets.net/trvmqu12jq2l/2fJeVuQu2dnsTUVgZ7fP5W/87f77ed7850a9acc96dba69c52e1b346/Copy_of_Untitled_Design.png?w=1200&h=1073&fm=png&f=faces&fit=fill" 
                    alt="Pickup Coffee" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Menu Card */}
        <div className='card delivery-card' onClick={handleExploreMenu}>
          <div className="card-content">
            <h3>Explore Our Menu</h3>
            <p className='card-description'>
              Browse through our delicious selection of coffees, snacks, and more. Find your perfect pick!
            </p>
            
            <div className="cta-section">
              <button className='cta-btn delivery-cta'>
                View Full Menu →
              </button>
              
              <div className="card-image">
                <div className='delivery-image'>
                  <img 
                    width={100} 
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" 
                    alt="Coffee Menu" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className='hr'></hr>

      {/* Featured Items Section (if needed) */}
      {!loading && menuItems && menuItems.length > 0 && (
        <div className="orderFood">
          <h1>Featured Items</h1>
          <div className="bestFoodItem">
            {menuItems.slice(0, 3).map((item) => (
              <div key={item.id} className="food-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="random"></div>
    </div>
  );
};

export default Home;