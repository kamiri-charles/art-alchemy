import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MetroSpinner } from 'react-spinners-kit'
import './styles.scss'

const Header:React.FC = () => {
	const [userData, setUserData] = useState();
	const [menuActive, setMenuActive] = useState(false);
	const [signingOut, setSigningOut] = useState(false);
	const nav = useNavigate();

	useEffect(() => {
		// fetch user data from local storage
		const data = localStorage.getItem("artAlchemyUserData");
		if (data) {
			setUserData(JSON.parse(data));
		}
	}, []);

	// Log out user
	const logout = () => {
		setSigningOut(true);

		setTimeout(() => {
			localStorage.removeItem("artAlchemyUserData");
			setSigningOut(false);
			nav("/sign-in");
		}, 3000);
	};

	return (
		<div className="header">
			<div className="left" onClick={() => nav("/")}>
				Art Alchemy
			</div>

			<div className="right">
				<div className="searchbar">
					<input type="text" placeholder="Search" />
					<i className="bx bx-search"></i>
				</div>
				{userData ? (
					<div className="user-logged-in">

						<button className="new-art-btn" onClick={() => nav("/new-art")}>Create Art</button>

						<div
							className="menu-icon"
							onClick={() => setMenuActive(!menuActive)}
						>
							<i className="bx bx-user"></i>
						</div>

						<div className={`options fl-c-c ${menuActive ? "" : "hidden"}`}>
							<div className="option fl-c" onClick={() => nav('/profile')}>
								<i className="bx bx-user"></i>
								<span>Profile</span>
							</div>

							<div className="option fl-c" onClick={() => nav('/cart')}>
								<i className="bx bx-cart"></i>
								<span>Cart</span>
							</div>

							<div className="option fl-c sign-out" onClick={() => logout()}>
								{signingOut ? (
									<MetroSpinner color="black" size={20} />
								) : (
									<i className="bx bx-log-out"></i>
								)}
								<span>Sign Out</span>
							</div>

						</div>
					</div>
				) : (
					<div className="user-not-signed-in-buttons">
						<button onClick={() => nav("/sign-in")} className='log-in-btn'>Log In</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Header