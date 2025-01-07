import { IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CreateCardDto {
  @MaxLength(120)
  @ApiProperty()
  name: string;
}

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsOptional()
  @MaxLength(400, {})
  @ApiProperty({ required: false })
  description?: string;
}

export class CardDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;
}

export class ColumnCardsDto {
  @Expose()
  @Type(() => CardDto)
  @ApiProperty({
    type: CardDto,
    isArray: true,
  })
  cards: CardDto[];
}
