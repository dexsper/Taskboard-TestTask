import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CardEntity } from './card.entity';
import { CreateCardDto, UpdateCardDto } from './card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardsRepository: Repository<CardEntity>,
  ) {}

  async create(createDto: CreateCardDto, columnId: number) {
    const newCard = await this.cardsRepository.create({
      ...createDto,
      columnId,
    });

    return this.cardsRepository.save(newCard);
  }

  async findById(id: number): Promise<CardEntity> {
    const card = await this.cardsRepository.findOneBy({ id });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async delete(id: number) {
    const card = await this.findById(id);
    await this.cardsRepository.remove(card);
  }

  async updateById(updateDto: UpdateCardDto, id: number) {
    const card = await this.cardsRepository.findOne({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return this.cardsRepository.save({
      ...card,
      ...updateDto,
    });
  }

  async getCardsByColumnId(columnId: number) {
    const cards = await this.cardsRepository.find({
      where: {
        columnId,
      },
    });

    return {
      cards,
    };
  }
}
