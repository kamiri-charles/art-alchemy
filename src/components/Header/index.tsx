import { useState, useEffect, FC, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../utils/custom_types";
import { MetroSpinner } from "react-spinners-kit";
import "./styles.scss";

interface HeaderProps {
	lightBgActive: boolean;
	currentPage: string;
}

const Header: FC<HeaderProps> = ({ lightBgActive, currentPage }) => {
	const [userData, setUserData] = useState<UserType>();
	const [mvHamMenuActive, setMvHamMenuActive] = useState(false);
	const [signingOut, setSigningOut] = useState(false);
	const mvHamMenuRef = useRef<HTMLDivElement | null>(null);
	const mvHamMenuBtnRef = useRef<HTMLDivElement | null>(null);
	const nav = useNavigate();

	useEffect(() => {
		// fetch user data from local storage
		const data = localStorage.getItem("artAlchemyUserData");
		if (data) {
			setUserData(JSON.parse(data));
		}

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (
				mvHamMenuRef.current &&
				!mvHamMenuRef.current.contains(target) &&
				mvHamMenuBtnRef.current &&
				!mvHamMenuBtnRef.current.contains(target)
			) {
				setMvHamMenuActive(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
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
		<div className={`header${lightBgActive ? " light-bg-active" : ""}`}>
			<div className="left" onClick={() => nav("/")}>
				Art Alchemy
			</div>

			<div className="mid">
				<div className="link" onClick={() => nav("/shop")}>
					Shop
				</div>
				<div className="link">Events</div>
				<div className="link">Blog</div>
				<div className="link">Become an Artist</div>
				<div className="link">Contact</div>
			</div>

			<div className="right">
				{userData ? (
					<div className="user-logged-in">
						<div className="dv-account-option">
							<div className="dv-profile-pic">
								<i className="bx bx-user"></i>
							</div>
							<span>{userData.username}</span>
						</div>
						{signingOut ? (
							<MetroSpinner color="black" size={24} />
						) : (
							<div onClick={() => logout()} className="dv-sign-out-option">Sign Out</div>
						)}
					</div>
				) : (
					<div className="user-not-signed-in-buttons">
						<div onClick={() => nav("/sign-in")} className="log-in-btn">
							Log In
						</div>
						<button onClick={() => nav("/sign-up")} className="sign-up-btn">
							Create an Account
						</button>
					</div>
				)}
				<div
					ref={mvHamMenuBtnRef}
					onClick={() => setMvHamMenuActive(!mvHamMenuActive)}
					className="mv-ham-activate"
				>
					<i className="bx bx-menu"></i>
				</div>
			</div>

			<div
				ref={mvHamMenuRef}
				className={`mv-ham-menu${mvHamMenuActive ? " active" : ""}`}
			>
				<div className="header-links">
					<div
						className={`hl${currentPage == "dashboard" ? " current-page" : ""}`}
					>
						<i className="bx bxs-dashboard"></i>
						<span>Dashboard</span>
					</div>
					<div className={`hl${currentPage == "shop" ? " current-page" : ""}`}>
						<i className="bx bx-cart"></i>

						<span>Shop</span>
					</div>
					<div
						className={`hl${currentPage == "events" ? " current-page" : ""}`}
					>
						<i className="bx bx-calendar-event"></i>

						<span>Events</span>
					</div>
					<div className={`hl${currentPage == "blog" ? " current-page" : ""}`}>
						<i className="bx bx-notification"></i>

						<span>Blog</span>
					</div>
					<div
						className={`hl${
							currentPage == "become-an-artist" ? " current-page" : ""
						}`}
					>
						<i className="bx bx-pen"></i>

						<span>Become an Artist</span>
					</div>
					<div
						className={`hl${currentPage == "contact" ? " current-page" : ""}`}
					>
						<i className="bx bx-phone"></i>
						<span>Contact</span>
					</div>
				</div>

				{!userData ? (
					<div className="mv-buttons">
						<button onClick={() => nav("/sign-in")} className="mv-log-in-btn">
							Log In
						</button>
						<button onClick={() => nav("/sign-up")} className="mv-sign-up-btn">
							Sign Up
						</button>
					</div>
				) : (
					<div className="mv-signed-in-options">
						<div className="account-option">
							<div className="profile-pic">
								<i className="bx bx-user"></i>
							</div>
							<span>{userData.username}</span>
						</div>

						{signingOut ? (
							<MetroSpinner color="black" size={20} />
						) : (
							<div onClick={() => logout()} className="sign-out">
								<i className="bx bx-x"></i>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
