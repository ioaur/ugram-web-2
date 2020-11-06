import {makeStyles} from "@material-ui/core";
import React, {useEffect} from "react";
import UsersList from "./UsersList";
import {useDispatch, useMappedState} from "../../store";
import {getAllUsersCall} from "../../actions/users";

const useStyles = makeStyles((theme) => ({
    home: {
        display: "flex",
        width: "100%",
    },
}));

function UsersContainer() {
    const classes = useStyles();
    const users = useMappedState((state) => state.users.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsersCall())
    }, [dispatch]);

    return (
        <div className={classes.home}>
            <UsersList users={users}/>
        </div>
    );
}

export default UsersContainer;
