import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    readonly googleid: string;

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly firstname: string;

    @IsNotEmpty()
    readonly lastname: string;

    @IsEmail()
    readonly email: string;

    @Matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    readonly phoneNumber?: string;

    readonly profilePictureUrl?: string;
}
