import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

    


    const [editables, setEditables] = useState({
        firstname: false,
        lastname: false,
        email: false,
    });

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
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditableToTrue = (field: string) => {
        setEditables({...editables, [field]: true});
    };

    const handleEditableToFalse = (field: string) => {
        setEditables({...editables, [field]: false});
        console.log(editables);
        // Return field value to original value
        setUserData({...userData, [field]: userDataCopy[field]});
    };



  return (
		<div className="profile">
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
							type="text"
							className={editables.firstname ? "editable" : "read-only"}
							value={userData.firstname}
							placeholder="Not set"
							onChange={handleInputChange}
							contentEditable={editables.firstname}
						/>
						{editables.lastname ? (
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
							type="text"
							className={editables.lastname ? "editable" : "read-only"}
							value={userData.lastname}
							placeholder="Not set"
							onChange={handleInputChange}
							contentEditable={editables.lastname}
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
							type="text"
							className={editables.email ? "editable" : "read-only"}
							value={userData.email}
							placeholder="Not set"
							contentEditable={editables.email}
						/>
						{!userData.email ? (
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
				</div>
			</div>
		</div>
	);
}

export default Profile;