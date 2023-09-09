import { IsDateString, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsDateString()
  birthdate: string;
}
