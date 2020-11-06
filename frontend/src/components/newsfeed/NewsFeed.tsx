import React, { useEffect, useCallback, useState } from "react";
import { Container, GridList, GridListTile, makeStyles, Typography, Paper } from "@material-ui/core";
import { NewsFeedImage } from "./NewsFeedImage";
import Image from "../../models/image";
import { useDispatch, useMappedState, ApplicationState } from "../../store";
import { getFeedCall, setFeed } from "../../actions/feed";
import { getFamousUsersCall } from "../../actions/users";
import UserRecommendation from "../users/UserRecommendation";
import { fetchFamousHashtag } from "../../api/hashtag";
import { fetchImages } from "../../api/images";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        marginTop: 10,
    },
    usersRecommendation: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: theme.spacing(1),
    },
    hashtagsRecommendation: {
        display: "flex",
        justifyContent: "space-around",
    },
    hashtag: {
        margin: "2px",
        cursor: "pointer",
    },
}));

export const NewsFeed: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const mapState = useCallback((state: ApplicationState) => state.feed.images, []);
    const famousUser = useMappedState((state) => state.users.famousUsers);
    const [famousHashtags, setFamousHashtags] = useState<String[]>([]);
    const images = useMappedState(mapState);

    useEffect(() => {
        dispatch(getFeedCall());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getFamousUsersCall());
    }, [dispatch]);

    useEffect(() => {
        fetchFamousHashtag().then((data) => {
            return setFamousHashtags(data);
        });
    }, []);

    const searchImages = (searchText: string) => {
        fetchImages(searchText).then((images) => {
            dispatch(setFeed(images));
        });
    };

    const imagesFeed = images.map((image: Image) => {
        return <NewsFeedImage key={image.uuid} image={image} />;
    });

    return (
        <Container maxWidth="sm">
            <div className={classes.container}>
                <GridList cellHeight={"auto"} cols={1}>
                    <Typography align={"center"}>Recommended users</Typography>
                    <div className={classes.usersRecommendation}>
                        {famousUser.map((user) => (
                            <UserRecommendation user={user} key={user.uuid} />
                        ))}
                    </div>
                    <Paper>
                        <Typography align={"center"}> Popular hashtags </Typography>
                        <div className={classes.hashtagsRecommendation}>
                            {famousHashtags.map((hashtag) => (
                                <div
                                    key={hashtag.toString()}
                                    onClick={() => searchImages("#" + hashtag)}
                                    className={classes.hashtag}
                                >
                                    {"#" + hashtag}
                                </div>
                            ))}
                        </div>
                    </Paper>
                    <GridListTile>{imagesFeed}</GridListTile>
                </GridList>
            </div>
        </Container>
    );
};
