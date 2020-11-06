import {makeStyles, Typography} from "@material-ui/core";
import React from "react";


const useStyles = makeStyles((theme) => ({
    home: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%"
    },
}));

export function OopsPage() {
    const classes = useStyles();

    return (
        <div className={classes.home}>
            <Typography variant="h4" gutterBottom>
                oopsy doopsy you're at the wrong place at the wrong time.
            </Typography>
        </div>
    );
}
