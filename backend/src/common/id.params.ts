import { IsUUID } from "class-validator";

export class IdParam {
    @IsUUID()
    readonly uuid: string;
}
