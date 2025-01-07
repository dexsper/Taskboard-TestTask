import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { UserEntity } from '../../users/user.entity';

import { IRelationResolver } from '../relation.inteface';
import { ColumnRelationResolver } from './column-resolver';
import { UserRelationRole } from '../roles';

@Injectable()
export class CoreRelationResolver {
  private readonly relationResolvers: IRelationResolver[];

  constructor(private readonly columnRelationResolver: ColumnRelationResolver) {
    this.relationResolvers = [this.columnRelationResolver];
  }

  async getRelationRoles(
    user: UserEntity,
    requiredRelations: UserRelationRole[],
    request: Request,
  ): Promise<UserRelationRole[]> {
    let relationRoles = [];

    const relationResolver = this.findRelationResolver(requiredRelations);

    if (relationResolver) {
      relationRoles = await relationResolver.getRelations(user, request);
    }

    return relationRoles;
  }

  findRelationResolver(
    requiredRelations: UserRelationRole[],
  ): IRelationResolver {
    let result = null;

    for (const relationResolver of this.relationResolvers) {
      const supportedRelations = relationResolver.getSupportedRelations();

      const matches = supportedRelations.filter((sr) => {
        return !!requiredRelations.find((rr) => rr === sr);
      });

      if (matches.length) {
        result = relationResolver;
        break;
      }
    }

    return result;
  }
}
