import React, { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RandomBackground from '../assets/utils/RandomBackground';
import { MetroSpinner } from 'react-spinners-kit';

const SignIn: React.FC = () => {

  type UserData = {
    username: string;
    password: string;
  }


  const [userData, setUserData] = useState<UserData>({ username: '', password: ''});
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    // fetch user data from local storage
    const data = localStorage.getItem('artAlchemyUserData');
    if (data) nav('/');
  }, [nav]);

  /* Handle input value change */
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {    
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }

  /* Sign in function */
  const sign_in = () => {
    setLoading(true);

    // Fetch user data from backend
    fetch('http://localhost:8080/api/users/sign-in', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        // Save user data to local storage
        localStorage.setItem('artAlchemyUserData', JSON.stringify(data));
        setLoading(false);
        console.log('User data:', data);
        //nav('/');
      }
    })
  }





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
					<div className="form-title">Log In</div>

					<div className="fields">
						<div className="field">
							<label>Username</label>
							<input
								name="username"
								type="text"
								value={userData?.username}
								onChange={handle_change}
							/>

              <div className="input-valid-icon invalid">
                <i className="bx bx-check"></i>
              </div>
						</div>

						<div className="field">
							<label>Password</label>
							<input
								name="password"
								type="password"
								value={userData?.password}
								onChange={handle_change}
							/>

              <div className="input-valid-icon valid">
                <i className="bx bx-check"></i>
              </div>

						</div>

						<div className="field checkbox">
							<input type="checkbox" aria-checked />
							<label>Keep me logged in</label>
						</div>
					</div>

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
}

export default SignIn