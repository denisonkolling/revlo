import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
    password!: string;

}