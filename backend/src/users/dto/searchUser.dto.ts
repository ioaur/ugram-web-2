import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class SearchUserDto {
    @IsOptional()
    @IsNotEmpty()
    username?: string;

    @IsOptional()
    @IsNotEmpty()
    lastname?: string;

    @IsOptional()
    @IsNotEmpty()
    firstname?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @Matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    phoneNumber?: string;
}
