import { Image } from "../images/images.entity";

export class Feed {
    constructor(images: Image[]) {
        this.images = images;
    }

    readonly images: Image[];
}
