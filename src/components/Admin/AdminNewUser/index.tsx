import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MetroSpinner } from "react-spinners-kit";
import RandomBackground from "../../../assets/utils/RandomBackground";
import "./styles.scss";

const AdminNewUser: React.FC = () => {
	type UserData = {
        firstname: string,
        lastname: string,
		username: string;
		email: string;
		password: string;
	};

	const [userData, setUserData] = useState<UserData>({
        firstname: "",
        lastname: "",
		username: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [usernameValid, setUsernameValid] = useState(false);
	const [emailValid, setEmailValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const nav = useNavigate();

	useEffect(() => {
		// Validate username
		if (userData.username.length > 8) setUsernameValid(true);
		else setUsernameValid(false);

		// Validate email
		if (userData.email.includes("@")) setEmailValid(true);
		else setEmailValid(false);

		// Validate password
		if (userData.password.length > 8) setPasswordValid(true);
		else setPasswordValid(false);
	}, [nav, userData.email, userData.password.length, userData.username.length]);

	// Handle input value change
	const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
		setError("");
	};

	// Sign up function
	const create_user = () => {
		setLoading(true);

		if (usernameValid && emailValid && passwordValid) {
			// Fetch user data from backend
			fetch("https://art-alchemy-7302d99f4202.herokuapp.com/api/users/sign-up", {
				method: "POST",
				body: JSON.stringify(userData),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.error) {
						setError(data.error);
						setLoading(false);
					} else {
						nav("/admin");
					}
				});
		} else {
			setError("Invalid input");
			setLoading(false);
		}
	};

	return (
		<div className="admin-new-user">
			<RandomBackground />
			<div className="form-wrapper">
				<div className="left">
					<div className="brand">ART ALCHEMY</div>

					<div className="large-text">CREATE A NEW USER</div>

					<div className="small-text">
						Manage and facilitate user accounts effortlessly. Add a new user to
						the system with ease
					</div>
				</div>

				<div className="right">
					<div className="back-btn" onClick={() => nav("/admin")}>
						<i className="bx bx-x"></i>
					</div>

					<div className="brand-mobile">ART ALCHEMY</div>

					<div className="form-title">Create an account</div>

					<div className="fields">
						<div className="field">
							<label>Enter the first name</label>
							<input
								name="firstname"
								type="text"
								placeholder="Optional"
								value={userData?.firstname}
								onChange={handle_change}
							/>

							<div className="input-valid-icon">
								<i className="bx bx-check"></i>
							</div>
						</div>

						<div className="field">
							<label>Enter the last name</label>
							<input
								name="lastname"
								type="text"
								placeholder="Optional"
								value={userData?.lastname}
								onChange={handle_change}
							/>

							<div className="input-valid-icon">
								<i className="bx bx-check"></i>
							</div>
						</div>

						<div className="field">
							<label>Choose a username</label>
							<input
								name="username"
								type="text"
								placeholder="No special characters @, #, $, %"
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
							<label>Add account email</label>
							<input
								name="email"
								type="text"
								placeholder="Email address"
								value={userData?.email}
								onChange={handle_change}
							/>

							<div className="input-valid-icon">
								<i
									className={emailValid ? "bx bx-check" : "bx bx-x invalid"}
								></i>
							</div>
						</div>

						<div className="field">
							<label>Create a password</label>
							<input
								name="password"
								type={showPassword ? "text" : "password"}
								placeholder="At least 8 characters"
								value={userData?.password}
								onChange={handle_change}
							/>

							<div className="input-valid-icon">
								<i
									className={passwordValid ? "bx bx-check" : "bx bx-x invalid"}
								></i>
							</div>

							<div
								className="show-password-icon"
								onClick={() => setShowPassword(!showPassword)}
							>
								<i className={showPassword ? "bx bx-hide" : "bx bx-show"}></i>
							</div>
						</div>
					</div>

					<div className="error">{error}</div>

					{loading ? (
						<div className="spinner">
							<MetroSpinner size={30} color="black" />
						</div>
					) : (
						<button className="submit" onClick={() => create_user()}>
							Submit
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminNewUser;
