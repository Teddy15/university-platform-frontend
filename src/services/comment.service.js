import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/uni-platform/comments";

const createComment = (comment) => {
    return axios.post(API_URL,
        {postId: comment.postId, content: comment.content},
        { headers: authHeader() });
}

const updateComment = (comment) => {
    return axios.put(API_URL + `/${comment.id}`,
        {content: comment.content, userInfoDto: { id: comment.user.id, username: comment.user.username }},
        { headers: authHeader() });
}

const deleteComment = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
}

const CommentService = {
    createComment,
    updateComment,
    deleteComment
};

export default CommentService;
