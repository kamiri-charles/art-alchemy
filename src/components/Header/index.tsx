import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MetroSpinner } from 'react-spinners-kit'
import { UserType } from '../../utils/custom_types'
import './styles.scss'

const Header:React.FC = () => {
	const [userData, setUserData] = useState<UserType>();
	const [menuActive, setMenuActive] = useState(false);
	const [signingOut, setSigningOut] = useState(false);
	const nav = useNavigate();

	useEffect(() => {
		// fetch user data from local storage
		const data = localStorage.getItem("artAlchemyUserData");
		if (data) {
			setUserData(JSON.parse(data));
		};
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

			<div className="mid">
				<div className="link" onClick={() => nav("/shop")}>Shop</div>
				<div className="link">Events</div>
				<div className="link">Blog</div>
				<div className="link">Become an Artist</div>
				<div className="link">Contact</div>
			</div>

			<div className="right">
				<div className="search">
					<i className="bx bx-search"></i>
				</div>
				{userData ? (
					<div className="user-logged-in">

						<div
							className="user-icon"
							onClick={() => setMenuActive(!menuActive)}
						>
							<i className="bx bx-user"></i>
						</div>

						<div className={`options fl-c-c ${menuActive ? "" : "hidden"}`}>
							<div className="option fl-c" onClick={() => nav('/profile')}>
								<i className="bx bx-user"></i>
								<span>Profile</span>
							</div>

							<div className="option fl-c sign-out" onClick={() => logout()}>
								{signingOut ? (
									<MetroSpinner size={20} />
								) : (
									<i className="bx bx-log-out"></i>
								)}
								<span>Sign Out</span>
							</div>

						</div>
					</div>
				) : (
					<div className="user-not-signed-in-buttons">
						<div onClick={() => nav("/sign-in")} className='log-in-btn'>Log In</div>
						<button onClick={() => nav("/sign-in")} className='sign-up-btn'>Create an Account</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Header