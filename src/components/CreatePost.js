import React, { useState } from "react";
import PostService from "../services/post.service";

const initialPostState = {
    id: null,
    title: "",
    content: "",
    categoryId: 1
}

const CreatePost: React.FC = (categories) => {
    const [post, setPost] = useState(initialPostState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    const savePost = () => {
        var data = {
            title: post.title,
            content: post.content,
            categoryId: post.categoryId
        };

        PostService.createPost(data)
            .then(response => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newPost = () => {
        setPost(initialPostState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted your post successfully!</h4>
                    <button className="btn btn-success" onClick={newPost}>
                        Create Post
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={post.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <input
                            type="text"
                            className="form-control"
                            id="content"
                            required
                            value={post.content}
                            onChange={handleInputChange}
                            name="content"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Categories</label>
                        <select name="categoryId" value={post.categoryId} onChange={handleInputChange}>
                            {categories.map(category => {
                                return (
                                    <option value={category.id}>{category.name}</option>
                                );
                            })}
                        </select>
                    </div>

                    <button style={{marginTop: 10}} onClick={savePost} className="btn btn-success">
                        Create Post
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreatePost;
