import { Matches, MaxLength, MinLength } from "class-validator";
import { Match } from "./match.decorator";

export class UpdatePasswordDto {
  @MinLength(5)
  @MaxLength(20)
  //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  oldPassword: string;
  @MinLength(5)
  @MaxLength(20)
  //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  newPassword: string;
  @MinLength(5)
  @MaxLength(20)
  //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  @Match('newPassword')
  confirmNewPassword: string;
}
