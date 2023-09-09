import { Injectable } from "@nestjs/common";
import { UsersService } from "src/components/users/users.service";
import {ValidatorConstraint,ValidatorConstraintInterface,ValidationOptions,registerDecorator} from "class-validator";
@ValidatorConstraint({ name: 'isEmailUserAlreadyExist', async: true })
    @Injectable()
    export class IsEmailUserAlreadyExistConstraint
      implements ValidatorConstraintInterface
    {
      constructor(protected readonly usersService: UsersService) {}
    
      async validate(email: string) {
        return !(await this.usersService.findOne({where:{email:email}}));
      }
    }
    
    export function IsEmailUserAlreadyExist(validationOptions?: ValidationOptions) {
      return function (object: any, propertyName: string) {
        registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: IsEmailUserAlreadyExistConstraint,
        });
      };
    }