import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "../users/users.repository";
import { ImagesService } from "../images/images.service";
import { ImagesRepository } from "../images/images.repository";
import { FeedController } from "./feed.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository, ImagesRepository])],
    controllers: [FeedController],
    providers: [ImagesService],
})
export class FeedModule {}
