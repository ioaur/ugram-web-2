import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import { ImagesService } from "../images/images.service";
import { ImagesRepository } from "../images/images.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository, ImagesRepository])],
    controllers: [UsersController],
    providers: [UsersService, ImagesService],
})
export class UsersModule {}
