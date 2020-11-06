import { Controller, Get, UseGuards, Res, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("authentication")
export class AuthenticationController {
    @UseGuards(AuthGuard("google"))
    @Get("google")
    googleLogin() {}

    @UseGuards(AuthGuard("google"))
    @Get("google/callback")
    googleLoginCallback(@Req() request, @Res() response) {
        const jwt: string = request.user.jwt;

        const frontendURL = process.env.FRONTEND_URL;
        const successURL = frontendURL + "/login/success/" + jwt;
        const failureURL = frontendURL + "/login/failure";

        response.redirect(jwt ? successURL : failureURL);
    }
}
