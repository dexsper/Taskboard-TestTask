import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

import { Expose, Type } from 'class-transformer';

export class CreateColumnDto {
  @MaxLength(60)
  @ApiProperty()
  name: string;
}

export class UpdateColumnDto extends PartialType(CreateColumnDto) {}

export class ColumnDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;
}

export class UserColumnsDto {
  @Expose()
  @Type(() => ColumnDto)
  @ApiProperty({
    type: ColumnDto,
    isArray: true,
  })
  columns: ColumnDto[];
}
