import { Action, applyMiddleware, compose, createStore, Store } from "redux";
import { create } from "redux-react-hook";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../sagas";

import rootReducer from "../reducers";
import { UsersState } from "../reducers/usersReducer";
import { ProfilesState } from "../reducers/profilesReducer";
import { FeedState } from "../reducers/feedReducer";
import { NotificationsState } from "../reducers/notificationsReducer";

export interface ApplicationState {
    users: UsersState;
    profiles: ProfilesState;
    feed: FeedState;
    notifications: NotificationsState;
}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

function configureStoreProduction() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(rootSaga);

    return store;
}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

function configureStoreDevelopment() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(sagaMiddleware),
            (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) || compose
        )
    );

    sagaMiddleware.run(rootSaga);

    return store;
}

const configureStore =
    (process.env.NODE_ENV || "DEVELOPMENT") === "production" ? configureStoreProduction : configureStoreDevelopment;

export default configureStore;

export const { StoreContext, useDispatch, useMappedState } = create<
    ApplicationState,
    Action,
    Store<ApplicationState, Action>
>();
