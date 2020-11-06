import { Test, TestingModule } from "@nestjs/testing";
import { ImagesService } from "./images.service";
import { ImagesRepository } from "./images.repository";
import { Image } from "./images.entity";
import { ImagesController } from "./images.controller";
import { CreateImageDto } from "./dto/createImage.dto";
import { UsersService } from "../users/users.service";
import { UsersRepository } from "../users/users.repository";
import { User } from "../users/users.entity";

describe("Images Controller", () => {
    let controller: ImagesController;
    let imagesService: ImagesService;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: "ImagesRepository",
                    useClass: ImagesRepository,
                },
                {
                    provide: "ImagesService",
                    useClass: ImagesService,
                },
                {
                    provide: "UsersRepository",
                    useClass: UsersRepository,
                },
                {
                    provide: "UsersService",
                    useClass: UsersService,
                },
            ],
            controllers: [ImagesController],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        imagesService = module.get<ImagesService>(ImagesService);
        controller = module.get<ImagesController>(ImagesController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should call services on create", async () => {
        const image = new Image();
        image.url = "test url";

        const user = new User();

        const imageCreateMock = jest.spyOn(imagesService, "create").mockImplementation(() => Promise.resolve(image));
        const userFindOneMock = jest
            .spyOn(usersService, "findByGoogleId")
            .mockImplementation(() => Promise.resolve(user));

        await controller.create(new CreateImageDto(), { user: { googleId: "A_GOOGLE_ID" } });

        expect(imageCreateMock).toHaveBeenCalled();
        expect(userFindOneMock).toHaveBeenCalled();
    });
});
