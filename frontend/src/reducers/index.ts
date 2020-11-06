import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import profilesReducer from "./profilesReducer";
import { feedReducer } from "./feedReducer";
import { notificationsReducer } from "./notificationsReducer";

const rootReducer = combineReducers({
    users: usersReducer,
    profiles: profilesReducer,
    feed: feedReducer,
    notifications: notificationsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
