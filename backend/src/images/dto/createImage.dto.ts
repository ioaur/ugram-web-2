import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export interface ICreateImageDto {
    description?: string;
    url: string;
    tags?: string[];
    mention?: string;
}

export class CreateImageDto {
    @IsOptional()
    @IsNotEmpty()
    readonly description?: string;

    @IsNotEmpty()
    readonly url: string;

    @IsOptional()
    @IsString({ each: true })
    readonly tags?: string[];

    @IsOptional()
    @IsNotEmpty()
    readonly mention?: string;

    constructor();
    constructor(obj?: ICreateImageDto) {
        this.url = obj && obj.url;
        this.description = (obj && obj.description) || null;
        this.tags = (obj && obj.tags) || null;
        this.mention = (obj && obj.mention) || null;
    }
}
