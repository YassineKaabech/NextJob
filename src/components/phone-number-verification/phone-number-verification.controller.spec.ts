import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberVerificationController } from './phone-number-verification.controller';
import { PhoneNumberVerificationService } from './phone-number-verification.service';

describe('PhoneNumberVerificationController', () => {
  let controller: PhoneNumberVerificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneNumberVerificationController],
      providers: [PhoneNumberVerificationService],
    }).compile();

    controller = module.get<PhoneNumberVerificationController>(PhoneNumberVerificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
