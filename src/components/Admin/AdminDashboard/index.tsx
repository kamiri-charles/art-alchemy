import React, { useEffect, useState } from "react";
import { MetroSpinner } from "react-spinners-kit";
import "./styles.scss";

const AdminDashboard: React.FC<{ setCurrentTab: (tab: string) => void }> = ({
	setCurrentTab,
}) => {
	const [totalUsers, setTotalUsers] = useState();
	const [totalArt, setTotalArt] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch("https://art-alchemy-7302d99f4202.herokuapp.com/api/users/total")
			.then((res) => res.json())
			.then((data) => setTotalUsers(data))
			.catch((error) => console.error(error));

		fetch("https://art-alchemy-7302d99f4202.herokuapp.com/api/art/total")
			.then((res) => res.json())
			.then((data) => setTotalArt(data))
			.catch((error) => console.error(error));
		setLoading(false);
	}, []);

	const adminUserData = localStorage.getItem("artAlchemyAdminUserData");
	let adminName = "";

	if (adminUserData) {
		adminName = JSON.parse(adminUserData).username;
	}

	return (
		<div className="admin-dashboard admin-component">
			<div className="admin-tab-title">Dashboard</div>

			<div className="admin-meta">
				<div className="admin-icon">
					<i className="bx bx-shield"></i>
				</div>

				<div className="admin-info">
					<div className="welcome">
						Welcome back,{" "}
						{loading ? (
							<span className="span-spinner">
								<MetroSpinner color="black" size={20} />
							</span>
						) : (
							<span className="primary">{adminName}.</span>
						)}
					</div>
				</div>
			</div>

			<div className="system-meta">
				<div className="admin-icon">
					<i className="bx bx-buildings"></i>
				</div>

				<div className="system-info">
					<div className="info">
						<span>
							Users:{" "}
							{loading ? (
								<span className="span-spinner">
									<MetroSpinner color="black" size={20} />
								</span>
							) : (
								<span className="primary">{totalUsers}</span>
							)}
						</span>

						<div className="info-icon" onClick={() => setCurrentTab("users")}>
							<i className="bx bx-right-arrow-alt"></i>
						</div>
					</div>

					<div className="info">
						<span>
							Art:{" "}
							{loading ? (
								<span className="span-spinner">
									<MetroSpinner color="black" size={20} />
								</span>
							) : (
								<span className="primary">{totalArt}</span>
							)}
						</span>

						<div className="info-icon" onClick={() => setCurrentTab("art")}>
							<i className="bx bx-right-arrow-alt"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
