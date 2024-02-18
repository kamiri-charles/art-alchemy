import React, { useState, useEffect } from 'react'
import './styles.scss'

const Navbar: React.FC = () => {

  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    if (localStorage.getItem('artAlchemyCurrentNavTab')) {
      setCurrentTab(localStorage.getItem("artAlchemyCurrentNavTab") ?? "");
    } else {
      setCurrentTab('home');
    }
  }, []);

  // Handle link click
  const handleTabChange = (tabValue: string) => {
    setCurrentTab(tabValue);
    localStorage.setItem('artAlchemyCurrentNavTab', tabValue);
  }


  return (
    <div className='navbar'>

      <div className="links">

        <div className={`link ${currentTab == 'home' ? 'active': ''}`} onClick={() => handleTabChange('home')}>
          <i className="bx bx-home"></i>
          <span>Home</span>
        </div>

        <div className={`link ${currentTab == 'events' ? 'active': ''}`} onClick={() => handleTabChange('events')}>
          <i className="bx bx-calendar-event"></i>
          <span>Events</span>
        </div>

        <div className={`link ${currentTab == 'cart' ? 'active': ''}`} onClick={() => handleTabChange('cart')}>
          <i className="bx bx-cart"></i>
          <span>Cart</span>
        </div>

        <div className='link logout'>
          <i className="bx bx-log-out"></i>
          <span>Sign out</span>
        </div>

      </div>
    </div>
  )
};

export default Navbar