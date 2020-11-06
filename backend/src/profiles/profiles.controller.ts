import { Controller, Get, Param, Query } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { ImagesService } from "../images/images.service";
import { Profile } from "./profiles.complexentity";
import { NextParam } from "src/common/next.params";
import { UsernameParam } from "src/common/username.params";

@Controller("profiles")
export class ProfilesController {
    constructor(private readonly usersService: UsersService, private readonly imagesService: ImagesService) {}

    @Get(":username")
    async getNextImagesForProfile(@Query() query: NextParam, @Param() params: UsernameParam): Promise<Profile> {
        let count = query.count || 10;
        const user = await this.usersService.findByUsername(params.username);
        const images = await this.imagesService.getNextImagesForProfile(user.id, query.uuid, count);
        return new Profile(user, images);
    }
}
