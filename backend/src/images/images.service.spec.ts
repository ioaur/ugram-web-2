import { Test, TestingModule } from "@nestjs/testing";
import { ImagesService } from "./images.service";
import { ImagesRepository } from "./images.repository";

describe("ImagesService", () => {
    let service: ImagesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: "ImagesRepository",
                    useClass: ImagesRepository,
                },
                ImagesService,
            ],
        }).compile();

        service = module.get<ImagesService>(ImagesService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
