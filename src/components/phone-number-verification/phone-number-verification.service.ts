import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreatePhoneNumberVerificationDto } from './dto/create-phone-number-verification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneNumberVerification } from './entities/phone-number-verification.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UsersService } from '../users/users.service';
const crypto = require('crypto');

@Injectable()
export class PhoneNumberVerificationService {
  constructor(
    @InjectRepository(PhoneNumberVerification)
    private phoneNumberVerificationRepository: Repository<PhoneNumberVerification>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(data: CreatePhoneNumberVerificationDto) {
    return await this.phoneNumberVerificationRepository
      .save(data)
      .then((res) => res);
  }

  findOneByVerificationKey(
    verificationKey: string,
  ): Promise<PhoneNumberVerification> {
    return this.phoneNumberVerificationRepository.findOne({
      where: { verificationKey: verificationKey },
    });
  }

  findOneByPhoneNumber(phoneNumber: string): Promise<PhoneNumberVerification> {
    return this.phoneNumberVerificationRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
  }

  async remove(id: number) {
    return await this.phoneNumberVerificationRepository.delete(id);
  }

  async updateByPhoneNumber(
    id: number,
    phoneNumber: string,
    newVerificationKey: string,
  ): Promise<PhoneNumberVerification | UpdateResult | undefined> {
    const job = await this.findOneByPhoneNumber(phoneNumber).then((res) => res);
    if (job)
      return await this.phoneNumberVerificationRepository
        .update(id, {
          phoneNumber: phoneNumber,
          verificationKey: newVerificationKey,
        })
        .then((res) => res);
    return;
  }

  async checkPhoneNumberAvailability(
    phoneNumber: string,
  ): Promise<{ verificationKey: string }> {
    const verificationAlreadyExist = await this.findOneByPhoneNumber(
      phoneNumber,
    );

    if (verificationAlreadyExist) {
      const randomUniqueId = crypto.randomBytes(32).toString('hex');
      this.updateByPhoneNumber(
        verificationAlreadyExist.id,
        phoneNumber,
        randomUniqueId,
      );
      return {
        verificationKey: randomUniqueId,
      };
    } else {
      const userWithPhoneNumber = await this.usersService.findOne({
        where: { phoneNumber: phoneNumber },
      });
      if (userWithPhoneNumber) {
        return {
          verificationKey: '',
        };
      }

      const randomUniqueId = crypto.randomBytes(32).toString('hex');

      this.create({
        phoneNumber: phoneNumber,
        verificationKey: randomUniqueId,
      });

      return {
        verificationKey: randomUniqueId,
      };
    }
  }
}
