import React from 'react'
import './styles.scss'

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

      <div className="right">

        <div className="searchbar">
          <input type="text" placeholder="Art, tags, creators etc..." />
          <i className="bx bx-search"></i>
        </div>

        <div className="cart-icon">
          <i className="bx bx-cart"></i>
        </div>

        <div className="user-icon">
          <i className="bx bx-user"></i>
        </div>
      </div>
    </div>
  )
}

export default Header