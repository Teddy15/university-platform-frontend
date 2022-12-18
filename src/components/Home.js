import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import {Card, Grid} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import {CardContent, Divider, Typography} from "@material-ui/core";
import Avatar from "@mui/material/Button";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "initial"
    },
    title: {
        marginBottom: "30px"
    },
    header: {
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    card: {
        maxWidth: 300,
        // margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: theme.spacing.unit * 3
    },
    divider: {
        margin: `${theme.spacing.unit * 3}px 0`
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
            marginLeft: theme.spacing.unit
        }
    }
}));

const Home = () => {
    const classes = useStyles();

    const [posts, setPosts] = useState("");

    useEffect(() => {
        UserService.getPosts().then(
            (response) => {
                setPosts(response.data.posts);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setPosts(_content);
            }
        );
    }, []);

    return (
        <Grid container spacing = {1}>
            {Array.from(posts).map((p, index) => {
                const {title, content, user} = p;
                return (
                    <Grid item>
                        <Card key={index} className={classes.card}>
                            <CardContent className={classes.content}>
                                <Typography
                                    className={"MuiTypography--heading"}
                                    variant={"h6"}
                                    gutterBottom
                                    > <Avatar variant='circular' sx={{ bgcolor: "lightgrey", width: 50, height: 50, borderRadius: 15 }}>{user.username[0]}</Avatar>
                                </Typography>
                                <Typography
                                    className={"MuiTypography--heading"}
                                    variant={"h6"}
                                    gutterBottom
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    className={"MuiTypography--heading"}
                                    variant={"h6"}
                                    gutterBottom
                                >
                                    {content}
                                </Typography>
                                <Divider className={classes.divider} dark />
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Home;
