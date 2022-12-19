import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import PostService from "../services/post.service";

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
        }
    };
    const [currentPost, setCurrentPost] = useState(initialPostState);
    const [message, setMessage] = useState("");

    const getPost = (id) => {
        PostService.getPostById(id)
            .then(response => {
                setCurrentPost(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getPost(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPost({ ...currentPost, [name]: value });
    };

    const updatePost = status => {
        PostService.updatePostById(currentPost)
            .then(response => {
                setCurrentPost({...currentPost, category: response.data.category});
                setMessage("The tutorial was updated successfully!");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deletePost = () => {
        PostService.deletePostById(currentPost.id)
            .then(response => {
                console.log(response.data);
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
                            <label htmlFor="category">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                id="category"
                                name="category"
                                value={currentPost.category.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <button style={{marginTop: 10, marginRight: 10, float: "left"}} className="btn btn-danger" onClick={deletePost}>
                        Delete Post
                    </button>

                    <button
                        style={{marginTop: 10, float: "right"}}
                        type="submit"
                        className="btn btn-success"
                        onClick={updatePost}
                    >
                        Update Post
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Tutorial!</p>
                </div>
            )}
        </div>
    );
};

export default Post;
