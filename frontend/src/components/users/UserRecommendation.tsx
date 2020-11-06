import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import User from "../../models/user";
import { useHistory } from "react-router-dom";
import { useDispatch } from "../../store";
import { ROUTES } from "../../common/constants";
import { getUserProfileCall } from "../../actions/profiles";

const useStyles = makeStyles((theme) => ({
    home: {
        display: "flex",
        padding: theme.spacing(1),
        width:"25%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",

    },
    photo: {
        borderRadius: "50%",
    },
    photoContainer: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

interface PropsFromParent {
    user: User;
}

const UserRecommendation = (props: PropsFromParent) => {
    const classes = useStyles();
    const { user } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    const redirectToUser = (username: string) => {
        history.push(ROUTES.PROFILE + "/" + username);
        dispatch(getUserProfileCall(username));
    };

    return (
        <Paper onClick={() => redirectToUser(user.username)} className={classes.home}>
            <div className={classes.photoContainer}>
                <img
                    src={user.profilePicture ? user.profilePicture.url : ""}
                    className={classes.photo}
                    height={64}
                    width={64}
                    alt={""}
                />
            </div>
            <Typography>{user.username}</Typography>
        </Paper>
    );
};

export default UserRecommendation;
