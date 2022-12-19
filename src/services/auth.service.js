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

const checkAuthorities = (username) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
        return true;
    }
    const [...array] = Array.from(user.roles);
    if(array[0] === 'ROLE_ADMIN') return false;
    return user.username !== username;
}

const isUserLoggedIn = () => {
    return JSON.parse(localStorage.getItem("user")) === null;
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    checkAuthorities,
    isUserLoggedIn
};

export default AuthService;
