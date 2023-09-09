import { IsNotEmpty } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  objet: string;
  @IsNotEmpty()
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  recompense: string;
  @IsNotEmpty()
  long: string;
  @IsNotEmpty()
  lat: string;
  @IsNotEmpty()
  adresse: string;
}
