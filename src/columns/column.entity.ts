import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  RelationId,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../users/user.entity';
import { CardEntity } from '../cards/card.entity';

@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.columns, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column({ select: false })
  @RelationId((column: ColumnEntity) => column.user)
  userId: number;

  @OneToMany(() => CardEntity, (card) => card.column)
  cards: CardEntity[];

  @CreateDateColumn({ select: false })
  createdDate: Date;

  @UpdateDateColumn({ select: false })
  updatedDate: Date;
}
