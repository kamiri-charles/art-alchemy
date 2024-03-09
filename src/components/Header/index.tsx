import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MetroSpinner } from 'react-spinners-kit';
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
			<div className="left">
				<div className="logo">
					<span>Art</span>
					<span>Alchemy</span>
				</div>
			</div>

			<div className="right">
				<div className="searchbar">
					<input type="text" placeholder="Artists, pieces or events" />
					<i className="bx bx-search"></i>
				</div>
				{userData ? (
					<div className="user-logged-in">

						<div className="add-art-btn" onClick={() => nav('/new-art')}>
							<i className="bx bx-plus"></i>
						</div>

						<div
							className="menu-icon"
							onClick={() => setMenuActive(!menuActive)}
						>
							<i className={menuActive ? "bx bx-x" : "bx bx-menu"}></i>
						</div>

						<div className={`options ${menuActive ? "" : "hidden"}`}>
							<div className="option" onClick={() => nav('/profile')}>
								<i className="bx bx-user"></i>
								<span>My Profile</span>
							</div>

							<div className="option">
								<i className="bx bx-message"></i>
								<span>Notifications</span>
							</div>

							<div className="option sign-out" onClick={() => logout()}>
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
						<button onClick={() => nav("/sign-up")} className='join-btn'>Join</button>
						<button onClick={() => nav("/sign-in")} className='log-in-btn'>Log In</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Header