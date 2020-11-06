import { BaseAction } from "../../common";
import { NotificationLevel } from "../../common/notifications";

export interface DisplayNotificationAction extends BaseAction {
    payload: {
        message: string;
        level: NotificationLevel;
    };
}

export interface HideNotificationAction extends BaseAction {}
