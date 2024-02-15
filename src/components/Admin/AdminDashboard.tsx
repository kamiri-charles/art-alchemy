import React from 'react'
import PlaceholderImg from '../../assets/admin-dash-placeholder-img.svg'
import { MetroSpinner } from 'react-spinners-kit'
import '../../styles/admin/adminDashboard.scss'

const AdminDashboard: React.FC = () => {

  const adminUserData = localStorage.getItem('artAlchemyAdminUserData');
  let adminName = '';

  if (adminUserData) {
    adminName = JSON.parse(adminUserData).username;
  }

  return (
		<div className="admin-dashboard admin-component">
			<div className="admin-tab-title">Dashboard</div>

			<div className="admin-meta">
				<div className="placeholder-img">
					<img src={PlaceholderImg} alt="admin-placeholder-img" />
				</div>

				<div className="admin-info">
					<div className="welcome">Welcome back, {adminName}!</div>
				</div>
			</div>

			<div className="system-meta">
				<div className="placeholder-img">
					<i className="bx bx-buildings"></i>
				</div>

				<div className="system-info">
					<div className="info">
						<span>Users: 0</span>

						<div className="info-icon">
							<i className="bx bx-right-arrow-alt"></i>
						</div>
					</div>

					<div className="info">
						<span>Art: 0</span>

						<div className="info-icon">
							<i className="bx bx-right-arrow-alt"></i>
						</div>
					</div>

					<div className="info">
						<span>Events: 0</span>

						<div className="info-icon">
							<i className="bx bx-right-arrow-alt"></i>
						</div>
					</div>
				</div>
			</div>

      <div className="app-metrics">
        <div className="app-metrics-title">Metrics</div>

        <div className="metrics-loader">
          <MetroSpinner color='black' size={30} />
        </div>
      </div>
		</div>
	);
}

export default AdminDashboard