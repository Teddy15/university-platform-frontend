import axios from "axios";

const API_URL = "http://localhost:8080/uni-platform/auth/";

const register = (username, email, fullName, password, role) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        fullName,
        password,
        role
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.clear();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
