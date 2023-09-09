import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users as User } from './user.entity';
import { IsEmailUserAlreadyExistConstraint } from 'src/pipes/IsEmailUserAlreadyExist.pipe';
import { PhoneNumberVerificationModule } from '../phone-number-verification/phone-number-verification.module';
import { PhoneNumberVerificationService } from '../phone-number-verification/phone-number-verification.service';
import { UsersController } from './users.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => PhoneNumberVerificationModule),
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      dest: './profile-images', // Destination folder for storing uploaded files
    }),
  ],
  exports: [TypeOrmModule, UsersService],
  providers: [
    UsersService,
    AuthService,
    JwtService,
    PhoneNumberVerificationService,
    IsEmailUserAlreadyExistConstraint,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
