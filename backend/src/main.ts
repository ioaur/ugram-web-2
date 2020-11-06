import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./common/exceptions.catch";
import { runDbMigrations } from "./config/utils";
import { init } from "@sentry/node";

async function bootstrap() {
    init({ dsn: process.env.SENTRY_DSN });

    const app = await NestFactory.create(AppModule);
    await runDbMigrations();
    app.enableCors();
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    await app.listen(3000);
}

bootstrap();
