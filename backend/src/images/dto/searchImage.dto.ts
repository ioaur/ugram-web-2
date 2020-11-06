import { IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class SearchImageDto {
    @IsOptional()
    @IsNotEmpty()
    readonly tags?: string;

    @IsOptional()
    @IsNotEmpty()
    readonly description?: string;

    @IsOptional()
    @IsNumberString()
    readonly uploadedBy?: number;

    @IsOptional()
    @IsNumberString()
    readonly mention?: number;
}
