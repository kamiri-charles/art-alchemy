import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RandomBackground from "../assets/utils/RandomBackground";
import { MetroSpinner } from "react-spinners-kit";
import '../styles/signIn&signUp.scss';

const SignIn: React.FC = () => {
	type UserData = {
		username: string;
		password: string;
	};

	const [userData, setUserData] = useState<UserData>({
		username: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [usernameValid, setUsernameValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const nav = useNavigate();

	useEffect(() => {
		// fetch user data from local storage
		const data = localStorage.getItem("artAlchemyUserData");
		if (data) nav("/");

		// Validate username
		if (userData.username.length > 8) setUsernameValid(true);
		else setUsernameValid(false);

		// Validate password
		if (userData.password.length > 8) setPasswordValid(true);
		else setPasswordValid(false);
	}, [nav, userData.password.length, userData.username.length]);

	/* Handle input value change */
	const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
		setError('');
	};

	/* Sign in function */
	const sign_in = () => {
		setLoading(true);

		if (usernameValid && passwordValid) {
			// Fetch user data from backend
			fetch("http://localhost:8080/api/users/sign-in", {
				method: "POST",
				body: JSON.stringify(userData),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.error) {
						console.log(data.error);
						setError(data.error);
						setLoading(false);
					} else {
						// Save user data to local storage
						localStorage.setItem("artAlchemyUserData", JSON.stringify(data));
						setLoading(false);
						nav('/')
					}
				});
		} else {
			setError('Please enter a valid username and password.');
			setLoading(false);
		}
	};

	return (
		<div className="sign-in">
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


					<div className="form-title">Log In</div>

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
								<i className={usernameValid ? 'bx bx-check' : 'bx bx-x invalid' }></i>
							</div>
						</div>

						<div className="field">
							<label>Password</label>
							<input
								name="password"
								type={showPassword ? "text": "password"}
								placeholder="Enter your password"
								value={userData?.password}
								onChange={handle_change}
							/>

							<div className="input-valid-icon">
								<i className={passwordValid ? 'bx bx-check' : 'bx bx-x invalid'}></i>
							</div>

							<div className="show-password-icon" onClick={() => setShowPassword(!showPassword)}>
								<i className={showPassword ? "bx bx-hide" : "bx bx-show"}></i>
							</div>
						</div>

						<div className="field checkbox">
							<input type="checkbox" aria-checked />
							<label>Keep me logged in</label>
						</div>
					</div>

					{error.length > 0 ? <div className="error-message">{error}</div> : ''}
					

					{loading ? (
						<div className="spinner">
							<MetroSpinner size={30} color="black" />
						</div>
					) : (
						<button className="submit" onClick={() => sign_in()}>
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
						Become an alchemist.
						<Link to="/sign-up"> Join ArtAlchemy</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
