import React, { useState, useEffect } from 'react'
import './styles.scss'

const Navbar: React.FC = () => {

  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    setCurrentTab('home');
  }, []);

  // Handle link click
  const handleTabChange = (tabValue: string) => {
    setCurrentTab(tabValue);
  }


  return (
    <div className='navbar'>

      <div className="links">

        <div className={`link ${currentTab == 'home' ? 'active': ''}`} onClick={() => handleTabChange('home')}>
          <i className="bx bx-home"></i>
        </div>

        <div className={`link ${currentTab == 'search' ? 'active': ''}`} onClick={() => handleTabChange('search')}>
          <i className="bx bx-search"></i>
        </div>

        <div className={`link ${currentTab == 'events' ? 'active': ''}`} onClick={() => handleTabChange('events')}>
          <i className="bx bx-calendar-event"></i>
        </div>

      </div>
    </div>
  )
};

export default Navbar