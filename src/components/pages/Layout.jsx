import React from 'react'
import Header from '../Header/Header'
import { Outlet , useLocation} from 'react-router-dom'
import MobileFooter from '../MobileFooter/MobileFooter'
import MobileCheckoutBar from '../mobileCheckout/MobileCheckoutBar'

const Layout = () => {

  const location = useLocation();
  const hideMobileBar = location.pathname === "/checkout" || location.pathname === "/payment";

  return (
    <div style={{height: "100vh"}}>
      <Header />
      
        <Outlet />
       
        {!hideMobileBar && <MobileCheckoutBar />}

       { !hideMobileBar && <MobileFooter />}
    </div>
      
   
  )
}

export default Layout

