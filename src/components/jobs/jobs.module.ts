import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Users } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { PhoneNumberVerification } from '../phone-number-verification/entities/phone-number-verification.entity';
import { PhoneNumberVerificationService } from '../phone-number-verification/phone-number-verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job]),
   TypeOrmModule.forFeature([Users]),
   TypeOrmModule.forFeature([PhoneNumberVerification]),
  ],
  exports: [TypeOrmModule],
  controllers: [JobsController],
  providers: [JobsService, UsersService,PhoneNumberVerificationService],
})
export class JobsModule {}
