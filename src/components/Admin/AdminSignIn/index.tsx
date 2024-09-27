import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MetroSpinner } from "react-spinners-kit";
import "./styles.scss";

const AdminSignIn: React.FC = () => {
	type UserData = {
		username: string;
		password: string;
	};

	const nav = useNavigate();

	const [userData, setUserData] = useState<UserData>({
		username: "",
		password: "",
	});
	const [usernameValid, setUsernameValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError("");
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
	};

	const sign_in = () => {
		setLoading(true);

		if (usernameValid && passwordValid) {
			fetch(
				"https://art-alchemy-7302d99f4202.herokuapp.com/api/users/admin/sign-in",
				{
					method: "POST",
					body: JSON.stringify(userData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
				.then((res) => res.json())
				.then((data) => {
					if (data.error) {
						setError(data.message);
						setLoading(false);
					} else {
						localStorage.setItem(
							"artAlchemyAdminUserData",
							JSON.stringify(data)
						);
						nav("/admin");
					}
				})
				.catch((err) => {
					console.error(err);
					setError("An error occurred. Please try again.");
					setLoading(false);
				});
		} else {
			setError("Invalid username or password");
			setLoading(false);
		}
	};

	useEffect(() => {
		if (userData.username.length > 8) setUsernameValid(true);
		else setUsernameValid(false);

		if (userData.password.length > 8) setPasswordValid(true);
		else setPasswordValid(false);
	}, [userData.password.length, userData.username.length]);

	const request_for_admin = () => {
		alert("Your request has been sent succesfully!");
		nav("/");
	};

	return (
		<div className="admin-sign-in">
			<div className="admin-sign-in-logo" onClick={() => nav("/")}>
				ART ALCHEMY
			</div>

			<form className="admin-sign-in-form">
				<div className="admin-sign-in-title">
					<span className="deco">Admin</span>
					<span>| Sign In</span>
				</div>
				<div className="fields">
					<div className="field">
						<label>Username</label>
						<input
							name="username"
							type="text"
							placeholder="Enter your username"
							value={userData?.username}
							onChange={handle_change}
						/>

						<div className="input-valid-icon">
							<i
								className={usernameValid ? "bx bx-check" : "bx bx-x invalid"}
							></i>
						</div>
					</div>

					<div className="field">
						<label>Password</label>
						<input
							name="password"
							type="password"
							placeholder="Enter your password"
							value={userData?.password}
							onChange={handle_change}
						/>

						<div className="input-valid-icon">
							<i
								className={passwordValid ? "bx bx-check" : "bx bx-x invalid"}
							></i>
						</div>
					</div>
				</div>

				{error.length > 0 ? <div className="error-message">{error}</div> : ""}

				{loading ? (
					<div className="spinner">
						<MetroSpinner size={30} color="black" />
					</div>
				) : (
					<button
						className="submit"
						onClick={(evt) => {
							evt.preventDefault();
							sign_in();
						}}
					>
						Log In
					</button>
				)}

				<button className="admin-request" onClick={() => request_for_admin()}>
					Request for admin priviledges
				</button>
			</form>
		</div>
	);
};

export default AdminSignIn;
