import { MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CreateCommentDto {
  @MaxLength(300)
  @ApiProperty()
  text: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

export class CommentDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  text: string;
}

export class CardCommentsDto {
  @Expose()
  @Type(() => CommentDto)
  @ApiProperty({
    type: CommentDto,
    isArray: true,
  })
  comments: CommentDto[];
}
