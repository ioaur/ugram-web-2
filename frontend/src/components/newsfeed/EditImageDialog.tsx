import { Dialog, DialogContent, DialogProps, TextField, makeStyles, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "../../models/image";
import UpdateImageDto from "../../api/images/dto/updateImage.dto";
import { updateImageCall } from "../../actions/feed";

interface PropsFromParent {
    open: boolean;
    close: () => void;
    image: Image;
}

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: theme.spacing(0),
        marginLeft: 0,
    },
}));

export const EditImageDialog: React.FC<PropsFromParent> = (props) => {
    const { open, close, image } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const [description, setDescription] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [mention, setMention] = useState<string>("");

    const [scroll] = React.useState<DialogProps["scroll"]>("paper");

    const handleEditImage = () => {
        let imageDto: UpdateImageDto = {
            description: description === "" ? undefined : description,
            mention: mention === "" ? undefined : mention,
            tags: tags === "" ? undefined : tags.split("#").filter((t) => t !== ""),
        };

        dispatch(updateImageCall(image.uuid, imageDto));
        close();
    };

    return (
        <Dialog open={open} onClose={close} maxWidth="md" fullWidth={true}>
            <DialogContent dividers={scroll === "paper"}>
                <TextField
                    placeholder="description"
                    label="description"
                    value={description || ""}
                    onChange={(event: any) => setDescription(event.target.value)}
                    className={classes.textField}
                    fullWidth={true}
                    multiline={true}
                />
                <TextField
                    placeholder="#tags1#tags2"
                    label="tags"
                    value={tags || ""}
                    onChange={(event: any) => setTags(event.target.value)}
                    className={classes.textField}
                    fullWidth={true}
                />
                <TextField
                    placeholder="mention"
                    label="mention"
                    value={mention || ""}
                    onChange={(event: any) => setMention(event.target.value)}
                    className={classes.textField}
                    fullWidth={true}
                />
                <Button variant="contained" onClick={handleEditImage}>
                    Edit
                </Button>
            </DialogContent>
        </Dialog>
    );
};
