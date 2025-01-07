import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../users/user.entity';
import { ColumnsService } from '../../columns/columns.service';

import { IRelationResolver } from '../relation.inteface';
import { UserRelationRole } from '../roles';

@Injectable()
export class ColumnRelationResolver implements IRelationResolver {
  constructor(private readonly columnsService: ColumnsService) {}

  getSupportedRelations(): UserRelationRole[] {
    return [UserRelationRole.ColumnOwner];
  }

  async getRelations(
    user: UserEntity,
    request: any,
  ): Promise<UserRelationRole[]> {
    const columnId = Number(request.params?.columnId);
    if (isNaN(columnId)) {
      return [];
    }

    const relations = [];
    const ownerId = await this.columnsService.getOwnerId(
      request.params.columnId,
    );

    if (ownerId === user.id) {
      relations.push(UserRelationRole.ColumnOwner);
    }

    return relations;
  }
}
