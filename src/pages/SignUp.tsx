import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const SignUp:React.FC = () => {

    const nav = useNavigate();

  return (
		<div className="sign-up">
			<div className="form-wrapper">
				{/* Placeholder image goes here */}
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
					<div className="form-title">Join Art Alchemy</div>

					<div className="fields">
						<div className="field">
							<label>Choose a username</label>
							<input type="text" />
						</div>

						<div className="field">
							<label>Add your email</label>
							<input type="text" />
						</div>

						<div className="field">
							<label>Create a password</label>
							<input type="password" />
						</div>
					</div>

					<button className="submit">Submit</button>

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
						Already a member
						<Link to="/sign-in"> Log in</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUp