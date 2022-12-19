import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import PostService from "../services/post.service";
import CategoryService from "../services/category.service";
import AuthService from "../services/auth.service";

const Post = props => {
    const { id }= useParams();
    let navigate = useNavigate();

    const initialPostState = {
        id: null,
        title: "",
        content: "",
        category: {
            id: null,
            name: ""
        },
        user: {
            id: null,
            username: ""
        }
    };

    const [currentPost, setCurrentPost] = useState(initialPostState);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");

    const getPost = (postId) => {
        PostService.getPostById(postId)
            .then(response => {
                setCurrentPost(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveCategories = () => {
        CategoryService.getAllCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id) {
            getPost(id);
            retrieveCategories();
        }
    }, [id]);

    const handleCategoryChange = (event) => {
        setCurrentPost({ ...currentPost, category: { id: event.target.value, name: event.target.value }});
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPost({ ...currentPost, [name]: value });
    };

    const updatePost = () => {
        PostService.updatePostById(currentPost)
            .then(response => {
                setCurrentPost({...currentPost});
                setMessage("The post was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deletePost = () => {
        PostService.deletePostById(currentPost.id)
            .then(response => {
                navigate("/posts");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentPost ? (
                <div className="edit-form">
                    <h4>Post</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentPost.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <input
                                type="text"
                                className="form-control"
                                id="content"
                                name="content"
                                value={currentPost.content}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Categories</label>
                            <select name="category" value={currentPost.category.id} onChange={handleCategoryChange}>
                                {categories.map(category => {
                                    return (
                                        <option value={category.id}>{category.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </form>

                    <button style={{marginTop: 10, marginRight: 10, float: "left"}}
                            className="btn btn-danger"
                            disabled={AuthService.checkAuthorities(currentPost.user.username)}
                            onClick={deletePost}>
                        Delete Post
                    </button>

                    <button
                        style={{marginTop: 10, float: "right"}}
                        type="submit"
                        className="btn btn-success"
                        disabled={AuthService.checkAuthorities(currentPost.user.username)}
                        onClick={updatePost}
                    >
                        Update Post
                    </button>

                </div>

            ) : (
                <div>
                    <br />
                    <p>Please click on a post!</p>
                </div>
            )}
        </div>
    );
};

export default Post;
