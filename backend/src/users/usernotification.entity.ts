import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { User } from "../users/users.entity";
import { Image } from "../images/images.entity";

@Entity()
export class UserNotification {
    constructor() {
        this.creationDate = new Date();
        this.seen = false;
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

    @Column()
    seen: Boolean;

    @ManyToOne((type) => Image, { cascade: true, nullable: true, onDelete: "SET NULL" })
    @JoinColumn()
    image: Image;

    @ManyToOne((type) => User, { cascade: true, nullable: true, onDelete: "SET NULL" })
    @JoinColumn()
    relatedUser: User;

    @Exclude()
    @Column()
    userId: number;

    @ManyToOne(
        (type) => User,
        (user) => user.notifications,
        { cascade: true, onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "userId" })
    user: User;
}
