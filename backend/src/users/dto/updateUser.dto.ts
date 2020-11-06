import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    readonly firstname?: string;

    @IsOptional()
    @IsNotEmpty()
    readonly lastname?: string;

    @IsOptional()
    @IsEmail()
    readonly email?: string;

    @IsOptional()
    @Matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    readonly phoneNumber?: string;
}
