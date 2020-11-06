import { Dialog, DialogContent, DialogProps } from "@material-ui/core";
import React from "react";
import image from "../../models/image";
import { NewsFeedImage } from "../newsfeed/NewsFeedImage";

interface PropsFromParent {
    open: boolean;
    close: () => void;
    image: image;
}

export const ImageDialog: React.FC<PropsFromParent> = (props) => {
    const { open, close, image } = props;

    const [scroll] = React.useState<DialogProps["scroll"]>("paper");

    return (
        <Dialog open={open} onClose={close}>
            <DialogContent dividers={scroll === "paper"}>
                <NewsFeedImage image={image} />
            </DialogContent>
        </Dialog>
    );
};
