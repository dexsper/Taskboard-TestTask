import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
  ) {}

  async create(createDto: CreateCommentDto, cardId: number) {
    const newComment = await this.commentsRepository.create({
      ...createDto,
      cardId,
    });

    return this.commentsRepository.save(newComment);
  }

  async findById(id: number): Promise<CommentEntity> {
    const comment = await this.commentsRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async delete(id: number) {
    const comment = await this.findById(id);
    await this.commentsRepository.remove(comment);
  }

  async updateById(updateDto: UpdateCommentDto, id: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return this.commentsRepository.save({
      ...comment,
      ...updateDto,
    });
  }

  async getCommentsByCardId(cardId: number) {
    const comments = await this.commentsRepository.find({
      where: {
        cardId,
      },
    });

    return {
      comments,
    };
  }
}
