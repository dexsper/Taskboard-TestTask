import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(320)
  @ApiProperty({ example: 'user@example.com' })
  readonly email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain uppercase, lowercase, number and special character',
  })
  @ApiProperty({ example: 'Ex@mple123!' })
  readonly password: string;
}

export class UserDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty({ example: 'user@example.com' })
  email: string;
}
