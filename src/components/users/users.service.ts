import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Users as User } from './user.entity';
import { PhoneNumberVerificationService } from '../phone-number-verification/phone-number-verification.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => PhoneNumberVerificationService))
    private phoneNumberVerificationService: PhoneNumberVerificationService,
  ) {}


  async findOne(data: number | any): Promise<User | undefined> {
    return await this.usersRepository.findOne(data);
  }


  async findOneById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne({where:{id:id}});
  }

  async create(data) {
    const phoneNumberVerifObject =
      await this.phoneNumberVerificationService.findOneByVerificationKey(
        data.verificationKey,
      );
    if (phoneNumberVerifObject) {

      await this.phoneNumberVerificationService.remove(phoneNumberVerifObject.id);
      return await this.usersRepository
        .save({
          ...data,
          phoneNumber: phoneNumberVerifObject.phoneNumber,
          role: 'USER',
        })
        .then((res) => res)
        .catch((e) => console.log(e));
    }else{
      return false;
    }
  }

  async update(id:number, data: object): Promise< UpdateResult | undefined> {
    const user = await this.findOneById(id).then(res =>res);
    if(user) return await this.usersRepository.update(id, data).then(res => res);
    return ;
  }
}
