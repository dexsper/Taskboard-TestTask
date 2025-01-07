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

import { CardsService } from './cards.service';
import {
  CardDto,
  CreateCardDto,
  UpdateCardDto,
  ColumnCardsDto,
} from './card.dto';

@ApiJwtAuth()
@ApiParam({ name: 'columnId', type: Number })
@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  @SerializeOptions({ type: ColumnCardsDto })
  @ApiOperation({ summary: 'Get the specified column cards.' })
  @ApiOkResponse({ type: ColumnCardsDto })
  getCards(@Param('columnId') columnId: number) {
    return this.cardsService.getCardsByColumnId(columnId);
  }

  @Post()
  @SerializeOptions({ type: CardDto })
  @ApiOperation({ summary: 'Create new card.' })
  @ApiCreatedResponse({
    type: CardDto,
    description: 'Card successfully created.',
  })
  create(
    @Body() createDto: CreateCardDto,
    @Param('columnId') columnId: number,
  ) {
    return this.cardsService.create(createDto, columnId);
  }

  @Get(':cardId')
  @Roles(['Admin'], ['ColumnOwner'])
  @SerializeOptions({ type: CardDto })
  @ApiOperation({ summary: 'Get the specified card.' })
  @ApiOkResponse({ type: CardDto })
  get(@Param('cardId') cardId: number) {
    return this.cardsService.findById(cardId);
  }

  @Patch(':cardId')
  @Roles(['Admin'], ['ColumnOwner'])
  @SerializeOptions({ type: CardDto })
  @ApiOperation({ summary: 'Update the specified card.' })
  @ApiOkResponse({ type: CardDto })
  @ApiNotFoundResponse({ description: 'The specified card was not found' })
  update(@Body() updateDto: UpdateCardDto, @Param('cardId') cardId: number) {
    return this.cardsService.updateById(updateDto, cardId);
  }

  @Delete(':cardId')
  @Roles(['Admin'], ['ColumnOwner'])
  @ApiOperation({ summary: 'Delete the specified card.' })
  @ApiNotFoundResponse({ description: 'The specified card was not found' })
  delete(@Param('cardId') cardId: number) {
    return this.cardsService.delete(cardId);
  }
}
