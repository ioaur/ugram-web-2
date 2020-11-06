import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { User } from "../users/users.entity";
import { UsersService } from "../users/users.service";

import { ERROR } from "../common/code.errors";
import { Profile } from "passport-google-oauth20";

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

@Injectable()
export class AuthenticationService {
    private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    constructor(private readonly usersService: UsersService) {}

    async validateOAuthLogin(profile: Profile): Promise<string> {
        const googleId = profile.id;
        try {
            let user: User = await this.usersService.findByGoogleId(googleId);

            if (!user) user = await this.usersService.create(profile);

            const authProvider = profile.provider;
            const payload = {
                googleId,
                authProvider,
            };

            const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: ONE_DAY_IN_SECONDS });
            return jwt;
        } catch (err) {
            throw new InternalServerErrorException(ERROR.OAUTH_LOGIN_FAILED, err.message);
        }
    }
}
