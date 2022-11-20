import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsOptional()
  id?: number;

  @ApiProperty({ required: true })
  @IsString()
  nama_user: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
export class UserIdDTO extends PickType(UserDto, ['id']) {}
