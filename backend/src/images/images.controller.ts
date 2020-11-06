import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    Req,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { ImagesService } from "./images.service";
import { CreateImageDto } from "./dto/createImage.dto";
import { Image } from "./images.entity";
import { SearchImageDto } from "./dto/searchImage.dto";
import { UpdateImageDto } from "./dto/updateImage.dto";
import { IdParam } from "../common/id.params";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "../users/users.service";
import { ERROR } from "../common/code.errors";
import { UploadImageToS3 } from "./dto/uploadImageToS3.dto";
import { uploadFileToS3 } from "./images.helper";
import { CreateImageCommentDto } from "./dto/createImageComment.dto";
import { ReactionsParam } from "../common/reactions.params";

@Controller("images")
export class ImagesController {
    constructor(private readonly usersService: UsersService, private readonly imagesService: ImagesService) {}

    @Post()
    @UseGuards(AuthGuard("jwt"))
    async create(@Body() createImageDto: CreateImageDto, @Req() request: any): Promise<Image> {
        const user = await this.usersService.findByGoogleId(request.user.googleId);
        return await this.imagesService.create(user.uuid, createImageDto);
    }

    @Post(":uuid/comments")
    @UseGuards(AuthGuard("jwt"))
    async createImageComment(
        @Body() createImageCommentDto: CreateImageCommentDto,
        @Param() params: IdParam,
        @Req() request: any
    ): Promise<Image> {
        const user = await this.usersService.findByGoogleId(request.user.googleId);
        return await this.imagesService.createImageComment(params.uuid, user.uuid, createImageCommentDto);
    }

    @Post(":uuid/likes")
    @UseGuards(AuthGuard("jwt"))
    async createLikeForImage(@Param() params: IdParam, @Req() request: any): Promise<Image> {
        const user = await this.usersService.findByGoogleId(request.user.googleId);
        return await this.imagesService.createLikeForImage(params.uuid, user.uuid);
    }

    @Post(":uuid/reactions/:reaction")
    @UseGuards(AuthGuard("jwt"))
    async createReaction1ForImage(@Param() params: ReactionsParam, @Req() request: any): Promise<Image> {
        const user = await this.usersService.findByGoogleId(request.user.googleId);
        return await this.imagesService.createReactionsForImage(params.uuid, user.uuid, params.reaction);
    }

    @Post("/S3")
    @UseGuards(AuthGuard("jwt"))
    async uploadToS3(@Body() body: UploadImageToS3, @Req() request: any): Promise<string> {
        const user = await this.usersService.findByGoogleId(request.user.googleId);
        return await uploadFileToS3(user.username, body.image);
    }

    @Put(":uuid")
    @UseGuards(AuthGuard("jwt"))
    async update(
        @Body() updateImageDto: UpdateImageDto,
        @Param() params: IdParam,
        @Req() request: any
    ): Promise<Image> {
        const image = await this.imagesService.findById(params.uuid);
        const user = await this.usersService.findByGoogleId(request.user.googleId);
        if (image.uploadedBy.uuid !== user.uuid) {
            throw new HttpException(ERROR.ACCESS_DENIED, HttpStatus.FORBIDDEN);
        }
        return this.imagesService.updateImage(params.uuid, updateImageDto);
    }

    @Get()
    async getAll(@Query() search: SearchImageDto): Promise<Image[]> {
        return this.imagesService.getAll(search);
    }

    @Get("autocomplete")
    async getAutocomplete(@Query() search: SearchImageDto) {
        if (!search.description && !search.tags) return;
        return this.imagesService.getAutocomplete(search);
    }

    @Delete(":uuid")
    @UseGuards(AuthGuard("jwt"))
    async deleteImage(@Param() params: IdParam, @Req() request: any): Promise<Image> {
        const image = await this.imagesService.findById(params.uuid);
        const user = await this.usersService.findByGoogleId(request.user.googleId);
        if (image.uploadedBy.uuid !== user.uuid) {
            throw new HttpException(ERROR.ACCESS_DENIED, HttpStatus.FORBIDDEN);
        }
        return this.imagesService.deleteImage(image.uuid);
    }

    @Get("hashtags/famous")
    async getFamousHashtags() {
        return this.imagesService.getFamousHashtags();
    }

    @Get(":uuid")
    async findById(@Param() params: IdParam): Promise<Image> {
        return this.imagesService.findById(params.uuid);
    }
}
