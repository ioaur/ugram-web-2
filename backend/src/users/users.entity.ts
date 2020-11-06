import {
    Column,
    Entity,
    Generated,
    Index,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    ManyToOne,
    ManyToMany,
    JoinTable,
    AfterLoad,
    AfterUpdate,
} from "typeorm";
import { Image } from "../images/images.entity";
import { Exclude } from "class-transformer";
import { ImageComment } from "../images/imagecomments.entity";
import { UserNotification } from "./usernotification.entity";
import { Reaction } from "../images/reactions.entity";

@Entity()
export class User {
    constructor() {
        this.registrationDate = new Date();
    }

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Exclude()
    @Column()
    googleid: string;

    @Column({ length: 50, unique: true })
    username: string;

    @Column({ length: 50 })
    firstname: string;

    @Column({ length: 50 })
    lastname: string;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 50, nullable: true })
    phoneNumber: string;

    @Column()
    registrationDate: Date;

    @Exclude()
    @Column({ type: "int", nullable: true })
    profilePictureId: number;

    @OneToOne((type) => Image, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "profilePictureId" })
    profilePicture: Image;

    @OneToMany(
        (type) => Image,
        (image) => image.uploadedBy,
        { cascade: true, onDelete: "CASCADE" }
    )
    images: Image[];

    @OneToMany(
        (type) => ImageComment,
        (imageComment) => imageComment.user,
        { cascade: true, onDelete: "CASCADE" }
    )
    comments: ImageComment[];

    @ManyToMany(
        (type) => Image,
        (image) => image.likes,
        { cascade: true }
    )
    @JoinTable()
    imagesLiked: Image[];

    @ManyToMany(
        (type) => Reaction,
        (reaction) => reaction.users,
        { cascade: true, onDelete: "CASCADE" }
    )
    @JoinTable()
    reactions: Reaction[];

    @OneToMany(
        (type) => UserNotification,
        (userNotification) => userNotification.user,
        { onDelete: "CASCADE" }
    )
    notifications: UserNotification[];

    @AfterLoad()
    afterLoad = () => this.parseEntity();

    @AfterUpdate()
    afterUpdate = () => this.parseEntity();

    parseEntity = () => {
        this.notifications = this.notifications?.filter((x) => x.relatedUser !== null);
    };
}
