import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/uni-platform/posts";

const getPosts = () => {
    return axios.get(API_URL);
};

const getPostById = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
}

const createPost = (post) => {
    return axios.post(API_URL,
        { title: post.title, content: post.content, categoryId: post.categoryId },
        { headers: authHeader() });
}

const updatePostById = (post) => {
    return axios.put(API_URL + `/${post.id}`,
        { title: post.title, content: post.content, categoryId: post.category.id },
        { headers: authHeader() });
}

const deletePostById = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() })
}

const PostService = {
    getPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePostById
};

export default PostService;
