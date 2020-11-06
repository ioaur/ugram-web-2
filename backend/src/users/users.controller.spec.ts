import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { ImagesService } from "../images/images.service";
import { User } from "./users.entity";
import { ImagesRepository } from "../images/images.repository";
import { IdParam } from "../common/id.params";

describe("User Controller", () => {
    let controller: UsersController;
    let usersService: UsersService;
    let imagesService: ImagesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: "UsersRepository",
                    useClass: UsersRepository,
                },
                {
                    provide: "UsersService",
                    useClass: UsersService,
                },
                {
                    provide: "ImagesRepository",
                    useClass: ImagesRepository,
                },
                {
                    provide: "ImagesService",
                    useClass: ImagesService,
                },
            ],
            controllers: [UsersController],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        imagesService = module.get<ImagesService>(ImagesService);
        controller = module.get<UsersController>(UsersController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should call user service on find by id", async () => {
        const user = new User();
        user.uuid = "";
        user.id = 1;

        const userCreateMock = jest.spyOn(usersService, "findById").mockImplementation(() => Promise.resolve(user));

        const idParam: IdParam = { uuid: user.uuid };
        await controller.findById(idParam);

        expect(userCreateMock).toHaveBeenCalled();
    });
});
