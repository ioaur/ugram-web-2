import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import {
    Avatar,
    Box,
    Card,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Button,
    CardContent,
    CardActions,
    Collapse,
    Tooltip,
    TextField,
} from "@material-ui/core";
import {
    Favorite,
    FavoriteBorder,
    Message,
    PlayCircleOutline,
    PlayCircleFilled,
    PeopleOutline,
    People,
    Help,
    HelpOutline,
} from "@material-ui/icons";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Image from "../../models/image";
import { useMappedState, useDispatch } from "../../store";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { ROUTES } from "../../common/constants";
import { useHistory } from "react-router-dom";
import { EditImageDialog } from "./EditImageDialog";
import { deleteImageCall, likeImageCall, commentImageCall, reactionImageCall } from "../../actions/feed";
import { ConfirmationDialog } from "../common/ConfirmationDialog";
import CreateImageCommentDto from "../../api/images/dto/createImageCommentDto";

const useStyles = makeStyles((theme) => ({
    description: {
        padding: 10,
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    hashtags: {
        marginRight: 10,
        paddingLeft: 10,
    },
    card: {
        padding: 10,
        marginTop: 10,
    },
    cardmedia: {
        msMaxHeight: "100%",
        msMaxWidth: "100%",
    },
    addComment: {
        color: theme.palette.success.main,
    },
}));

interface PropsFromParent {
    image: Image;
}

export const NewsFeedImage: React.FC<PropsFromParent> = (props) => {
    const { image } = props;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useMappedState((state) => state.users.currentUser);

    const [editImageDialogOpen, setEditImageDialog] = useState<boolean>(false);
    const [confirmationDialogOpen, setDeleteConfirmationDialogOpen] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);

    const [currentComment, setCurrentComment] = useState<string>("");
    const [isImageLiked, setIsImageLiked] = useState<boolean>(false);
    const [isImageReaction1, setIsImageReaction1] = useState<boolean>(false);
    const [isImageReaction2, setIsImageReaction2] = useState<boolean>(false);
    const [isImageReaction3, setIsImageReaction3] = useState<boolean>(false);

    const [showCommentField, setShowCommentField] = useState<boolean>(false);

    useEffect(() => {
        const imgLiked = image.likes?.filter((u) => u.uuid === user?.uuid).length !== 0;
        setIsImageLiked(imgLiked);

        const imgReaction1 =
            image.reactions?.filter((r) => r.value === 1).length > 0
                ? image.reactions?.filter((r) => r.value === 1)[0].users.filter((u) => u.uuid === user?.uuid).length !==
                  0
                : false;
        setIsImageReaction1(imgReaction1);

        const imgReaction2 =
            image.reactions?.filter((r) => r.value === 2).length > 0
                ? image.reactions?.filter((r) => r.value === 2)[0].users.filter((u) => u.uuid === user?.uuid).length !==
                  0
                : false;
        setIsImageReaction2(imgReaction2);

        const imgReaction3 =
            image.reactions?.filter((r) => r.value === 3).length > 0
                ? image.reactions?.filter((r) => r.value === 3)[0].users.filter((u) => u.uuid === user?.uuid).length !==
                  0
                : false;
        setIsImageReaction3(imgReaction3);
    }, [image.likes, user, image.reactions]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        setShowCommentField(!showCommentField);
    };

    const hashtags = image.tags.map((tag) => {
        return (
            <span key={tag.value} className={classes.hashtags}>
                #{tag.value}
            </span>
        );
    });

    const redirectToUser = (username: string) => {
        history.push(ROUTES.PROFILE + "/" + username);
    };

    const mentions = image.mentionUser ? (
        <Button
            onClick={() => redirectToUser(image.mentionUser ? image.mentionUser.username : "")}
            key={image.mentionUser.uuid}
        >
            <Typography>{`@${image.mentionUser.username}`}</Typography>
        </Button>
    ) : (
        ""
    );

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleLikeImage = () => {
        dispatch(likeImageCall(image.uuid));
    };

    const handleReaction1Image = () => {
        dispatch(reactionImageCall(image.uuid, 1));
    };

    const handleReaction2Image = () => {
        dispatch(reactionImageCall(image.uuid, 2));
    };

    const handleReaction3Image = () => {
        dispatch(reactionImageCall(image.uuid, 3));
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuEditImage = () => {
        setEditImageDialog(true);
        handleMenuClose();
    };

    const handleOnConfirmDeleteImage = () => {
        dispatch(deleteImageCall(image.uuid));
        handleMenuClose();
    };

    const handleMenuToProfile = () => {
        redirectToUser(image.uploadedBy.username);
    };

    const handleSubmitCurrentComment = () => {
        const createImageCommentDto: CreateImageCommentDto = {
            message: currentComment,
        };

        if (createImageCommentDto.message.length > 0) {
            dispatch(commentImageCall(image.uuid, createImageCommentDto));
        }
    };

    if (user) {
        return (
            <Card className={classes.card} variant={"outlined"}>
                <CardHeader
                    action={
                        <Box hidden={image.uploadedBy.uuid !== user.uuid}>
                            <IconButton
                                size={"small"}
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreHorizIcon fontSize={"small"} />
                            </IconButton>
                        </Box>
                    }
                    subheader={image.uploadedBy.username}
                    avatar={<Avatar src={image.uploadedBy.profilePicture ? image.uploadedBy.profilePicture.url : ""} />}
                />

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuToProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleMenuEditImage}>Edit</MenuItem>
                    <MenuItem onClick={() => setDeleteConfirmationDialogOpen(true)}>Delete</MenuItem>
                </Menu>

                <CardMedia className={classes.cardmedia} component="img" src={image.url} />

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: "justify" }}>
                        {image.description}
                    </Typography>
                </CardContent>

                <Grid container>
                    <Grid item xs={12}>
                        {hashtags}
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        {mentions}
                    </Grid>
                </Grid>

                <CardActions disableSpacing>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {image.likes?.length}
                    </Typography>
                    <IconButton onClick={handleLikeImage}>
                        <Tooltip title={isImageLiked ? "Unlike" : "Like"} aria-label={isImageLiked ? "Unlike" : "Like"}>
                            {isImageLiked ? <Favorite /> : <FavoriteBorder />}
                        </Tooltip>
                    </IconButton>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {image.reactions?.filter((x) => x.value === 1).length > 0
                            ? image.reactions?.filter((x) => x.value === 1)[0].users?.length
                            : 0}
                    </Typography>
                    <IconButton onClick={handleReaction1Image}>
                        <Tooltip
                            title={isImageReaction1 ? "Unreaction" : "Reaction"}
                            aria-label={isImageReaction1 ? "Unreaction" : "Reaction"}
                        >
                            {isImageReaction1 ? <PlayCircleFilled /> : <PlayCircleOutline />}
                        </Tooltip>
                    </IconButton>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {image.reactions?.filter((x) => x.value === 2).length > 0
                            ? image.reactions?.filter((x) => x.value === 2)[0].users?.length
                            : 0}
                    </Typography>
                    <IconButton onClick={handleReaction2Image}>
                        <Tooltip
                            title={isImageReaction2 ? "Unreaction" : "Reaction"}
                            aria-label={isImageReaction2 ? "Unreaction" : "Reaction"}
                        >
                            {isImageReaction2 ? <People /> : <PeopleOutline />}
                        </Tooltip>
                    </IconButton>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {image.reactions?.filter((x) => x.value === 3).length > 0
                            ? image.reactions?.filter((x) => x.value === 3)[0].users?.length
                            : 0}
                    </Typography>
                    <IconButton onClick={handleReaction3Image}>
                        <Tooltip
                            title={isImageReaction3 ? "Unreaction" : "Reaction"}
                            aria-label={isImageReaction3 ? "Unreaction" : "Reaction"}
                        >
                            {isImageReaction3 ? <Help /> : <HelpOutline />}
                        </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => setShowCommentField(!showCommentField)}>
                        <Tooltip title="Add comment" aria-label="Add comment">
                            <Message />
                        </Tooltip>
                    </IconButton>
                    {image.comments.length !== 0 && (
                        <>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                style={{ marginLeft: "auto" }}
                            >
                                {!expanded ? `view comments (${image.comments.length})` : "hide comments"}
                            </Typography>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </>
                    )}
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {image.comments.map((comment) => {
                            return (
                                <Grid container wrap="nowrap" spacing={2} key={comment.uuid}>
                                    <Grid item>
                                        <Avatar
                                            alt="User avatar"
                                            src={comment.user.profilePicture ? comment.user.profilePicture.url : ""}
                                            onClick={() => redirectToUser(comment.user.username)}
                                        />
                                    </Grid>
                                    <Grid style={{ justifyContent: "left" }} item xs zeroMinWidth>
                                        <h4 style={{ margin: 0, textAlign: "left" }}> {comment.user.username}</h4>
                                        <p style={{ textAlign: "justify" }}>{comment.message + " "}</p>
                                        <p style={{ textAlign: "left", color: "gray" }}>
                                            <Moment fromNow>{comment.creationDate}</Moment>
                                        </p>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </CardContent>
                </Collapse>

                <Collapse in={showCommentField} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid container spacing={2} wrap="nowrap">
                            <Grid item>
                                <Avatar src={user.profilePicture?.url} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <TextField
                                    id="input-with-icon-grid"
                                    label="Your comment..."
                                    style={{ width: "100%" }}
                                    value={currentComment}
                                    onChange={(event: any) => setCurrentComment(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <div style={{ marginTop: 10 }}>
                            <Button
                                variant="outlined"
                                className={classes.addComment}
                                onClick={handleSubmitCurrentComment}
                            >
                                Post
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ marginLeft: 8 }}
                                onClick={() => setCurrentComment("")}
                            >
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Collapse>

                <EditImageDialog open={editImageDialogOpen} close={() => setEditImageDialog(false)} image={image} />
                <ConfirmationDialog
                    open={confirmationDialogOpen}
                    onConfirm={handleOnConfirmDeleteImage}
                    close={() => setDeleteConfirmationDialogOpen(false)}
                    text="Do you want to delete this image?"
                />
            </Card>
        );
    }
    return <Card className={classes.card} variant={"outlined"} />;
};
