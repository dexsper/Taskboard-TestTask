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
} from '@nestjs/swagger';

import { Roles } from '../rbac';
import { CurrentUser, ApiJwtAuth } from '../auth/decorators';

import { ColumnsService } from './columns.service';
import {
  ColumnDto,
  CreateColumnDto,
  UpdateColumnDto,
  UserColumnsDto,
} from './column.dto';

@ApiJwtAuth()
@Controller()
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  @SerializeOptions({ type: UserColumnsDto })
  @ApiOperation({ summary: 'Get the current user columns.' })
  @ApiOkResponse({ type: UserColumnsDto })
  getColumns(@CurrentUser('id') userId: number) {
    return this.columnsService.getColumnsByUserId(userId);
  }

  @Post()
  @SerializeOptions({ type: ColumnDto })
  @ApiOperation({ summary: 'Create new column.' })
  @ApiCreatedResponse({
    type: ColumnDto,
    description: 'Column successfully created.',
  })
  create(
    @Body() createDto: CreateColumnDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.columnsService.create(createDto, userId);
  }

  @Get(':columnId')
  @Roles(['Admin'], ['ColumnOwner'])
  @SerializeOptions({ type: ColumnDto })
  @ApiOperation({ summary: 'Get the specified column.' })
  @ApiOkResponse({ type: ColumnDto })
  get(@Param('columnId') userId: number) {
    return this.columnsService.findById(userId);
  }

  @Patch(':columnId')
  @Roles(['Admin'], ['ColumnOwner'])
  @SerializeOptions({ type: ColumnDto })
  @ApiOperation({ summary: 'Update the specified column.' })
  @ApiOkResponse({ type: ColumnDto })
  @ApiNotFoundResponse({ description: 'The specified column was not found' })
  update(
    @Body() updateDto: UpdateColumnDto,
    @Param('columnId') columnId: number,
  ) {
    return this.columnsService.updateById(updateDto, columnId);
  }

  @Delete(':columnId')
  @Roles(['Admin'], ['ColumnOwner'])
  @ApiOperation({ summary: 'Delete the specified column.' })
  @ApiNotFoundResponse({ description: 'The specified column was not found' })
  delete(@Param('columnId') columnId: number) {
    return this.columnsService.delete(columnId);
  }
}
