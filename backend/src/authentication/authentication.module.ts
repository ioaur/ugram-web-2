import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { GoogleStrategy } from "./google.strategy";
import { UsersService } from "../users/users.service";
import { UsersRepository } from "../users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersRepository]),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: process.env.CLIENT_SECRET,
            signOptions: { expiresIn: "60s" },
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, UsersService, GoogleStrategy, JwtStrategy],
})
export class AuthenticationModule {}
