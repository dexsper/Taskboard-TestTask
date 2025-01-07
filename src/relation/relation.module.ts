import { Module } from '@nestjs/common';

import { ColumnsModule } from '../columns/columns.module';
import { CardsModule } from '../cards/cards.module';
import { CommentsModule } from '../comments/comments.module';

import { CoreRelationResolver } from './resolvers';
import { ColumnRelationResolver } from './resolvers/column-resolver';

@Module({
  imports: [ColumnsModule, CardsModule, CommentsModule],
  providers: [CoreRelationResolver, ColumnRelationResolver],
  exports: [CoreRelationResolver],
})
export class RelationModule {}
