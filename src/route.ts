import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';

export const routes = [
  {
    path: 'users',
    module: UsersModule,
    children: [
      {
        path: 'columns',
        module: ColumnsModule,
        children: [
          {
            path: ':columnId/cards',
            module: CardsModule,
            children: [
              {
                path: ':cardId/comments',
                module: CommentsModule,
              },
            ],
          },
        ],
      },
    ],
  },
];
