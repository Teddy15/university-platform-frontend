import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/uni-platform/categories";

const getAllCategories = () => {
    return axios.get(API_URL, { headers: authHeader() });
}
const createCategory = (category) => {
    return axios.post(API_URL, {name: category.name}, { headers: authHeader() });
}

const updateCategory = (id, category) => {
    return axios.put(API_URL + `/${id}`, {name: category.name}, { headers: authHeader() });
}

const deleteCategory = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
}

const CategoryService = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}

export default CategoryService;
