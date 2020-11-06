import { Reducer } from "redux";
import { NotificationLevel } from "../common/notifications";
import { NOTIFICATIONS } from "../actions/notifications";
import { BaseAction } from "../common";

export type NotificationsState = Readonly<{
    message: string;
    level: NotificationLevel;
    display: boolean;
}>;

const initialState: NotificationsState = {
    message: "",
    level: NotificationLevel.Info,
    display: false,
};

export const notificationsReducer: Reducer<NotificationsState> = (state = initialState, action: BaseAction) => {
    switch (action.type) {
        case NOTIFICATIONS.DISPLAY:
            return {
                ...state,
                message: action.payload.message,
                level: action.payload.level,
                display: true,
            };
        case NOTIFICATIONS.HIDE:
            return {
                ...state,
                display: false,
            };
        default:
            return state;
    }
};
