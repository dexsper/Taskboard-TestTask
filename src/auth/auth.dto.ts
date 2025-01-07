import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class AuthDto {
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

export class AuthResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Jason Web Token (JWT) for an authenticated user.',
    example: 'eyJhbGci...',
  })
  accessToken: string;
}
