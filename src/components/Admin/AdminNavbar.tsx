import React from 'react'
import '../../styles/admin/adminNavbar.scss'
import { useNavigate } from 'react-router-dom';

const AdminNavbar: React.FC<{currentTab: string; setCurrentTab: (tab: string) => void}> = ({currentTab, setCurrentTab}) => {

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

				<div
					className={`link ${currentTab == "events" ? "active" : ""}`}
					onClick={() => handleTabChange("events")}
				>
					<i className="bx bx-calendar-event"></i>
					<span>Events</span>
				</div>

				<div
					className={`link ${currentTab == "settings" ? "active" : ""}`}
					onClick={() => handleTabChange("settings")}
				>
					<i className="bx bx-cog"></i>
					<span>Settings</span>
				</div>

				<div className="link" onClick={() => nav('/')}>
					<i className="bx bx-left-arrow-alt"></i>
					<span>Back</span>
				</div>
			</div>
		</div>
	);
}

export default AdminNavbar