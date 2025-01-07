import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';

import { CardEntity } from '../cards/card.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  text: string;

  @ManyToOne(() => CardEntity, (card) => card.comments, { onDelete: 'CASCADE' })
  card: CardEntity;

  @Column({ select: false })
  @RelationId((comment: CommentEntity) => comment.card)
  cardId: number;

  @CreateDateColumn({ select: false })
  createdDate: Date;

  @UpdateDateColumn({ select: false })
  updatedDate: Date;
}
