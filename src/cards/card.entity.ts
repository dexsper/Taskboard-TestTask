import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';

import { ColumnEntity } from '../columns/column.entity';
import { CommentEntity } from '../comments/comment.entity';

@Entity('cards')
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 400, nullable: true, default: '' })
  description: string;

  @ManyToOne(() => ColumnEntity, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  column: ColumnEntity;

  @Column({ select: false })
  @RelationId((card: CardEntity) => card.column)
  columnId: number;

  @OneToMany(() => CommentEntity, (comment) => comment.card)
  comments: CommentEntity[];

  @CreateDateColumn({ select: false })
  createdDate: Date;

  @UpdateDateColumn({ select: false })
  updatedDate: Date;
}
