import React from 'react';
import './styles.scss';

const Header:React.FC = () => {
  return (
    <div className='header'>
      <div className="left">

        <div className="menu-icon">
          <i className="bx bx-menu"></i>
        </div>

        <div className="logo">
          <span>Art</span>
          <span>Alchemy</span>
        </div>
        
      </div>

      <div className="right"></div>
    </div>
  )
}

export default Header;