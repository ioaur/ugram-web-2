import {
    Column,
    Entity,
    Generated,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import { User } from "../users/users.entity";
import { Exclude } from "class-transformer";
import { Tag } from "./tags.entity";
import { ImageComment } from "./imagecomments.entity";
import { Reaction } from "./reactions.entity";

@Entity()
export class Image {
    constructor() {
        this.creationDate = new Date();
        this.url = "https://sgp1.digitaloceanspaces.com/cas-img/wp-content/uploads/2019/04/11165030/default-avatar.png";
    }

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Exclude()
    @Column()
    uploadedById: number;

    @ManyToOne(
        (type) => User,
        (user) => user.images,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "uploadedById" })
    uploadedBy: User;

    @Column({ nullable: true })
    description: string;

    @Column()
    url: string;

    @ManyToMany(
        (type) => Tag,
        (tag) => tag.images
    )
    tags: Tag[];

    @Column()
    creationDate: Date;

    @Exclude()
    @Column({ type: "int", nullable: true })
    mentionUserId: number;

    @ManyToOne((type) => User, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "mentionUserId" })
    mentionUser: User;

    @ManyToMany(
        (type) => User,
        (user) => user.imagesLiked
    )
    likes: User[];

    @OneToMany(
        (type) => Reaction,
        (reaction) => reaction.image,
        { cascade: true }
    )
    reactions: Reaction[];

    @OneToMany(
        (type) => ImageComment,
        (imageComment) => imageComment.image,
        { cascade: true }
    )
    comments: ImageComment[];
}
