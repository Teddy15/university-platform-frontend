import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/uni-platform/users/";

const getUserProfile = (id) => {
    return axios.get(API_URL + `${id}`, { headers: authHeader() });
}

const updateUserProfile = (user) => {
    return axios.put(API_URL + `${user.id}`,
        {username: user.username, email: user.email, fullName: user.fullName},
        { headers: authHeader() });
}

const deleteUserProfile = (id) => {
    return axios.delete(API_URL + `${id}`, { headers: authHeader() })
}

const UserService = {
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
};

export default UserService;
