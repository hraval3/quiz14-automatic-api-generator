import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Databasenote, DatabasenoteRelations} from '../models';

export class DatabasenoteRepository extends DefaultCrudRepository<
  Databasenote,
  typeof Databasenote.prototype.id,
  DatabasenoteRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Databasenote, dataSource);
  }
}
