import { IsNotEmpty } from "class-validator";

export interface ICreateImageCommentDto {
    message: string;
}

export class CreateImageCommentDto {
    @IsNotEmpty()
    readonly message: string;

    constructor();
    constructor(obj?: ICreateImageCommentDto) {
        this.message = obj && obj.message;
    }
}
