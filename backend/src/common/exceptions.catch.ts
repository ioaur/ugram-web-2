import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { QueryFailedError } from "typeorm";
import { captureException } from "@sentry/node";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        console.log(exception);

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Aye, something went wrong";

        if (
            (exception as HttpException).message &&
            (exception as HttpException).message.message &&
            Array.isArray((exception as HttpException).message.message) &&
            (exception as HttpException).message.message[0] instanceof ValidationError
        ) {
            status = 400;
            message = (exception as HttpException).message.message.map(
                (x) => `INVALID_FORMAT_${x.property.toUpperCase()}`
            );
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        } else if (exception instanceof QueryFailedError) {
            if (exception.message.includes("duplicate key value violates unique constraint")) {
                status = 400;
                message = exception["detail"];
            }
        }

        if (status == HttpStatus.INTERNAL_SERVER_ERROR) {
            captureException(exception);
        }

        response.status(status).json({
            statusCode: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
