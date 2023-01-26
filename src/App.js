import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import CategoryService from "./services/category.service";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [categories, setCategories] = useState([]);

  const retrieveCategories = () => {
    CategoryService.getAllCategories()
        .then(response => {
          setCategories(...response.data);
          console.log("test");
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    retrieveCategories();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark nav">
          <Link to={"/"} className="navbar-brand">
            Uni-Platform
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/posts"} className="nav-link">
                Posts
              </Link>
            </li>
            <li hidden={AuthService.isUserLoggedIn()} className="nav-item">
              <Link to={"/posts/create"} className="nav-link">
                Create Post
              </Link>
            </li>
          </div>

          {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    Log Out
                  </a>
                </li>
              </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Posts/>} />
            <Route path="/posts" element={<Posts/>} />
            <Route path="/posts/create" element={<CreatePost categories={categories}/>} />
            <Route path="/posts/:id" element = {<Post categories={categories}/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </div>
      </div>
  );
};

export default App;
