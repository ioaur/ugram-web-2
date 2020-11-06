import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, Req, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { CreateImageDto } from "../images/dto/createImage.dto";
import { ImagesService } from "../images/images.service";
import { User } from "./users.entity";
import { SearchUserDto } from "./dto/searchUser.dto";
import { Image } from "../images/images.entity";
import { IdParam } from "../common/id.params";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly imagesService: ImagesService) {}

    @Post("/images")
    @UseGuards(AuthGuard("jwt"))
    async createImageUploadedBy(@Body() createImageDto: CreateImageDto, @Req() request: any): Promise<Image> {
        const user = await this.usersService.findByGoogleId(request.user.googleId);
        return await this.imagesService.createImageUploadedBy(user.id, createImageDto);
    }

    @Post("/notifications/seen")
    @UseGuards(AuthGuard("jwt"))
    async updateAllUserNotificationsToSeen(@Req() request: any) {
        const user = await this.usersService.findByGoogleId(request.user.googleId);
        return await this.usersService.updateAllUserNotificationsToSeen(user.id);
    }

    @Put()
    @UseGuards(AuthGuard("jwt"))
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() request: any): Promise<User> {
        return this.usersService.updateByGoogleId(request.user.googleId, updateUserDto);
    }

    @Get()
    async getAll(@Query() search: SearchUserDto): Promise<User[]> {
        return this.usersService.getAll(search);
    }

    @Get("/me")
    @UseGuards(AuthGuard("jwt"))
    async me(@Req() request: any): Promise<User> {
        return this.usersService.findByGoogleId(request.user.googleId);
    }

    @Get("/famous")
    async getFamousUsers() {
        return this.usersService.getFamousUsers();
    }

    @Get(":uuid")
    async findById(@Param() params: IdParam): Promise<User> {
        return this.usersService.findById(params.uuid);
    }

    @Delete()
    @UseGuards(AuthGuard("jwt"))
    async deleteByGoogleId(@Req() request: any): Promise<User> {
        return this.usersService.deleteByGoogleId(request.user.googleId);
    }
}
