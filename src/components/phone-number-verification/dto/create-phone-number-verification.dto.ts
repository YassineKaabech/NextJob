import { IsNotEmpty, Length, MinLength, minLength } from "class-validator";

export class CreatePhoneNumberVerificationDto {
    @IsNotEmpty()
    @Length(8)
    phoneNumber: string;

    @IsNotEmpty()
    @MinLength(10)
    verificationKey: string;
}
