import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Databasenote} from '../models';
import {DatabasenoteRepository} from '../repositories';

export class DbnoteController {
  constructor(
    @repository(DatabasenoteRepository)
    public databasenoteRepository : DatabasenoteRepository,
  ) {}

  @post('/databasenotes')
  @response(200, {
    description: 'Databasenote model instance',
    content: {'application/json': {schema: getModelSchemaRef(Databasenote)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Databasenote, {
            title: 'NewDatabasenote',
            exclude: ['id'],
          }),
        },
      },
    })
    databasenote: Omit<Databasenote, 'id'>,
  ): Promise<Databasenote> {
    return this.databasenoteRepository.create(databasenote);
  }

  @get('/databasenotes/count')
  @response(200, {
    description: 'Databasenote model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Databasenote) where?: Where<Databasenote>,
  ): Promise<Count> {
    return this.databasenoteRepository.count(where);
  }

  @get('/databasenotes')
  @response(200, {
    description: 'Array of Databasenote model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Databasenote, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Databasenote) filter?: Filter<Databasenote>,
  ): Promise<Databasenote[]> {
    return this.databasenoteRepository.find(filter);
  }

  @patch('/databasenotes')
  @response(200, {
    description: 'Databasenote PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Databasenote, {partial: true}),
        },
      },
    })
    databasenote: Databasenote,
    @param.where(Databasenote) where?: Where<Databasenote>,
  ): Promise<Count> {
    return this.databasenoteRepository.updateAll(databasenote, where);
  }

  @get('/databasenotes/{id}')
  @response(200, {
    description: 'Databasenote model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Databasenote, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Databasenote, {exclude: 'where'}) filter?: FilterExcludingWhere<Databasenote>
  ): Promise<Databasenote> {
    return this.databasenoteRepository.findById(id, filter);
  }

  @patch('/databasenotes/{id}')
  @response(204, {
    description: 'Databasenote PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Databasenote, {partial: true}),
        },
      },
    })
    databasenote: Databasenote,
  ): Promise<void> {
    await this.databasenoteRepository.updateById(id, databasenote);
  }

  @put('/databasenotes/{id}')
  @response(204, {
    description: 'Databasenote PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() databasenote: Databasenote,
  ): Promise<void> {
    await this.databasenoteRepository.replaceById(id, databasenote);
  }

  @del('/databasenotes/{id}')
  @response(204, {
    description: 'Databasenote DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.databasenoteRepository.deleteById(id);
  }
}
