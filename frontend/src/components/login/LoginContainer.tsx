import { makeStyles, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import GoogleButton from "react-google-button";
import classNames from "classnames";
import { authenticateWithGoogle } from "../../api/authentication";

const useStyles = makeStyles((theme) => ({
    home: {
        display: "flex",
    },
    root: {
        height: "100vh",
        width: "100vw",
        textAlign: "center",
        alignContent: "flex-start",
        display: "flex",
        flexFlow: "column nowrap",
        backgroundColor: "#6d6f7157",
    },
    googleButton: { margin: "auto" },
    header: {
        background: `linear-gradient(65deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        backgroundSize: "cover",
        height: "30vh",
        width: "100%",
        minHeight: "230px",
    },
    flexAuto: {
        flexBasis: "auto",
        flexGrow: 1,
    },
    mainContainer: {
        marginTop: "-260px",
    },
    flex: {
        display: "flex",
    },
    centerAlign: {
        alignItems: "center",
        justifyContent: "center",
    },
    splashContainer: {
        width: "544px",
        paddingTop: "100px",
        paddingBottom: "50px",
    },
    splashBox: {
        height: "35vh",
        position: "relative",
        textAlign: "center",
    },
    loginText: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        paddingTop: "50px",
        paddingBottom: "30px",
        fontSize: "24px",
        color: theme.palette.primary.main,
    },
    splashFooter: {
        minHeight: "45px",
        padding: "10px 20px 10px",
        background: `linear-gradient(65deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
    },
    footerText: {
        color: "white",
        lineHeight: "45px",
    },
}));

function LoginContainer() {
    const classes = useStyles();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        persistJWT();
    });

    const persistJWT = () => {
        const pathParts = location.pathname.split("success/");

        if (pathParts.length === 2) {
            localStorage.setItem("jwt", pathParts[1]);
            setIsAuthenticated(true);
        }
    };

    return (
        <div className={classes.home}>
            {isAuthenticated ? (
                <Redirect to="/" />
            ) : (
                <div className={classes.root}>
                    <header className={classes.header} />
                    <div className={classes.flexAuto}>
                        <div className={classNames(classes.flex, classes.mainContainer, classes.centerAlign)}>
                            <div className={classes.splashContainer}>
                                <Paper className={classes.splashBox}>
                                    <h1 className={classes.loginText}>Log into Ugram</h1>
                                    <GoogleButton className={classes.googleButton} onClick={authenticateWithGoogle} />
                                </Paper>
                            </div>
                        </div>
                    </div>
                    <footer className={classes.splashFooter}>
                        <span className={classes.footerText}>
                            {`© ${new Date().getFullYear()} `}
                            <div className={classes.footerText}>Ugram @ All Rights Reserved.</div>
                        </span>
                    </footer>
                </div>
            )}
        </div>
    );
}

export default LoginContainer;
