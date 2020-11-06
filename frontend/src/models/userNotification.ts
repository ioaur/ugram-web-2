import Image from "./image";
import User from "./user";

export default interface UserNotification {
    creationDate: Date;
    seen: boolean;
    uuid: string;
    message: string;
    relatedUser: User;
    image: Image;
}
