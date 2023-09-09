import { Module, forwardRef } from '@nestjs/common';
import { PhoneNumberVerificationService } from './phone-number-verification.service';
import { PhoneNumberVerificationController } from './phone-number-verification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumberVerification } from './entities/phone-number-verification.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule),TypeOrmModule.forFeature([PhoneNumberVerification])],
  exports: [TypeOrmModule],
  controllers: [PhoneNumberVerificationController],
  providers: [PhoneNumberVerificationService,UsersService]
})
export class PhoneNumberVerificationModule {}
