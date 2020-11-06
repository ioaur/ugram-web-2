import { Dialog, DialogContent, DialogProps, Button, DialogContentText, DialogActions } from "@material-ui/core";
import React from "react";

interface PropsFromParent {
    open: boolean;
    onConfirm: () => void;
    close: () => void;
    text: string;
}

export const ConfirmationDialog: React.FC<PropsFromParent> = (props) => {
    const { open, onConfirm, close, text } = props;

    const [scroll] = React.useState<DialogProps["scroll"]>("paper");

    const handleYesDialog = () => {
        onConfirm();
        close();
    };

    const handleNoDialog = () => {
        close();
    };

    return (
        <Dialog open={open} onClose={close} maxWidth="md" fullWidth={true}>
            <DialogContent dividers={scroll === "paper"}>
                <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
                <DialogActions>
                    <Button onClick={handleNoDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={handleYesDialog} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
