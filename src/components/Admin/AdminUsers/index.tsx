import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MetroSpinner } from "react-spinners-kit";
import { UserType } from "../../../assets/utils/custom_types";
import "./styles.scss";

const AdminUsers: React.FC = () => {
	const [users, setUsers] = useState<UserType[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(true);
	const nav = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://art-alchemy-7302d99f4202.herokuapp.com/api/users?page=${currentPage - 1}&size=8`
				);
				const data = await response.json();
				setUsers(data.content);
				setTotalPages(data.totalPages);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching users:", error);
				setLoading(false);
			}
		};
		fetchUsers();
	}, [currentPage]);

	// Implement next and previous page handlers
	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div className="admin-users admin-component">
			<div className="top-mobile-placeholder"></div>

			<div className="admin-tab-title">Users</div>


			<button className="new-user-btn" onClick={() => nav("/admin/new-user")}>
				New User
			</button>

			{loading ? (
				<div className="users-loader">
					<MetroSpinner color='black' />
				</div>
			) : (
				<>
					{users.map((user: UserType) => (
						<div className="admin-user-wrapper" key={user.id}>
							<div className="admin-user-img">
								<i className="bx bx-user"></i>
							</div>

							<div className="admin-user-meta">
								<div className="id">{user.id}</div>
								<div className="username">{user.username}</div>
								<div className="names">
									{user.firstname} {user.lastname}
								</div>
								<div className="email">{user.email}</div>
							</div>

							<div className="admin-user-btns">
								<button className="manage-btn">Manage</button>
								<button className="remove-btn">Remove Account</button>
							</div>
						</div>
					))}

					{users.length == 0 ? (
						<div className="users-fetch-error">
							There was an error fetching users!
						</div>
					) : (

						<div className="pagination-btns">
							<button onClick={prevPage} disabled={currentPage === 1}>
								<i className="bx bx-chevron-left"></i>
							</button>
							<span>
								{currentPage} of {totalPages}
							</span>
							<button onClick={nextPage} disabled={currentPage === totalPages}>
								<i className="bx bx-chevron-right"></i>
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default AdminUsers;
