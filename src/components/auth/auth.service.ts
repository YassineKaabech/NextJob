import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({
      where: { phoneNumber: phoneNumber },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isOk = await bcrypt.compare(pass, user.password);
    if (user && isOk) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.user.id,
      phoneNumber: user.user.phoneNumber,
      firstname: user.user.firstname,
      lastname: user.user.lastname,
      created_at: user.user.created_at,
      updated_at: user.user.updated_at,
    };
    return {
      authToken: this.jwtService.sign(payload),
      firstname: user.user.firstname,
    };
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    currentCryptedPassword: string,
    newPassword: string,
  ): Promise<Boolean> {
    // check if old password correct
    const oldPasswordIsIncorrect = await bcrypt.compare(
      oldPassword,
      currentCryptedPassword,
    );
    if (oldPasswordIsIncorrect) {
      const hashedNewPwd = await bcrypt.hash(newPassword, 10);
      const updateResponse = await this.usersService.update(userId, {
        password: hashedNewPwd,
      });
      if (updateResponse) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async register(data) {
    const hashedPwd = await bcrypt.hash(data.password, 10);

    let response = await this.usersService.create({
      ...data,
      password: hashedPwd,
    });
    if (response) {
      const { password, ...result } = response;
      console.log('REGISTER', result);
      return {
        authToken: this.jwtService.sign(result),
        firstname: result.firstname,
      };
    } else {
      return {
        authToken: '',
        firstname: '',
      };
    }
  }

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }
}
