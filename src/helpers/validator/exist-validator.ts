import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getConnection } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistValidator implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const find = { [args.constraints[1]]: args.value };
    const cek = await getConnection()
      .getRepository(args.constraints[0])
      .findOne(find);
    if (cek) return false;
    return true;
  }
  defaultMessage(args: ValidationArguments) {
    return args.property + ' ' + args.value + ' sudah digunakan';
  }
}

export function IsExist(option: any, validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: option,
      options: validationOption,
      validator: ExistValidator,
      async: true,
    });
  };
}
