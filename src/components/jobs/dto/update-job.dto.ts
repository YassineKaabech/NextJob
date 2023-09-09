//import { PartialType } from '@nestjs/mapped-types';
//export class UpdateJobDto extends PartialType(CreateJobDto) {}
import { OmitType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends OmitType(CreateJobDto, []) {
  id: number;
}
