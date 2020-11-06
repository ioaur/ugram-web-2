import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Image } from "./images.entity";
import { User } from "../users/users.entity";

@Entity()
export class ImageComment {
    constructor() {
        this.creationDate = new Date();
    }

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Column()
    creationDate: Date;

    @Column({ length: 500 })
    message: string;

    @Exclude()
    @Column()
    imageId: number;

    @ManyToOne(
        (type) => Image,
        (image) => image.comments,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "imageId" })
    image: Image;

    @Exclude()
    @Column()
    userId: number;

    @ManyToOne(
        (type) => User,
        (user) => user.comments,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "userId" })
    user: User;
}
