import { User } from "../users/users.entity";
import { Image } from "../images/images.entity";

export class Profile {
    constructor(user: User, images: Image[]) {
        this.user = user;
        this.images = images.filter((image) => user.profilePictureId != image.id);
    }

    readonly user: User;
    readonly images: Image[];
}
