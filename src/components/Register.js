import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import isEmail from 'validator';

import { register } from "../redux/actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validateEmail = (value) => {
    // if (!isEmail(value)) {
    //     return (
    //         <div className="alert alert-danger" role="alert">
    //             This is not a valid email.
    //         </div>
    //     );
    // }
};

const validateUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const validateFullName = (value) => {
    if (value.length < 5 || value.length > 50) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 5 and 5 characters.
            </div>
        );
    }
};

const validatePassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const signUpButton = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangeFullName = (e) => {
        setFullName(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (signUpButton.current.context._errors.length === 0) {
            dispatch(register(username, email, fullName, password, "ROLE_USER"))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, validateUsername]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validateEmail]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    value={fullName}
                                    onChange={onChangeFullName}
                                    validations={[required, validateFullName]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, validatePassword]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={signUpButton} />
                </Form>
            </div>
        </div>
    );
};

export default Register;
