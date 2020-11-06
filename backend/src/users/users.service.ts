import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UsersRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Image } from "../images/images.entity";
import { SearchUserDto } from "./dto/searchUser.dto";
import { Profile } from "passport-google-oauth20";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository
    ) {}

    async create(profile: Profile): Promise<User> {
        const email = profile.emails[0].value;
        const username = profile.username || email.split("@")[0] + Math.floor(Math.random() * 100);
        const profilePictureUrl = profile.photos[0].value;

        const createUserDto: CreateUserDto = {
            googleid: profile.id,
            username: username,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: email,
            profilePictureUrl: profilePictureUrl,
        };

        return this.usersRepository.createUser(createUserDto);
    }

    async updateProfilePicture(id: string, profilePicture: Image): Promise<User> {
        return this.usersRepository.updateProfilePicture(id, profilePicture);
    }

    async updateUser(uuid: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersRepository.updateUser(uuid, updateUserDto);
    }

    async updateByGoogleId(googleId: any, updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersRepository.updateByGoogleId(googleId, updateUserDto);
    }

    async deleteByGoogleId(googleId: any): Promise<User> {
        return this.usersRepository.deleteByGoogleId(googleId);
    }

    async getAll(search: SearchUserDto): Promise<User[]> {
        return this.usersRepository.findAll(search);
    }

    async findById(uuid: string): Promise<User> {
        return this.usersRepository.findUserById(uuid);
    }

    async findByUsername(username: string): Promise<User> {
        return this.usersRepository.findUserByUsername(username);
    }

    async findByGoogleId(googleId: string) {
        return this.usersRepository.findUserByGoogleId(googleId);
    }

    async getFamousUsers() {
        return this.usersRepository.getFamousUsers();
    }

    async updateAllUserNotificationsToSeen(userId: number) {
        return await this.usersRepository.updateAllUserNotificationsToSeen(userId);
    }
}
