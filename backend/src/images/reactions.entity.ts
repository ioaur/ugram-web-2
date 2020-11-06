import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Image } from "./images.entity";
import { User } from "../users/users.entity";

@Entity()
export class Reaction {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @ManyToMany(
        (type) => User,
        (user) => user.reactions,
        { onDelete: "CASCADE" }
    )
    users: User[];

    @Exclude()
    @Column()
    imageId: number;

    @ManyToOne(
        (type) => Image,
        (image) => image.reactions,
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "imageId" })
    image: Image;
}
