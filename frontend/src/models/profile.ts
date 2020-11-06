import User from "./user";
import Image from "./image";

export default interface Profile {
    user: User;
    images: Image[];
}
