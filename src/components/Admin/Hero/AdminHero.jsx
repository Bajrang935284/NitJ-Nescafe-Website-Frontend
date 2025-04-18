import React, { useState } from 'react';
import '../Hero/adminHero.css';
import Order from '../Orders/Order';
import AdminMenu from '../Menu/AdminMenu';
import AdminSetting from '../Settings/AdminSetting';
import { useAdmin } from '../../Context/AdminContext';

const Hero = () => {
  const [selectedOption, setSelectedOption] = useState('Dashboard');
  const{admin} = useAdmin();

 
  const renderContent = () => {
   
     switch (selectedOption ) {
       case 'Dashboard':
         return <div>Dashboard Content</div>;
       case 'Orders':
         return <Order />;
       case 'Menu Items':
         return <AdminMenu/>;
       case 'Settings':
         return <AdminSetting/>;
       default:
         return <div></div>;
     }
   
  };

  return (
    <div className="hero">
      
      
        {
       admin? <div className="hero__left-side">
       <ul className="hero__menu">
         <li
           className={`hero__menu-item ${selectedOption === 'Dashboard' ? 'active' : ''}`}
           onClick={() => setSelectedOption('Dashboard')}
         >
           Dashboard
         </li>
         <li
           className={`hero__menu-item ${selectedOption === 'Orders' ? 'active' : ''}`}
           onClick={() => setSelectedOption('Orders')}
         >
           Orders
         </li>
         <li
           className={`hero__menu-item ${selectedOption === 'Menu Items' ? 'active' : ''}`}
           onClick={() => setSelectedOption('Menu Items')}
         >
           Menu Items
         </li>
         <li
           className={`hero__menu-item ${selectedOption === 'Settings' ? 'active' : ''}`}
           onClick={() => setSelectedOption('Settings')}
         >
           Settings
         </li>
       </ul>
     </div>
     : <div>
      please login
     </div>
   
        }
      <div className="hero__right-side">
        {renderContent()}
      </div>
    </div>
  );
};

export default Hero;


