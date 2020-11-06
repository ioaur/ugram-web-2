import { ProfilePicture } from "./profilePicture";
import UserNotification from "./userNotification";

export default interface User {
    uuid: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber?: string;
    registrationDate: Date;
    profilePicture?: ProfilePicture;
}

export interface CurrentUser extends User {
    notifications: UserNotification[];
}
