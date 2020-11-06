import { makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import User from "../../models/user";
import Button from "@material-ui/core/Button";
import UpdateUserDto from "../../api/users/dto/updateUser.dto";
import { useMappedState, useDispatch } from "../../store";
import { updateUserCall, deleteUserCall } from "../../actions/users";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../common/constants";
import { ConfirmationDialog } from "../common/ConfirmationDialog";

const useStyles = makeStyles((theme) => ({
    home: {
        display: "flex",
        padding: theme.spacing(5),
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    },
    photoContainer: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    photo: {
        borderRadius: "50%",
    },
    information: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 2,
    },
    edit: {
        display: "flex",
    },
    textField: {
        margin: theme.spacing(1),
        marginLeft: 0,
    },
    deleteProfileButton: {
        backgroundColor: theme.palette.error.main,
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    editProfileButton: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
}));

interface PropsFromParent {
    user: User;
}

export const ProfileInformation: React.FC<PropsFromParent> = (props) => {
    const classes = useStyles();
    const { user } = props;

    const currentUser = useMappedState((state) => state.users.currentUser);
    const dispatch = useDispatch();
    const history = useHistory();

    const [confirmationDialogOpen, setConfirmationDialog] = useState<boolean>(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isEditModeActivated, setIsEditModeActivated] = useState<Boolean>(false);

    const handleToggleEditMode = () => {
        const updatedUser: UpdateUserDto = {
            firstname: firstname !== "" ? firstname : undefined,
            lastname: lastname !== "" ? lastname : undefined,
            email: email !== "" ? email : undefined,
            phoneNumber: phoneNumber !== "" ? phoneNumber : undefined,
        };

        setIsEditModeActivated(!isEditModeActivated);
        if (isEditModeActivated) {
            dispatch(updateUserCall(updatedUser));
        }
    };

    const handleDeleteAccount = () => {
        handleMenuConfirmationAccount();
    };

    const handleOnConfirmDeleteAccount = () => {
        history.push(ROUTES.HOME);
        dispatch(deleteUserCall());
    };

    const handleMenuConfirmationAccount = () => {
        setConfirmationDialog(true);
    };

    const closeConfirmationDialog = () => {
        setConfirmationDialog(false);
    };

    React.useEffect(() => {
        setLastname(props.user.lastname);
        setFirstname(props.user.firstname);
        setEmail(props.user.email);
        setPhoneNumber(props.user.phoneNumber || "");
    }, [props.user.firstname, props.user.lastname, props.user.phoneNumber, props.user.email]);

    return (
        <div className={classes.home}>
            <div className={classes.photoContainer}>
                <img
                    src={user.profilePicture ? user.profilePicture.url : ""}
                    className={classes.photo}
                    height={128}
                    width={128}
                    alt={""}
                />
            </div>
            <div className={classes.information}>
                <div className={classes.edit}>
                    <div>{user.username}</div>
                </div>
                <TextField
                    placeholder="firstname"
                    label="first name"
                    disabled={!isEditModeActivated}
                    value={firstname || ""}
                    onChange={(event: any) => setFirstname(event.target.value)}
                    className={classes.textField}
                    size="small"
                />

                <TextField
                    placeholder="lastname"
                    label="last name"
                    disabled={!isEditModeActivated}
                    value={lastname || ""}
                    onChange={(event: any) => setLastname(event.target.value)}
                    className={classes.textField}
                    size="small"
                />
                <TextField
                    placeholder="email"
                    label="email"
                    disabled={!isEditModeActivated}
                    value={email || ""}
                    onChange={(event: any) => setEmail(event.target.value)}
                    className={classes.textField}
                    size="small"
                />
                <TextField
                    placeholder="phone"
                    label="phone"
                    disabled={!isEditModeActivated}
                    value={phoneNumber || ""}
                    onChange={(event: any) => setPhoneNumber(event.target.value)}
                    className={classes.textField}
                    size="small"
                />
                <div>registration date: {new Date(user.registrationDate).toDateString()} </div>
            </div>
            {currentUser && currentUser.uuid === user.uuid && (
                <div>
                    <Button variant="contained" className={classes.editProfileButton} onClick={handleToggleEditMode}>
                        {isEditModeActivated ? "Save Profile" : "Edit Profile"}
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.deleteProfileButton}
                        startIcon={<DeleteIcon />}
                        onClick={handleDeleteAccount}
                    >
                        Delete Profile
                    </Button>
                </div>
            )}
            <ConfirmationDialog
                open={confirmationDialogOpen}
                onConfirm={handleOnConfirmDeleteAccount}
                close={closeConfirmationDialog}
                text="Do you want to delete your account?"
            />
        </div>
    );
};
