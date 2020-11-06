import { IsNumberString, IsOptional, IsUUID } from "class-validator";

export class NextParam {
    @IsOptional()
    @IsUUID()
    readonly uuid?: string;

    @IsOptional()
    @IsNumberString()
    readonly count?: number;
}
