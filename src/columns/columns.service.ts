import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from './column.entity';
import { CreateColumnDto, UpdateColumnDto } from './column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnsRepository: Repository<ColumnEntity>,
  ) {}

  async create(createDto: CreateColumnDto, userId: number) {
    const newColumn = await this.columnsRepository.create({
      ...createDto,
      userId,
    });

    return this.columnsRepository.save(newColumn);
  }

  async findById(id: number): Promise<ColumnEntity> {
    const column = await this.columnsRepository.findOneBy({ id });
    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }
    return column;
  }

  async delete(id: number) {
    const column = await this.findById(id);
    await this.columnsRepository.remove(column);
  }

  async getOwnerId(id: number): Promise<number> {
    const column = await this.columnsRepository.findOne({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }

    return column.userId;
  }

  async updateById(updateDto: UpdateColumnDto, id: number) {
    const column = await this.columnsRepository.findOne({
      where: { id },
    });

    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }

    return this.columnsRepository.save({
      ...column,
      ...updateDto,
    });
  }

  async getColumnsByUserId(userId: number) {
    const columns = await this.columnsRepository.find({
      where: {
        userId,
      },
    });

    return {
      columns,
    };
  }
}
