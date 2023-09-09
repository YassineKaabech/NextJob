import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberVerificationService } from './phone-number-verification.service';

describe('PhoneNumberVerificationService', () => {
  let service: PhoneNumberVerificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneNumberVerificationService],
    }).compile();

    service = module.get<PhoneNumberVerificationService>(PhoneNumberVerificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
