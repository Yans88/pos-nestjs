import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { IsExist } from '../../helpers/validator/exist-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  nama_user: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
