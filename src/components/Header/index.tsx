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
		<div className="header">
			<div className="left">
				<div className="logo">
					<span>Art</span>
					<span>Alchemy</span>
				</div>
			</div>

			<div className="right">
				{userData ? (
					<div className="user-logged-in">
						<div className="searchbar">
							<input type="text" placeholder="Search" />
							<i className="bx bx-search"></i>
						</div>

						<div className="user-icon" onClick={() => nav('/profile')}>
							<i className="bx bx-user"></i>
						</div>
					</div>
				) : (
					<div className="user-not-signed-in-buttons">
						<button onClick={() => nav("/sign-up")}>Join</button>
						<button onClick={() => nav("/sign-in")}>Log In</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Header