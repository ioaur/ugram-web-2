import { IsNotEmpty } from "class-validator";

export class UsernameParam {
    @IsNotEmpty()
    readonly username: string;
}
