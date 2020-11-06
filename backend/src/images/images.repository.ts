import { EntityRepository, FindOperator, LessThan, Repository, Like } from "typeorm";
import { Image } from "./images.entity";
import { CreateImageDto } from "./dto/createImage.dto";
import { SearchImageDto } from "./dto/searchImage.dto";
import { UpdateImageDto } from "./dto/updateImage.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ERROR } from "../common/code.errors";
import { User } from "../users/users.entity";
import { Tag } from "./tags.entity";
import { CreateImageCommentDto } from "./dto/createImageComment.dto";
import { ImageComment } from "./imagecomments.entity";
import { UserNotification } from "../users/usernotification.entity";
import { Reaction } from "./reactions.entity";

const DEFAULT_NUMBER_IMAGES_TO_LOAD: number = 10;

@EntityRepository(Image)
export class ImagesRepository extends Repository<Image> {
    async createImage(userUuid: string, createImageDto: CreateImageDto): Promise<Image> {
        const profilePicture = new Image();
        profilePicture.url = createImageDto.url;
        profilePicture.description = createImageDto.description;

        if (createImageDto.tags) {
            profilePicture.tags = await Promise.all(createImageDto.tags.map((tag) => this.findOrCreateTag(tag)));
        }

        if (createImageDto.mention) {
            const mentionUser = await this.manager.findOne<User>(User, { where: { username: createImageDto.mention } });
            if (!mentionUser) {
                throw new HttpException(ERROR.USER_MENTIONNED_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            profilePicture.mentionUserId = mentionUser.id;
        }

        const uploadedByUser = await this.manager.findOne<User>(User, { where: { uuid: userUuid } });
        if (!uploadedByUser) {
            throw new HttpException(ERROR.USER_UPLOADED_BY_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        profilePicture.uploadedById = uploadedByUser.id;

        await this.save(profilePicture);

        return await this.findOne(profilePicture.id, {
            relations: [
                "mentionUser",
                "uploadedBy",
                "uploadedBy.profilePicture",
                "tags",
                "likes",
                "reactions",
                "reactions.users",
                "comments",
                "comments.user",
                "comments.user.profilePicture",
            ],
        });
    }

    async createImageUploadedBy(id: number, createImageDto: CreateImageDto): Promise<Image> {
        const profilePicture = new Image();
        profilePicture.url = createImageDto.url;
        profilePicture.description = createImageDto.description;
        profilePicture.uploadedById = id;

        const mentionUser = await this.manager.findOne<User>(User, { where: { uuid: createImageDto.mention } });
        if (!mentionUser) {
            throw new HttpException(ERROR.USER_MENTIONNED_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        profilePicture.mentionUserId = mentionUser.id;

        await this.save(profilePicture);

        return await this.findOne(profilePicture.id, {
            relations: [
                "mentionUser",
                "uploadedBy",
                "uploadedBy.profilePicture",
                "tags",
                "likes",
                "reactions",
                "reactions.users",
                "comments",
                "comments.user",
                "comments.user.profilePicture",
            ],
        });
    }

    async createImageComment(
        imageUuid: string,
        userUuid: string,
        createImageCommentDto: CreateImageCommentDto
    ): Promise<Image> {
        return this.manager.transaction(async (transactionalEntityManager) => {
            const image = await this.findOne({
                where: { uuid: imageUuid },
                relations: [
                    "mentionUser",
                    "uploadedBy",
                    "uploadedBy.profilePicture",
                    "tags",
                    "likes",
                    "reactions",
                    "reactions.users",
                    "comments",
                    "comments.user",
                    "comments.user.profilePicture",
                ],
            });
            if (!image) {
                throw new HttpException(ERROR.IMAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const comment = new ImageComment();
            comment.message = createImageCommentDto.message;
            const relatedUser = await transactionalEntityManager.findOne<User>(User, {
                where: { uuid: userUuid },
                relations: ["profilePicture"],
            });
            comment.user = relatedUser;
            image.comments.push(comment);

            const notification = new UserNotification();
            notification.message = "COMMENT";
            notification.user = image.uploadedBy;
            notification.image = image;
            notification.relatedUser = relatedUser;
            await transactionalEntityManager.save(notification);

            return await transactionalEntityManager.save(image);
        });
    }

    async createLikeForImage(imageUuid: string, userUuid: string): Promise<Image> {
        return this.manager.transaction(async (transactionalEntityManager) => {
            const image = await this.findOne({
                where: { uuid: imageUuid },
                relations: [
                    "mentionUser",
                    "uploadedBy",
                    "uploadedBy.profilePicture",
                    "tags",
                    "likes",
                    "reactions",
                    "reactions.users",
                    "comments",
                    "comments.user",
                    "comments.user.profilePicture",
                ],
            });
            if (!image) {
                throw new HttpException(ERROR.IMAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const relatedUser = await transactionalEntityManager.findOne<User>(User, {
                where: { uuid: userUuid },
                relations: ["imagesLiked"],
            });
            if (relatedUser.imagesLiked.filter((t) => t.id === image.id).length > 0) {
                image.likes = image.likes.filter((u) => u.id !== relatedUser.id);
            } else {
                const notification = new UserNotification();
                notification.message = "LIKE";
                notification.user = image.uploadedBy;
                notification.image = image;
                notification.relatedUser = relatedUser;
                await transactionalEntityManager.save(notification);

                image.likes.push(relatedUser);
            }

            return await transactionalEntityManager.save(image);
        });
    }

    async createReactionsForImage(imageUuid: string, userUuid: string, reaction: number): Promise<Image> {
        return this.manager.transaction(async (transactionalEntityManager) => {
            const image = await this.findOne({
                where: { uuid: imageUuid },
                relations: [
                    "mentionUser",
                    "uploadedBy",
                    "uploadedBy.profilePicture",
                    "tags",
                    "likes",
                    "reactions",
                    "reactions.users",
                    "comments",
                    "comments.user",
                    "comments.user.profilePicture",
                ],
            });
            if (!image) {
                throw new HttpException(ERROR.IMAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const relatedUser = await transactionalEntityManager.findOne<User>(User, {
                where: { uuid: userUuid },
                relations: ["reactions"],
            });

            if (
                image.reactions.filter(
                    (t) => t.users.filter((u) => u.uuid === userUuid).length > 0 && t.value == reaction
                ).length > 0
            ) {
                let reactionFound: Reaction[] = image.reactions.filter((r) => r.value == reaction);
                reactionFound[0].users = reactionFound[0].users.filter((u) => u.uuid !== userUuid);
            } else {
                const notification = new UserNotification();
                notification.message = "REACTION";
                notification.user = image.uploadedBy;
                notification.image = image;
                notification.relatedUser = relatedUser;
                await transactionalEntityManager.save(notification);

                let reactionFound = image.reactions.filter((u) => u.value == reaction);
                if (reactionFound.length) {
                    reactionFound[0].users.push(relatedUser);
                } else {
                    let newReaction = new Reaction();
                    newReaction.value = Number(reaction);
                    newReaction.users = [relatedUser];
                    image.reactions.push(newReaction);
                }
            }

            return await transactionalEntityManager.save(image);
        });
    }

    async updateImage(uuid: string, updateImageDto: UpdateImageDto): Promise<Image> {
        return this.manager.transaction(async (transactionalEntityManager) => {
            const image = await this.findOne({ where: { uuid }, relations: ["tags", "mentionUser", "uploadedBy"] });
            if (!image) {
                throw new HttpException(ERROR.IMAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            if (updateImageDto.description) {
                image.description = updateImageDto.description;
            }
            if (updateImageDto.url) {
                image.url = updateImageDto.url;
            }

            if (updateImageDto.tags) {
                image.tags = await Promise.all(updateImageDto.tags.map(async (tag) => await this.findOrCreateTag(tag)));
            }

            if (updateImageDto.mention) {
                const user = await transactionalEntityManager.findOne<User>(User, {
                    where: { uuid: updateImageDto.mention },
                });
                if (!user) {
                    throw new HttpException(ERROR.USER_MENTIONNED_NOT_FOUND, HttpStatus.NOT_FOUND);
                }
                image.mentionUserId = user.id;
            }

            return await transactionalEntityManager.save(image);
        });
    }

    async findOrCreateTag(value: string): Promise<Tag> {
        return this.manager.transaction(async (transactionalEntityManager) => {
            const tag = await transactionalEntityManager.findOne<Tag>(Tag, { where: { value: value.toLowerCase() } });
            if (tag) {
                return tag;
            }
            const t = new Tag();
            t.value = value.toLowerCase();
            return transactionalEntityManager.save(t);
        });
    }

    async getAllImagesOfUser(id: string): Promise<Image[]> {
        return this.find({
            where: { uploadedById: id },
            order: {
                creationDate: "DESC",
            },
            relations: ["mentionUser", "tags", "comments", "comments.user", "comments.user.profilePicture"],
            take: DEFAULT_NUMBER_IMAGES_TO_LOAD,
        });
    }

    async findImageById(uuid: string): Promise<Image> {
        const image = await this.findOne({
            where: { uuid },
            relations: ["mentionUser", "uploadedBy", "tags", "likes", "reactions", "reactions.users"],
        });
        if (!image) {
            throw new HttpException(ERROR.IMAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return image;
    }

    async deleteImage(uuid: string): Promise<Image> {
        const image = await this.findOne({ where: { uuid } });
        if (!image) {
            throw new HttpException(ERROR.IMAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        this.delete(image.id);
        return image;
    }

    async findAll(search: SearchImageDto): Promise<Image[]> {
        const query: any = {};
        if (search.tags) {
            const images = await Promise.all(
                search.tags.split(";").map(async (t) => {
                    const tag = await this.manager.findOne<Tag>(Tag, {
                        where: { value: t },
                        relations: [
                            "images",
                            "images.tags",
                            "images.mentionUser",
                            "images.uploadedBy",
                            "images.uploadedBy.profilePicture",
                            "images.likes",
                            "images.reactions",
                            "images.reactions.users",
                            "images.comments",
                            "images.comments.user",
                            "images.comments.user.profilePicture",
                        ],
                    });
                    if (tag) {
                        return tag.images.filter((i) =>
                            search.description
                                ? i.description.includes(search.description)
                                : true && search.uploadedBy
                                ? i.uploadedById === search.uploadedBy
                                : true && search.mention
                                ? i.mentionUserId === search.mention
                                : true
                        );
                    } else {
                        return [];
                    }
                })
            );
            return images.reduce((acc, val) => acc.concat(val), []);
        }

        if (search.description) {
            query.description = Like(`%${search.description}%`);
        }
        if (search.mention) {
            query.mentionId = search.mention;
        }
        if (search.uploadedBy) {
            query.uploadedById = search.uploadedBy;
        }

        return this.find({
            where: { ...query },
            relations: [
                "mentionUser",
                "uploadedBy",
                "uploadedBy.profilePicture",
                "tags",
                "likes",
                "reactions",
                "reactions.users",
                "comments",
                "comments.user",
                "comments.user.profilePicture",
            ],
        });
    }

    async getAutocomplete(search: SearchImageDto) {
        const query: any = {};
        if (search.tags) {
            const tags = await this.manager.find(Tag, { where: { value: Like(`%${search.tags}%`) }, take: 5 });
            return tags.map((t) => "#" + t.value);
        }

        if (search.description) {
            query.description = Like(`%${search.description}%`);
        }

        const descriptions = await this.find({
            where: { ...query },
            take: 5,
        });
        return descriptions.map((d) => d.description);
    }

    async getNextImagesForProfile(userId: number, uuid: string, count: number): Promise<Image[]> {
        const whereQuery: NextImagesQuery = {};

        if (uuid) {
            const image = await this.findOne({ where: { uuid } });
            whereQuery.creationDate = LessThan(image.creationDate);
        }

        let images = await this.find({
            where: { ...whereQuery, uploadedById: userId },
            relations: [
                "mentionUser",
                "tags",
                "uploadedBy",
                "uploadedBy.profilePicture",
                "likes",
                "reactions",
                "reactions.users",
                "comments",
                "comments.user",
                "comments.user.profilePicture",
            ],
            // take: count,
        });
        return images.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
    }

    async getNextImagesForFeed(uuid: string, count: number): Promise<Image[]> {
        const whereQuery: NextImagesQuery = {};

        if (uuid) {
            const image = await this.findOne({ where: { uuid } });
            whereQuery.creationDate = LessThan(image.creationDate);
        }

        let images = await this.find({
            where: { ...whereQuery },
            relations: [
                "mentionUser",
                "uploadedBy",
                "uploadedBy.profilePicture",
                "tags",
                "likes",
                "reactions",
                "reactions.users",
                "comments",
                "comments.user",
                "comments.user.profilePicture",
            ],
            // take: count,
        });
        return images.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
    }

    async getFamousHashtags() {
        return this.manager.transaction(async (transactionalEntityManager) => {
            const tag = await transactionalEntityManager.find<Tag>(Tag, { relations: ["images"] });
            const sortedTags = tag.sort((a, b) => b.images.length - a.images.length);
            return sortedTags.slice(0, 5).map((t) => t.value);
        });
    }
}

interface NextImagesQuery {
    creationDate?: FindOperator<Date>;
}
