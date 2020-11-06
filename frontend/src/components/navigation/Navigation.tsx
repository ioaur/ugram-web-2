import React, { useState } from "react";
import Moment from "react-moment";
import {
    AppBar,
    fade,
    IconButton,
    makeStyles,
    Toolbar,
    Tooltip,
    Typography,
    TextField,
    Badge,
    Menu,
    ListItem,
    ListItemAvatar,
    Avatar,
    Link,
    ListItemText,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
    People,
    AccountCircle,
    Instagram as InstagramIcon,
    ExitToApp,
    CloudUpload,
    Notifications,
} from "@material-ui/icons";
import { ROUTES } from "../../common/constants";
import { useHistory } from "react-router-dom";
import { useMappedState, useDispatch } from "../../store";
import { logoutUserCall, viewNotificationsCall } from "../../actions/users";
import { fetchImages, getAutocomplete } from "../../api/images";
import { getFeedCall, setFeed } from "../../actions/feed";
import { UploadImageDialog } from "../newsfeed/UploadImageDialog";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        color: "white",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        height: 48,
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: 10,
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create("width"),
        width: "100%",
    },
    buttonContainer: {
        display: "flex",
    },
    inline: {
        display: "inline",
    },
}));

export default function Navigation() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useMappedState((state) => state.users.currentUser);

    const [searchOptions, setSearchOptions] = useState<string[]>([]);
    const [uploadImageDialogOpen, setUploadImageDialog] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const notificationMenuOpen = Boolean(anchorEl);
    const [numberOfUnseenNotifications, setNumberOfUnseenNotifications] = React.useState<number>(0);

    React.useEffect(() => {
        const nUnseenNotif = user?.notifications.filter((notif) => !notif.seen).length ?? 0;
        setNumberOfUnseenNotifications(nUnseenNotif);
    }, [user]);

    const handleViewNotifications = (event: any) => {
        openNotificationMenu(event);
        dispatch(viewNotificationsCall());
    };

    const handleNavigationClick = (route: string) => {
        dispatch(getFeedCall());
        history.push(route);
    };

    const handleLogoutClick = () => {
        history.push(ROUTES.HOME);
        dispatch(logoutUserCall());
    };

    const handleSearchOnChange = (e: any, value: any) => {
        let searchText = value;
        if (searchText !== "" && searchText !== "#") {
            refreshSearchOptions(searchText);
        }
    };

    const refreshSearchOptions = (word: string) => {
        getAutocomplete(word).then((options) => {
            setSearchOptions(options);
        });
    };

    const handleSearchEnter = (e: any, value: any) => {
        searchImages(value);
    };

    const searchImages = (searchText: string) => {
        if (searchText && searchText !== "" && searchText !== "#") {
            fetchImages(searchText).then((images) => {
                dispatch(setFeed(images));
            });
        } else {
            handleCancelSearching();
        }
    };

    const handleCancelSearching = () => {
        dispatch(getFeedCall());
    };

    const handleUploadImage = () => {
        setUploadImageDialog(true);
    };

    const closeUploadImageDialog = () => {
        setUploadImageDialog(false);
    };

    const openNotificationMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const closeNotificationMenu = () => {
        setAnchorEl(null);
    };

    const redirectToUser = (username: string) => {
        history.push(ROUTES.PROFILE + "/" + username);
    };

    const handleNavigateToUser = (user: string) => {
        closeNotificationMenu();
        redirectToUser(user);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            keepMounted
            transformOrigin={{ vertical: -100, horizontal: -100 }}
            open={notificationMenuOpen}
            onClose={closeNotificationMenu}
        >
            {user?.notifications ? (
                user?.notifications.reverse().map((notif) => {
                    return (
                        <ListItem key={notif.uuid} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar
                                    src={notif.relatedUser.profilePicture?.url}
                                    onClick={() => handleNavigateToUser(notif.relatedUser.username)}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Link onClick={() => handleNavigateToUser(notif.relatedUser.username)}>
                                        {notif.relatedUser.username}
                                    </Link>
                                }
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {" — " +
                                                (notif.message === "LIKE" ? "Liked" : "") +
                                                (notif.message === "COMMENT" ? "Commented on" : "") +
                                                (notif.message === "REACTION" ? "Reacted on" : "") +
                                                " one of your images. "}
                                        </Typography>
                                        <Moment fromNow>{notif.creationDate}</Moment>
                                    </>
                                }
                            />
                        </ListItem>
                    );
                })
            ) : (
                <ListItem alignItems="flex-start">
                    <ListItemText primary="No notifications yet..." />
                </ListItem>
            )}
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.title} onClick={() => handleNavigationClick(ROUTES.HOME)}>
                        <InstagramIcon style={{ marginRight: 5 }} />
                        <Typography variant="h6" noWrap>
                            Ugram
                        </Typography>
                    </IconButton>

                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <Autocomplete
                            id="search-autocomplete"
                            clearOnEscape
                            onInputChange={handleSearchOnChange}
                            onChange={handleSearchEnter}
                            options={searchOptions}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} placeholder="Search..." variant="outlined" />
                            )}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.buttonContainer}>
                        <IconButton edge="end" onClick={handleUploadImage} color="inherit">
                            <Tooltip title="Upload image" aria-label="Upload image">
                                <CloudUpload />
                            </Tooltip>
                        </IconButton>
                        <IconButton edge="end" onClick={handleViewNotifications} color="inherit">
                            <Tooltip title="Notifications" aria-label="Notifications">
                                <Badge badgeContent={numberOfUnseenNotifications} color="secondary">
                                    <Notifications />
                                </Badge>
                            </Tooltip>
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleNavigationClick(ROUTES.USERS)} color="inherit">
                            <Tooltip title="People" aria-label="people">
                                <People />
                            </Tooltip>
                        </IconButton>
                        <IconButton
                            edge="end"
                            onClick={() => handleNavigationClick(ROUTES.PROFILE + "/" + user?.username)}
                            color="inherit"
                        >
                            <Tooltip title="Your profile" aria-label="your profile">
                                <AccountCircle />
                            </Tooltip>
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleLogoutClick()} color="inherit">
                            <Tooltip title="Logout" aria-label="logout">
                                <ExitToApp />
                            </Tooltip>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <UploadImageDialog open={uploadImageDialogOpen} close={closeUploadImageDialog} />
            {renderMenu}
        </div>
    );
}
