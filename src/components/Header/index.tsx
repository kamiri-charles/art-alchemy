import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

const Header:React.FC = () => {
  const [userData, setUserData] = useState();
  const nav = useNavigate();

  useEffect(() => {
    // fetch user data from local storage
    const data = localStorage.getItem('artAlchemyUserData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);


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
          <input type="text" placeholder="Search" />
          <i className="bx bx-search"></i>
        </div>
        {userData ? (
            <div className="user-logged-in-icons">
              <div className="cart-icon">
                <i className="bx bx-cart"></i>
              </div>

              <div className="user-icon">
                <i className="bx bx-user"></i>
              </div>
            </div> ) : (
              <div className="user-not-signed-in-buttons">
                <button onClick={() => nav('/sign-up')}>Join</button>
                <button onClick={() => nav('/sign-in')}>Log In</button>
              </div>
            )
          }

      </div>
    </div>
  )
}

export default Header