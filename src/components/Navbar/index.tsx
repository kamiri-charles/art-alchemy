import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MetroSpinner } from "react-spinners-kit";
import "./styles.scss";

const Navbar: React.FC<{
	currentTab: string;
	setCurrentTab: (tab: string) => void;
}> = ({ currentTab, setCurrentTab }) => {
	const nav = useNavigate();
	const [signOutLoading, setSignOutLoading] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("artAlchemyCurrentNavTab")) {
			setCurrentTab(localStorage.getItem("artAlchemyCurrentNavTab") ?? "");
		} else {
			setCurrentTab("home");
		}
	}, [setCurrentTab]);

	// Handle link click
	const handleTabChange = (tabValue: string) => {
		localStorage.setItem("artAlchemyCurrentNavTab", tabValue);
		setCurrentTab(tabValue);
	};

	// Log out user
	const logout = () => {
		setSignOutLoading(true);

		setTimeout(() => {
			localStorage.removeItem("artAlchemyUserData");
			setSignOutLoading(false);
			nav("/sign-in");
		}, 3000);
	};

	return (
		<div className="navbar">
			<div className="links">
				<div
					className={`link ${currentTab == "home" ? "active" : ""}`}
					onClick={() => handleTabChange("home")}
				>
					<i className="bx bx-home"></i>
					<span>Home</span>
				</div>

				<div
					className={`link ${currentTab == "events" ? "active" : ""}`}
					onClick={() => handleTabChange("events")}
				>
					<i className="bx bx-calendar"></i>
					<span>Events</span>
				</div>

				<div
					className={`link ${currentTab == "cart" ? "active" : ""}`}
					onClick={() => handleTabChange("cart")}
				>
					<i className="bx bx-cart"></i>
					<span>Cart</span>
				</div>

				<div
					className={`link logout ${
						localStorage.getItem("artAlchemyUserData") ? "" : "hidden"
					}`}
					onClick={() => logout()}
				>
					{signOutLoading ? (
						<MetroSpinner size={25} color="black" />
					) : (
						<>
							<i className="bx bx-log-out"></i>
							<span>Sign out</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
