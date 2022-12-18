import axios from "axios";

const POST_URL = "http://localhost:8080/uni-platform/posts";

const getPosts = () => {
    return axios.get(POST_URL);
};

export default {
    getPosts
};
