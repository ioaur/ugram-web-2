import { Dialog, DialogContent, DialogProps, TextField, makeStyles, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CreateImageDto from "../../api/images/dto/createImage.dto";
import { createImageCall } from "../../actions/feed";
import { uploadImageToS3 } from "../../api/images";
import { imageResize } from "../../helper/imageHelper";

interface PropsFromParent {
    open: boolean;
    close: () => void;
}

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: theme.spacing(0),
        marginLeft: 0,
    },
    imageContainer: {
        height: "40%",
        width: "40%",
    },
}));

export const UploadImageDialog: React.FC<PropsFromParent> = (props) => {
    const { open, close } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const [description, setDescription] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [imagePayload, setImagePayload] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [mention, setMention] = useState<string>("");

    const [scroll] = React.useState<DialogProps["scroll"]>("paper");

    const handleUploadImage = () => {
        if (imagePayload === "") return;

        let imageDto: CreateImageDto = {
            url: url,
            description: description,
            mention: mention === "" ? undefined : mention,
            tags: tags === "" ? undefined : tags.split("#").filter((t) => t !== ""),
        };
        dispatch(createImageCall(imageDto));
        close();
    };

    const onFileSelected = (event: any) => {
        let selectedFile = event.target.files[0];
        let reader = new FileReader();

        let imgtag: HTMLImageElement = document.getElementById("imageContainer") as HTMLImageElement;
        if (imgtag) {
            imgtag.title = selectedFile.name;
            reader.onload = function(e) {
                //@ts-ignore
                imgtag.src = e.target.result;
                imgtag.onload = function() {
                    let dataurl = imageResize(imgtag);
                    let base64Image = dataurl.split(",")[1];
                    setImagePayload(base64Image);
                    uploadImageToS3(base64Image).then((s3Url) => {
                        setUrl(s3Url);
                    });
                };
            };

            reader.readAsDataURL(selectedFile);
        }
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
                    placeholder="tags"
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
                <input type="file" onChange={onFileSelected}></input>
                <img className={classes.imageContainer} id="imageContainer" alt="" />
                <Button variant="contained" onClick={handleUploadImage}>
                    Upload
                </Button>
            </DialogContent>
        </Dialog>
    );
};
