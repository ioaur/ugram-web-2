import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { ProfileInformation } from "./ProfileInformation";
import Divider from "@material-ui/core/Divider";
import { ProfileImages } from "./ProfileImages";
import { useLocation, useHistory } from "react-router-dom";
import { useMappedState, useDispatch } from "../../store";
import { getUserProfileCall } from "../../actions/profiles";
import { getAllUsersCall } from "../../actions/users";
import { ROUTES } from "../../common/constants";

const useStyles = makeStyles((theme) => ({
    home: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
}));

export function ProfileContainer() {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const currentProfile = useMappedState((state) => state.profiles.currentProfile);
    const users = useMappedState((state) => state.users.users);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsersCall());
    }, [dispatch]);

    useEffect(() => {
        const findUser = (username: string) => {
            return users.find((user) => {
                return user.username === username;
            });
        };

        const pathname = location.pathname;
        const username = pathname.replace("/profile/", "");
        const userToLoad = findUser(username);

        if (userToLoad) {
            dispatch(getUserProfileCall(userToLoad.username));
        } else if (users.length > 0) {
            history.push(ROUTES.PAGE_NOT_EXIST);
        }
    }, [dispatch, location, users, history]);

    return (
        <div className={classes.home}>
            {currentProfile ? (
                <div>
                    <ProfileInformation user={currentProfile.user} />
                    <Divider />
                    {currentProfile && <ProfileImages profile={currentProfile} />}
                </div>
            ) : (
                <div />
            )}
        </div>
    );
}
