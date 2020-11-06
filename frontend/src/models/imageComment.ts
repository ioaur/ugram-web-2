import User from "./user";

export default interface ImageComment {
    uuid: string;
    creationDate: Date;
    message: string;
    user: User;
}
