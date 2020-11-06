import React, { useEffect } from "react";
import Navigation from "./components/navigation/Navigation";
import { Container, MuiThemeProvider } from "@material-ui/core";
import { theme } from "./MuiTheme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProfileContainer } from "./components/profile/ProfileContainer";
import { ROUTES } from "./common/constants";
import { NewsFeed } from "./components/newsfeed/NewsFeed";
import { useMappedState, useDispatch } from "./store";
import LoginContainer from "./components/login/LoginContainer";
import UsersContainer from "./components/users/UsersContainer";
import { fetchMeCall } from "./actions/users";
import { OopsPage } from "./components/OopsPage";
import Notifications from "./components/notifications/Notifications";

const FIVE_SECONDS_IN_MILISECONDS = 5000;

const App: React.FC = () => {
    const user = useMappedState((state) => state.users.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (!user && jwt) {
            dispatch(fetchMeCall());
        }
    }, [user, dispatch]);

    useEffect(() => {
        setInterval(() => {
            const jwt = localStorage.getItem("jwt");
            if (!user && jwt) {
                dispatch(fetchMeCall());
            }
        }, FIVE_SECONDS_IN_MILISECONDS);
    }, [dispatch]);

    return (
        <MuiThemeProvider theme={theme}>
            <Notifications />
            <Router>
                {!user ? (
                    <>
                        <Route>
                            <LoginContainer />
                        </Route>
                    </>
                ) : (
                    <>
                        <Navigation />
                        <Container>
                            <Switch>
                                <Route exact path={ROUTES.HOME}>
                                    <NewsFeed />
                                </Route>
                                <Route path={ROUTES.PROFILE}>
                                    <ProfileContainer />
                                </Route>
                                <Route path={ROUTES.USERS}>
                                    <UsersContainer />
                                </Route>
                                <Route path={ROUTES.PAGE_NOT_EXIST}>
                                    <OopsPage />
                                </Route>
                            </Switch>
                        </Container>
                    </>
                )}
            </Router>
        </MuiThemeProvider>
    );
};

export default App;
