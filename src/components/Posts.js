import React, {useState, useEffect, useRef} from "react";

import PostService from "../services/post.service";
import { useNavigate } from "react-router-dom";
import 'react-comments-section/dist/index.css'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import CommentService from "../services/comment.service";
import AuthService from "../services/auth.service";

const Posts = (categories) => {
    const nav = useNavigate();

    const form = useRef();
    const addCommentButton = useRef();

    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [commentContent, setCommentContent] = useState("");
    const [message, setMessage] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categories[0].name ?? "No categories")

    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const onChangeCommentContent = (e) => {
        setCommentContent( e.target.value);
    };

    const handleCreateComment = (e) => {
        e.preventDefault();
        form.current.validateAll();

        if(addCommentButton.current.context._errors.length === 0) {
            CommentService.createComment({postId: currentPost.id, content: commentContent}).then(
                () => {
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                }
            );
        }
    }

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

    const redirectToPostPage = () => {
        nav("/posts/" + currentPost.id);
    }

    const onCategoriesChange = (e) => {
        setSelectedCategory(e.value);
    }

    return (
        <div className="list row">
            <div className="col-md-6">
                <div>Search by category</div>
                <select name="categoryId" value={selectedCategory} onChange={(e) => onCategoriesChange(e)}>
                    {categories.map(category => {
                        return (
                            <option value={category.name}>{category.name}</option>
                        );
                    })}
                </select>
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
                        <button style={{marginTop: 10, marginBottom: 10}}
                                className="btn btn-warning"
                                disabled={AuthService.checkAuthorities(currentPost.user.username)}
                                onClick={redirectToPostPage}>Edit Post</button>
                        {currentPost.comments.map(comment => {
                            return (
                                <div>
                                    <p>{comment.user.username}: {comment.content}</p>
                                </div>
                            );
                        })}
                        <div>
                            <div>
                                <Form onSubmit={handleCreateComment} ref={form}>
                                    <div className="form-group">
                                        <label htmlFor="content">Add comment</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="content"
                                            value={commentContent}
                                            onChange={onChangeCommentContent}
                                            validations={[required]}
                                            disabled={AuthService.isUserLoggedIn()}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button disabled={AuthService.isUserLoggedIn()} className="btn btn-primary btn-block">
                                            <span>Add comment</span>
                                        </button>
                                    </div>

                                    {message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <CheckButton style={{ display: "none" }} ref={addCommentButton} />
                                </Form>
                            </div>
                        </div>
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
