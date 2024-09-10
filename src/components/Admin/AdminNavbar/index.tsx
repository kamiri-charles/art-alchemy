import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const AdminNavbar: React.FC<{
	currentTab: string;
	setCurrentTab: (tab: string) => void;
}> = ({ currentTab, setCurrentTab }) => {
	const nav = useNavigate();

	// Handle link click
	const handleTabChange = (tabValue: string) => {
		setCurrentTab(tabValue);
		localStorage.setItem("artAlchemyCurrentAdminNavTab", tabValue);
	};

	return (
		<div className="admin-navbar">
			<div className="links">
				<div
					className={`link ${currentTab == "dashboard" ? "active" : ""}`}
					onClick={() => handleTabChange("dashboard")}
				>
					<i className="bx bxs-dashboard"></i>
					<span>Dashboard</span>
				</div>

				<div
					className={`link ${currentTab == "users" ? "active" : ""}`}
					onClick={() => handleTabChange("users")}
				>
					<i className="bx bx-user"></i>
					<span>Users</span>
				</div>

				<div
					className={`link ${currentTab == "art" ? "active" : ""}`}
					onClick={() => handleTabChange("art")}
				>
					<i className="bx bx-palette"></i>
					<span>Art</span>
				</div>

				<div className="link" onClick={() => nav("/")}>
					<i className="bx bx-left-arrow-alt"></i>
					<span>Back</span>
				</div>
			</div>
		</div>
	);
};

export default AdminNavbar;
