import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ImagesModule } from "./images/images.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { SeedingModule } from "./seeding/seeding.module";
import { TypeOrmConfigService } from "./config/typeorm.config";
import { FeedModule } from "./feed/feed.module";
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
        }),
        FeedModule,
        UsersModule,
        ImagesModule,
        ProfilesModule,
        SeedingModule,
        AuthenticationModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
