import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateImageDto {
    @IsOptional()
    @IsNotEmpty()
    readonly description?: string;

    @IsOptional()
    @IsNotEmpty()
    readonly url?: string;

    @IsOptional()
    @IsString({ each: true })
    readonly tags?: string[];

    @IsOptional()
    @IsUUID()
    readonly mention?: string;
}
