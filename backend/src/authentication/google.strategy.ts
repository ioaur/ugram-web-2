import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-google-oauth20";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(private readonly authenticationService: AuthenticationService) {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.BACKEND_URL + "/authentication/google/callback",
            passReqToCallback: true,
            scope: ["profile", "email"],
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile: Profile, done: Function) {
        try {
            const jwt: string = await this.authenticationService.validateOAuthLogin(profile);
            const user = {
                jwt,
            };

            done(null, user);
        } catch (err) {
            console.log(err);
            done(err, false);
        }
    }
}
