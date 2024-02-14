import React from 'react'
import '../../styles/admin/adminNavbar.scss'

const AdminNavbar: React.FC<{currentTab: string; setCurrentTab: (tab: string) => void}> = ({currentTab, setCurrentTab}) => {

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
				</div>

				<div
					className={`link ${currentTab == "users" ? "active" : ""}`}
					onClick={() => handleTabChange("users")}
				>
					<i className="bx bx-user"></i>
				</div>

				<div
					className={`link ${currentTab == "art" ? "active" : ""}`}
					onClick={() => handleTabChange("art")}
				>
					<i className="bx bx-palette"></i>
				</div>

				<div
					className={`link ${currentTab == "events" ? "active" : ""}`}
					onClick={() => handleTabChange("events")}
				>
					<i className="bx bx-calendar-event"></i>
				</div>

				<div
					className={`link ${currentTab == "stats" ? "active" : ""}`}
					onClick={() => handleTabChange("stats")}
				>
					<i className="bx bx-stats"></i>
				</div>

				<div
					className={`link settings ${currentTab == "settings" ? "active" : ""}`}
					onClick={() => handleTabChange("settings")}
				>
					<i className="bx bx-cog"></i>
				</div>
			</div>
		</div>
	);
}

export default AdminNavbar