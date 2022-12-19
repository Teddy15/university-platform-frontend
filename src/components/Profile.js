import React, {useState} from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const nav = useNavigate();

    const initialProfileState = {
        id: currentUser.id,
        email: currentUser.email,
        username: currentUser.username,
        fullName: currentUser.fullName
    };

    const [profile, setProfile] = useState(initialProfileState);

    const handleInputChange = event => {
    const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    const deleteProfile = () => {
        UserService.deleteUserProfile(currentUser.id)
            .then((response) => {
                AuthService.logout();
                nav("/login");
            })
            .catch(e => {
            console.log(e);
        });
    };

    const updateProfile = () => {
        const data = {
            id: currentUser.id,
            email: profile.email,
            username: profile.username,
            fullName: profile.fullName
        };
        UserService.updateUserProfile(data)
            .then((response) => {
                setProfile({
                    id: response.data.id,
                    email: response.data.email,
                    username: response.data.username,
                    fullName: response.data.fullName
                });

                const l = JSON.parse(localStorage.getItem("user"));
                l.email = profile.email;
                l.username = profile.username;
                l.fullName = profile.fullName;
                localStorage.setItem("user", JSON.stringify(l));

                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="col-md-4 submit-form" style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'}}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                            value={profile.username}
                            onChange={handleInputChange}
                            name="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            required
                            value={profile.email}
                            onChange={handleInputChange}
                            name="email"
                        />
                    </div>

                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        required
                        value={profile.fullName}
                        onChange={handleInputChange}
                        name="fullName"
                    />
                </div>

                    <button style={{float: "left", marginTop: 10}} onClick={updateProfile} className="btn btn-success">
                        Update Profile
                    </button>
                    <button style={{float: "right", marginTop: 10}} onClick={deleteProfile} className="btn btn-danger">
                        Delete Profile
                    </button>
        </div>
    );
};

export default Profile;
