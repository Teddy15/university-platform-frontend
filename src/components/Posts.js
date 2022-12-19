import React, { useState, useEffect } from "react";

import PostService from "../services/post.service";
import {useNavigate} from "react-router-dom";

const Posts = () => {
    const nav = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrievePosts();
    }, []);

    const retrievePosts = () => {
        PostService.getPosts()
            .then(response => {
                setPosts(response.data.posts);
                console.log(response.data.posts);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setActivePost = (post, index) => {
        setCurrentPost(post);
        setCurrentIndex(index);
    };

    const redirectToUserPage = () => {
        nav("/posts/" + currentPost.id);
    }

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Posts</h4>

                <ul className="list-group">
                    {posts &&
                    posts.map((post, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActivePost(post, index)}
                            key={index}
                        >
                            {post.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentPost ? (
                    <div>
                        <h4>Post</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentPost.title}
                        </div>
                        <div>
                            <label>
                                <strong>Content:</strong>
                            </label>{" "}
                            {currentPost.content}
                        </div>
                        <div>
                            <label>
                                <strong>Category:</strong>
                            </label>{" "}
                            {currentPost.category.name}
                        </div>

                        <button style={{marginTop: 10}} className="btn btn-warning" onClick={redirectToUserPage}>Edit Post</button>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Post!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Posts;
