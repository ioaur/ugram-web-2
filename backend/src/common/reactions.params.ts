import { IsUUID, IsNumberString } from "class-validator";

export class ReactionsParam {
    @IsUUID()
    readonly uuid: string;

    @IsNumberString()
    readonly reaction: number;
}
