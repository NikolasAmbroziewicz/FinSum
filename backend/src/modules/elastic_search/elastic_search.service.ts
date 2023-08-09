import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Client } from 'elasticsearch'

@Injectable()
export class ElasticSearchService {
  private client: Client

  constructor(
    private configService: ConfigService
  ) {
    this.client = new Client({
      node: this.configService.get<string>('ELASTIC_SEARCH_HOST')
    })
  }

  async indexDocument(index: string, id: string, body: any): Promise<void> {
    await this.client.index({
      index,
      id,
      body,
    });
  }

  async search(index: string, query: any): Promise<any> {
    return this.client.search({
      index, 
      body: query
    })
  }
}
