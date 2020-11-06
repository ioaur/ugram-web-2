import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import User from "../../models/user";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../common/constants";
import { useDispatch } from "../../store";
import { getUserProfileCall } from "../../actions/profiles";

const useStyles = makeStyles((theme) => ({
    home: {
        display: "flex",
        padding: theme.spacing(2),
    },
}));

interface propsFromParent {
    users: User[];
}

function UsersList(props: propsFromParent) {
    const classes = useStyles();
    const { users } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    const redirectToUser = (username: string) => {
        history.push(ROUTES.PROFILE + "/" + username);
        dispatch(getUserProfileCall(username));
    };

    return (
        <div className={classes.home}>
            <div>Users :</div>
            <div>
                {users.map((user) => (
                    <Button onClick={() => redirectToUser(user.username)} key={user.uuid}>
                        <Typography>{user.username}</Typography>
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default UsersList;
