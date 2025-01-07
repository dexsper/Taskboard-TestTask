import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SerializeOptions,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { Roles } from '../rbac';
import { ApiJwtAuth } from '../auth/decorators';

import { CommentsService } from './comments.service';
import {
  CommentDto,
  CreateCommentDto,
  UpdateCommentDto,
  CardCommentsDto,
} from './comment.dto';

@ApiJwtAuth()
@ApiParam({ name: 'columnId', type: Number })
@ApiParam({ name: 'cardId', type: Number })
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @SerializeOptions({ type: CardCommentsDto })
  @ApiOperation({ summary: 'Get the specified card comments.' })
  @ApiOkResponse({ type: CardCommentsDto })
  getComments(@Param('cardId') cardId: number) {
    return this.commentsService.getCommentsByCardId(cardId);
  }

  @Post()
  @SerializeOptions({ type: CommentDto })
  @ApiOperation({ summary: 'Create new comment.' })
  @ApiCreatedResponse({
    type: CommentDto,
    description: 'Comment successfully created.',
  })
  create(@Body() createDto: CreateCommentDto, @Param('cardId') cardId: number) {
    return this.commentsService.create(createDto, cardId);
  }

  @Get(':commentId')
  @Roles(['Admin'], ['ColumnOwner'])
  @SerializeOptions({ type: CommentDto })
  @ApiOperation({ summary: 'Get the specified comment.' })
  @ApiOkResponse({ type: CommentDto })
  get(@Param('commentId') commentId: number) {
    return this.commentsService.findById(commentId);
  }

  @Patch(':commentId')
  @Roles(['Admin'], ['ColumnOwner'])
  @SerializeOptions({ type: CommentDto })
  @ApiOperation({ summary: 'Update the specified comment.' })
  @ApiOkResponse({ type: CommentDto })
  @ApiNotFoundResponse({ description: 'The specified card was not found' })
  update(
    @Body() updateDto: UpdateCommentDto,
    @Param('commentId') commentId: number,
  ) {
    return this.commentsService.updateById(updateDto, commentId);
  }

  @Delete(':commentId')
  @Roles(['Admin'], ['ColumnOwner'])
  @ApiOperation({ summary: 'Delete the specified comment.' })
  @ApiNotFoundResponse({ description: 'The specified comment was not found' })
  delete(@Param('commentId') commentId: number) {
    return this.commentsService.delete(commentId);
  }
}
