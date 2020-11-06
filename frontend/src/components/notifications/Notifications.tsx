import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { ApplicationState, useMappedState, useDispatch } from "../../store";
import { hideNotification } from "../../actions/notifications";
import NotificationIcon from "./NotificationIcon";

const useStyles = makeStyles((theme: Theme) => ({
    Success: {
        backgroundColor: theme.palette.success.main,
    },
    Error: {
        backgroundColor: theme.palette.error.dark,
    },
    Info: {
        backgroundColor: theme.palette.primary.dark,
    },
    Warning: {
        backgroundColor: theme.palette.warning.main,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: "flex",
        alignItems: "center",
    },
}));

export default function Notifications() {
    const classes = useStyles();
    const notifications = useMappedState((state: ApplicationState) => state.notifications);
    const dispatch = useDispatch();

    const handleClose = (event: React.SyntheticEvent<any, Event>, reason: string) => {
        if (reason === "clickaway") {
            return;
        }

        dispatch(hideNotification());
    };

    const handleCloseIcon = () => {
        dispatch(hideNotification());
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={notifications.display}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <SnackbarContent
                className={classes[notifications.level]}
                message={
                    <span className={classes.message}>
                        <NotificationIcon level={notifications.level} />
                        {notifications.message}
                    </span>
                }
                action={[
                    <IconButton key="close" color="inherit" onClick={handleCloseIcon}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}
