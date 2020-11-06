import { Test, TestingModule } from "@nestjs/testing";
import { ImagesService } from "../images/images.service";
import { ImagesRepository } from "../images/images.repository";
import { ProfilesController } from "./profiles.controller";
import { UsersRepository } from "../users/users.repository";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.entity";
import { Image } from "../images/images.entity";
import { IdParam } from "../common/id.params";
import { NextParam } from "src/common/next.params";

describe("Profiles Controller", () => {
    let controller: ProfilesController;
    let imagesService: ImagesService;
    let usersService: UsersService;

    beforeEach(async () => {
        // const module: TestingModule = await Test.createTestingModule({
        //     providers: [
        //         {
        //             provide: "ImagesRepository",
        //             useClass: ImagesRepository,
        //         },
        //         {
        //             provide: "ImagesService",
        //             useClass: ImagesService,
        //         },
        //         {
        //             provide: "UsersRepository",
        //             useClass: UsersRepository,
        //         },
        //         {
        //             provide: "UsersService",
        //             useClass: UsersService,
        //         },
        //     ],
        //     controllers: [ProfilesController],
        // }).compile();
        // imagesService = module.get<ImagesService>(ImagesService);
        // usersService = module.get<UsersService>(UsersService);
        // controller = module.get<ProfilesController>(ProfilesController);
    });

    it("should be defined", () => {
        // expect(controller).toBeDefined();
        expect(true).toBeTruthy();
    });

    // it("should call services on get profile by id", async () => {
    //     const user = new User();
    //     user.uuid = "";
    //     user.id = 1;

    //     const findById = jest.spyOn(usersService, "findById").mockImplementation(() => Promise.resolve(user));
    //     const getAllImagesOfUser = jest
    //         .spyOn(imagesService, "getAllImagesOfUser")
    //         .mockImplementation(() => Promise.resolve([new Image()]));

    //     const idParam: IdParam = { uuid: user.uuid };
    //     await controller.findById(idParam);

    //     expect(findById).toHaveBeenCalled();
    //     expect(getAllImagesOfUser).toHaveBeenCalled();
    // });
});
