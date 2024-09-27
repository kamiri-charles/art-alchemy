import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../utils/custom_types";
import BreadCrumbsHeader from "../BreadCrumbsHeader";
import "./styles.scss";



const Profile: React.FC = () => {
	const nav = useNavigate();
	const [userData, setUserData] = useState<UserType>({
		id: "",
		username: "",
		firstname: "",
		lastname: "",
		profilePicture: "",
		email: "",
		password: "",
		isArtist: false,
		isAdmin: false,
	});


	useEffect(() => {
		// Get user data from local storage
		const user = localStorage.getItem("artAlchemyUserData");
		if (user) {
			setUserData(JSON.parse(user));
		} else {
			nav("/sign-in");
		}
	}, [nav]);


	return (
		<div className="profile">
			<BreadCrumbsHeader location={['Profile']} />
			
			<div className="profile-meta">
				<div className="profile-pic">
					<i className="bx bx-user"></i>
				</div>

				<div className="username">{userData.username}</div>
				<div className="name">{userData.firstname} {userData.lastname}</div>
				<div className="email">{userData.email}</div>
			</div>	

			<div className="activity">
				<div className="activity-header">Activity</div>

				<div className="activity-content">
					<div className="activity-item">
						<div className="activity-item-header">You have no activity yet</div>
						<div className="activity-item-content">Start creating and sharing your art</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default Profile;
