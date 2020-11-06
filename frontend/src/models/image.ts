import User from "./user";
import ImageComment from "./imageComment";

interface tag {
    value: string;
}

interface reaction {
    value: number;
    users: User[];
}

export default interface Image {
    uuid: string;
    url: string;
    description?: string;
    tags: tag[];
    creationDate: Date;
    mentionUser?: User;
    uploadedBy: User;
    likes: User[];
    reactions: reaction[];
    comments: ImageComment[];
}
