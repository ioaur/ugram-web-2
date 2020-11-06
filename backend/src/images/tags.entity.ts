import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Image } from "./images.entity";

@Entity()
export class Tag {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToMany(
        (type) => Image,
        (image) => image.tags
    )
    @JoinTable()
    images: Image[];
}
