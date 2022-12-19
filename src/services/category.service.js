import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/uni-platform/categories/";

const getAllCategories = () => {
    return axios.get(API_URL, { headers: authHeader() });
}

const CategoryService = {
    getAllCategories,
}

export default CategoryService;
