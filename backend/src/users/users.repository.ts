import { EntityRepository, Repository } from "typeorm";
import { User } from "./users.entity";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { Image } from "../images/images.entity";
import { SearchUserDto } from "./dto/searchUser.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ERROR } from "../common/code.errors";
import { UserNotification } from "./usernotification.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.manager.transaction(async (transactionalEntityManager) => {
            const user = new User();
            user.googleid = createUserDto.googleid;
            user.email = createUserDto.email;
            user.firstname = createUserDto.firstname;
            user.lastname = createUserDto.lastname || ".";
            user.phoneNumber = createUserDto.phoneNumber;
            user.username = createUserDto.username;
            await transactionalEntityManager.save(user);

            const profilePicture = new Image();
            profilePicture.uploadedBy = user;
            profilePicture.url = createUserDto.profilePictureUrl;
            await transactionalEntityManager.save(profilePicture);

            user.profilePicture = profilePicture;
            await transactionalEntityManager.save(user);

            return await this.findOne({ where: { uuid: user.uuid }, relations: ["profilePicture"] });
        });
    }

    async updateAllUserNotificationsToSeen(userId: number) {
        const user = await this.findOne(userId, {
            relations: [
                "profilePicture",
                "notifications",
                "notifications.relatedUser",
                "notifications.relatedUser.profilePicture",
                "notifications.user",
                "notifications.user.profilePicture",
                "notifications.image",
                "notifications.image.likes",
                "notifications.image.reactions",
                "notifications.image.reactions.users",
            ],
        });
        user.notifications.forEach((n) => {
            n.seen = true;
            this.manager.save<UserNotification>(n);
        });

        return user;
    }

    async updateProfilePicture(id: string, profilePicture: Image): Promise<User> {
        const user = await this.findOne({ where: { id }, relations: ["profilePicture"] });
        if (!user) {
            throw new HttpException(ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        if (!profilePicture) {
            throw new HttpException(ERROR.IMAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        user.profilePicture = profilePicture;
        return this.save(user);
    }

    async updateUser(uuid: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne({ where: { uuid } });
        if (!user) {
            throw new HttpException(ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        if (updateUserDto.email) {
            user.email = updateUserDto.email;
        }
        if (updateUserDto.firstname) {
            user.firstname = updateUserDto.firstname;
        }
        if (updateUserDto.lastname) {
            user.lastname = updateUserDto.lastname;
        }
        if (updateUserDto.phoneNumber) {
            user.phoneNumber = updateUserDto.phoneNumber;
        }
        return await this.save(user);
    }

    async updateByGoogleId(googleId: any, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne({ where: { googleid: googleId } });
        if (!user) {
            throw new HttpException(ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        if (updateUserDto.email) {
            user.email = updateUserDto.email;
        }
        if (updateUserDto.firstname) {
            user.firstname = updateUserDto.firstname;
        }
        if (updateUserDto.lastname) {
            user.lastname = updateUserDto.lastname;
        }
        if (updateUserDto.phoneNumber) {
            user.phoneNumber = updateUserDto.phoneNumber;
        }
        return await this.save(user);
    }

    async deleteByGoogleId(googleId: any): Promise<User> {
        const user = await this.findOne({ where: { googleid: googleId } });
        if (!user) {
            throw new HttpException(ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        await this.delete(user.id);
        return user;
    }

    async findUserById(uuid: string): Promise<User> {
        const user = await this.findOne({ where: { uuid }, relations: ["profilePicture"] });
        if (!user) {
            throw new HttpException(ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async findUserByUsername(username: string): Promise<User> {
        const user = await this.findOne({ where: { username }, relations: ["profilePicture"] });
        if (!user) {
            throw new HttpException(ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async findUserByGoogleId(googleId: string) {
        const user = await this.findOne({
            where: { googleid: googleId },
            relations: [
                "profilePicture",
                "notifications",
                "notifications.relatedUser",
                "notifications.relatedUser.profilePicture",
                "notifications.image",
                "notifications.image.likes",
                "notifications.image.reactions",
                "notifications.image.reactions.users",
            ],
        });
        return user;
    }

    async findAll(search: SearchUserDto): Promise<User[]> {
        const query = this.buildWhereQuery(search);
        return await this.find({ where: query, relations: ["profilePicture"] });
    }

    async getFamousUsers() {
        const users = await this.find({
            relations: ["images", "images.likes", "images.reactions", "images.reactions.users", "profilePicture"],
        });
        const usersSorted = users.sort(
            (a, b) =>
                b.images.map((i) => i.likes.length).reduce((la, lb) => lb + la) -
                a.images.map((i) => i.likes.length).reduce((la, lb) => lb + la)
        );
        return usersSorted.slice(0, 3).map((t) => t);
    }

    private buildWhereQuery(search: SearchUserDto): UsersWhereQuery {
        const query: UsersWhereQuery = {};
        if (search.username) {
            query.username = search.username;
        }
        if (search.lastname) {
            query.lastname = search.lastname;
        }
        if (search.firstname) {
            query.firstname = search.firstname;
        }
        if (search.email) {
            query.email = search.email;
        }
        if (search.phoneNumber) {
            query.phoneNumber = search.phoneNumber;
        }
        return query;
    }
}

interface UsersWhereQuery {
    username?: string;
    lastname?: string;
    firstname?: string;
    email?: string;
    phoneNumber?: string;
}
