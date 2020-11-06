import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImagesRepository } from "./images.repository";
import { ImagesService } from "./images.service";
import { ImagesController } from "./images.controller";
import { UsersRepository } from "src/users/users.repository";
import { UsersService } from "src/users/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([ImagesRepository, UsersRepository])],
    controllers: [ImagesController],
    providers: [ImagesService, UsersService],
})
export class ImagesModule {}
