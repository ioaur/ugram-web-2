import { Module } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "../users/users.repository";
import { ImagesService } from "../images/images.service";
import { ImagesRepository } from "../images/images.repository";
import { ProfilesController } from "./profiles.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository, ImagesRepository])],
    controllers: [ProfilesController],
    providers: [UsersService, ImagesService],
})
export class ProfilesModule {}
