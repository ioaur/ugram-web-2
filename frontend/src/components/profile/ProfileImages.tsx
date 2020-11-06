import { Card, CardMedia, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Image from "../../models/image";
import Grid from "@material-ui/core/Grid";
import { ImageDialog } from "./ImageDialog";
import CardActionArea from "@material-ui/core/CardActionArea";
import Profile from "../../models/profile";

const useStyles = makeStyles((theme) => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    cardMedia: {
        paddingTop: "56.25%", // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

interface props {
    profile: Profile;
}

export function ProfileImages(props: props) {
    const classes = useStyles();
    const { profile } = props;

    const [imageDialogOpen, setImageDialog] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<string>();

    const openImageDialog = (imageUuid: string) => {
        setCurrentImage(imageUuid);
        setImageDialog(true);
    };

    const closeImageDialog = () => {
        setImageDialog(false);
    };

    return (
        <Container className={classes.cardGrid}>
            <Grid container spacing={4}>
                {profile.images.map((image) => (
                    <Grid key={image.uuid} item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardActionArea onClick={() => openImageDialog(image.uuid)}>
                                <CardMedia className={classes.cardMedia} image={image.url} title="Image title" />
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {currentImage && (
                <ImageDialog
                    open={imageDialogOpen}
                    close={closeImageDialog}
                    image={profile.images.find((im) => im.uuid === currentImage) as Image}
                />
            )}
        </Container>
    );
}
