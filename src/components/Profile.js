import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import Avatar from '@mui/material/Button';
import {lightBlue} from "@mui/material/colors";
import {Box, Container, TextField} from "@mui/material";

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <Container maxWidth="sm">
            <Avatar variant='circular' sx={{ bgcolor: "lightblue", width: 200, height: 200, borderRadius: 100 }}>{currentUser.username[0]}</Avatar>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        info
                        id="username"
                        label="Username"
                        defaultValue={currentUser.username}
                        variant="filled"
                        disabled="true"

                    />
                    <TextField
                        disabled
                        id="filled-disabled"
                        label="Disabled"
                        defaultValue="Hello World"
                        variant="filled"
                    />
                </div>
                <div>
                    <TextField
                        error
                        id="standard-error"
                        label="Error"
                        defaultValue="Hello World"
                        variant="standard"
                    />
                    <TextField
                        error
                        id="standard-error-helper-text"
                        label="Error"
                        defaultValue="Hello World"
                        helperText="Incorrect entry."
                        variant="standard"
                    />
                </div>
            </Box>
        </Container>
    );
};

export default Profile;
