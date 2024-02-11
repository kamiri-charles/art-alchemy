import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MetroSpinner } from "react-spinners-kit";
import RandomBackground from "../assets/utils/RandomBackground";
import '../styles/signIn&signUp.scss';

const SignUp: React.FC = () => {
	
	type UserData = {
		username: string;
		email: string;
		password: string;
	};

	const [userData, setUserData] = useState<UserData>({
		username: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [usernameValid, setUsernameValid] = useState(false);
	const [emailValid, setEmailValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [error, setError] = useState('');
	const nav = useNavigate();

	useEffect(() => {
		// fetch user data from local storage
		const data = localStorage.getItem("artAlchemyUserData");
		if (data) nav("/");

		// Validate username
		if (userData.username.length > 8) setUsernameValid(true);
		else setUsernameValid(false);

		// Validate email
		if (userData.email.includes('@')) setEmailValid(true);
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
		setError('');
	};

	// Sign up function
	const sign_up = () => {
		setLoading(true);

		if (usernameValid && emailValid && passwordValid) {
			// Fetch user data from backend
			fetch("http://localhost:8080/api/users/sign-up", {
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
						// Save user data to local storage
						localStorage.setItem("artAlchemyUserData", JSON.stringify(data));
						nav("/");
					}
				});
		} else {
			setError('Invalid input');
			setLoading(false);
		}
	};

	return (
		<div className="sign-up">
			<RandomBackground />
			<div className="form-wrapper">
				<div className="left">
					<div className="brand">ART ALCHEMY</div>

					<div className="large-text">
						JOIN THE LARGEST ART COMMUNITY IN THE WORLD!
					</div>

					<div className="small-text">
						Explore and discover art, become a better artist, connect with
						others over mutual hobbies or buy and sell work - you can do it all
						here.
					</div>
				</div>

				<div className="right">
					<div className="back-btn" onClick={() => nav("/")}>
						<i className="bx bx-x"></i>
					</div>

					<div className="brand-mobile">ART ALCHEMY</div>

					<div className="form-title">Join Art Alchemy</div>

					<div className="fields">
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
								<i className={usernameValid ? "bx bx-check" : "bx bx-x invalid"}></i>
							</div>
						</div>

						<div className="field">
							<label>Add your email</label>
							<input
								name="email"
								type="text"
								placeholder="Email address"
								value={userData?.email}
								onChange={handle_change}
							/>

							<div className="input-valid-icon">
								<i className={emailValid ? "bx bx-check" : "bx bx-x invalid"}></i>
							</div>
						</div>

						<div className="field">
							<label>Create a password</label>
							<input
								name="password"
								type="password"
								placeholder="At least 8 characters"
								value={userData?.password}
								onChange={handle_change}
							/>

							<div className="input-valid-icon">
								<i className={passwordValid ? "bx bx-check" : "bx bx-x invalid"}></i>
							</div>
						</div>
					</div>

					<div className="error">{error}</div>

					{loading ? (
						<div className="spinner">
							<MetroSpinner size={30} color="black" />
						</div>
					) : (
						<button className="submit" onClick={() => sign_up()}>
							Submit
						</button>
					)}

					<div className="or"></div>

					<div className="other-links">
						<div className="link">
							<div className="icon">
								<i className="bx bxl-google"></i>
							</div>

							<span>Continue with Google</span>
						</div>
						<div className="link">
							<div className="icon">
								<i className="bx bxl-apple"></i>
							</div>

							<span>Continue with Apple</span>
						</div>
					</div>

					<div className="form-footer">
						Already a member.
						<Link to="/sign-in"> Log in</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
