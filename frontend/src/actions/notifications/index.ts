import { NotificationLevel } from "../../common/notifications";
import { DisplayNotificationAction, HideNotificationAction } from "./interfaces";

export const NOTIFICATIONS = {
    DISPLAY: "DISPLAY",
    HIDE: "HIDE",
};
const displayNotification = (message: string, level: NotificationLevel): DisplayNotificationAction => ({
    type: NOTIFICATIONS.DISPLAY,
    payload: { message: message, level: level },
});

const hideNotification = (): HideNotificationAction => ({
    type: NOTIFICATIONS.HIDE,
});

export { displayNotification, hideNotification };
