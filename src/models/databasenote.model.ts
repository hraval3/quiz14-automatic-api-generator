import {Entity, model, property} from '@loopback/repository';

@model()
export class Databasenote extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  content?: string;


  constructor(data?: Partial<Databasenote>) {
    super(data);
  }
}

export interface DatabasenoteRelations {
  // describe navigational properties here
}

export type DatabasenoteWithRelations = Databasenote & DatabasenoteRelations;
