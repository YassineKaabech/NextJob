import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  Length,
  IsDate,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsDateString()
  birthdate: string;
  @MinLength(8)
  verificationKey: string;
  @MinLength(5)
  @MaxLength(20)
  //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;
}
