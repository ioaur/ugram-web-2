import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationService } from "./authentication.service";
import { UsersService } from "../users/users.service";
import { UsersRepository } from "../users/users.repository";

describe("AuthenticationService", () => {
    let service: AuthenticationService;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: "UsersService",
                    useClass: UsersService,
                },
                {
                    provide: "UsersRepository",
                    useClass: UsersRepository,
                },
                AuthenticationService,
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        service = module.get<AuthenticationService>(AuthenticationService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
