import { Controller, Get, Query } from "@nestjs/common";
import { ImagesService } from "../images/images.service";
import { Feed } from "./feed.complexentity";
import { NextParam } from "src/common/next.params";
import { Image } from "src/images/images.entity";

@Controller("feed")
export class FeedController {
    constructor(private readonly imagesService: ImagesService) {}

    @Get()
    async getNextImagesForFeed(@Query() query: NextParam): Promise<Image[]> {
        let count = query.count || 10;
        return await this.imagesService.getNextImagesForFeed(query.uuid, count);
    }
}
