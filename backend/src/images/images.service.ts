import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImagesRepository } from "../images/images.repository";
import { CreateImageDto } from "../images/dto/createImage.dto";
import { Image } from "./images.entity";
import { SearchImageDto } from "./dto/searchImage.dto";
import { UpdateImageDto } from "./dto/updateImage.dto";
import { CreateImageCommentDto } from "./dto/createImageComment.dto";

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(ImagesRepository)
        private readonly imagesRepository: ImagesRepository
    ) {}

    async create(userUuid: string, createImageDto: CreateImageDto): Promise<Image> {
        return await this.imagesRepository.createImage(userUuid, createImageDto);
    }

    async createImageUploadedBy(id: number, createImageDto: CreateImageDto): Promise<Image> {
        return await this.imagesRepository.createImageUploadedBy(id, createImageDto);
    }

    async updateImage(uuid: string, updateImageDto: UpdateImageDto): Promise<Image> {
        return await this.imagesRepository.updateImage(uuid, updateImageDto);
    }

    async getAllImagesOfUser(id: string): Promise<Image[]> {
        return await this.imagesRepository.getAllImagesOfUser(id);
    }

    async getAll(search: SearchImageDto): Promise<Image[]> {
        return await this.imagesRepository.findAll(search);
    }

    async getAutocomplete(search: SearchImageDto) {
        return await this.imagesRepository.getAutocomplete(search);
    }

    async deleteImage(uuid: string): Promise<Image> {
        return await this.imagesRepository.deleteImage(uuid);
    }

    async findById(uuid: string): Promise<Image> {
        return await this.imagesRepository.findImageById(uuid);
    }

    async getNextImagesForProfile(userId: number, uuid: string, count: number): Promise<Image[]> {
        return await this.imagesRepository.getNextImagesForProfile(userId, uuid, count);
    }

    async getNextImagesForFeed(uuid: string, count: number): Promise<Image[]> {
        return await this.imagesRepository.getNextImagesForFeed(uuid, count);
    }

    async createImageComment(
        imageUuid: string,
        userUuid: string,
        createImageCommentDto: CreateImageCommentDto
    ): Promise<Image> {
        return await this.imagesRepository.createImageComment(imageUuid, userUuid, createImageCommentDto);
    }

    async createLikeForImage(imageUuid: string, userUuid: string): Promise<Image> {
        return await this.imagesRepository.createLikeForImage(imageUuid, userUuid);
    }

    async createReactionsForImage(imageUuid: string, userUuid: string, reaction: number): Promise<Image> {
        return await this.imagesRepository.createReactionsForImage(imageUuid, userUuid, reaction);
    }

    async getFamousHashtags() {
        return await this.imagesRepository.getFamousHashtags();
    }
}
