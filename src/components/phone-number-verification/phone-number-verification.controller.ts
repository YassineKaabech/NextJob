import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PhoneNumberVerificationService } from './phone-number-verification.service';
import { CreatePhoneNumberVerificationDto } from './dto/create-phone-number-verification.dto';
import { UsersService } from '../users/users.service';

@Controller('phone-number-verification')
export class PhoneNumberVerificationController {
  constructor(
    private readonly phoneNumberVerificationService: PhoneNumberVerificationService,
    private readonly usersService: UsersService,

  ) {}

  @Post()
  create(
    @Body() createPhoneNumberVerificationDto: CreatePhoneNumberVerificationDto,
  ) {
    return this.phoneNumberVerificationService.create(
      createPhoneNumberVerificationDto,
    );
  }


  @Get(':phoneNumber')
  checkPhoneNumberAvailability(@Param('phoneNumber') phoneNumber: string) {

    if(phoneNumber.length !== 8){
      return false;
    }
    return this.phoneNumberVerificationService.checkPhoneNumberAvailability(
      phoneNumber,
    );

  }


}
