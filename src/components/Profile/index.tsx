import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RandomBackground from '../../assets/utils/RandomBackground'
import './styles.scss'

type UserType = {
    id: string,
    username: string,
    firstname: string,
    lastname: string,
    profile_picture: ArrayBuffer,
    email: string,
    password: string,
    [key: string]: string | ArrayBuffer,
}

type EditablesType = {
	firstname: boolean,
	lastname: boolean,
	email: boolean,
	[key: string]: boolean
}

const Profile: React.FC = () => {

    const nav = useNavigate();
    const [userData, setUserData] = useState<UserType>({
        id: '',
        username: '',
        firstname: '',
        lastname: '',
        profile_picture: new ArrayBuffer(0),
        email: '',
        password: '',
    });

    const [userDataCopy, setUserDataCopy] = useState<UserType>({
        id: '',
        username: '',
        firstname: '',
        lastname: '',
        profile_picture: new ArrayBuffer(0),
        email: '',
        password: '',
    });

    const [editables, setEditables] = useState<EditablesType>({
        firstname: false,
        lastname: false,
        email: false,
    });

	const [userDataChanged, setUserDataChanged] = useState(false);

    useEffect(() => {
        // Get user data from local storage
        const user = localStorage.getItem('artAlchemyUserData');
        if (user) {
            setUserData(JSON.parse(user));
            setUserDataCopy(JSON.parse(user));
        } else {
            nav('/sign-in');
        }
    }, [nav]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (editables[e.target.name]) { // Check if field is editable	
			setUserData({
				...userData,
				[e.target.name]: e.target.value,
			});
			console.log(userData[e.target.name]);
			
			handleDataChange();
		}
    };

    const handleEditableToTrue = (field: string) => {
        setEditables({...editables, [field]: true});
    };

    const handleEditableToFalse = (field: string) => {
        setEditables({...editables, [field]: false});
        // Return field value to original value
		let original_value =  userDataCopy[field];
		if (!original_value) original_value = '';
        setUserData({...userData, [field]: userDataCopy[field]});
		handleDataChange();
    };

	const handleDataChange = () => {
		if (
			userData.firstname != userDataCopy.firstname ||
			userData.lastname != userDataCopy.lastname ||
			userData.email != userDataCopy.email
		) {
			setUserDataChanged(true);
		} else {
			setUserDataChanged(false);
		}
	};



  return (
		<div className="profile">

			<RandomBackground />

			<div className="back-to-home" onClick={() => nav('/')}>
				<i className="bx bx-x"></i>
			</div>

			<div className="profile-meta">
				<div className="profile-pic">
					{userData.profile_picture ? (
						<img src={userData.profile_picture.toString()} alt="Profile" />
					) : (
						<i className="bx bx-user"></i>
					)}
				</div>

				<div className="profile-meta-content">
					<div className="profile-name">
						Welcome, <input type="text" value={userData.username} />
					</div>

					<div className="profile-firstname">
						First name:{" "}
						<input
							name='firstname'
							type="text"
							className={editables.firstname ? "editable" : "read-only"}
							value={userData.firstname ? userData.firstname : ''}
							placeholder="Not set"
							onChange={handleInputChange}
						/>
						{editables.firstname ? (
							<i
								className="bx bx-x"
								onClick={() => handleEditableToFalse("firstname")}
							></i>
						) : (
							<i
								className="bx bx-edit-alt"
								onClick={() => handleEditableToTrue("firstname")}
							></i>
						)}
					</div>

					<div className="profile-lastname">
						Last name:{" "}
						<input
							name='lastname'
							type="text"
							className={editables.lastname ? "editable" : "read-only"}
							value={userData.lastname ? userData.lastname : ''}
							placeholder="Not set"
							onChange={handleInputChange}
						/>
						{editables.lastname ? (
							<i
								className="bx bx-x"
								onClick={() => handleEditableToFalse("lastname")}
							></i>
						) : (
							<i
								className="bx bx-edit-alt"
								onClick={() => handleEditableToTrue("lastname")}
							></i>
						)}
					</div>

					<div className="profile-email">
						Email:{" "}
						<input
							name='email'
							type="text"
							className={editables.email ? "editable" : "read-only"}
							value={userData.email ? userData.email : ''}
							placeholder="Not set"
						/>
						{userData.email ? (
							""
						) : (
							<i
								className="bx bx-edit-alt"
								onClick={() => setEditables({ ...editables, email: true })}
							></i>
						)}
					</div>

                    {/* TODO: After adding password retrieval from backend */}
					{/* <div className="password"><input type="password" value={userData.password}  /></div> */}

					<button className={`update-profile-info ${userDataChanged ? 'active' : ''}`}>Update Info</button>
				</div>
			</div>

			<div className="placeholder-wrapper-sm"></div>

			<div className="placeholder-wrapper-lg"></div>
		</div>
	);
}

export default Profile;