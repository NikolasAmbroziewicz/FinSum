import { 
  Controller,
  Get,
  Query
} from '@nestjs/common';

import { ElasticSearchService } from './elastic_search.service'
import { ExternalCryptoApiService } from '../external_crypto_api/external_crypto_api.service'

@Controller('elastic-search')
export class ElasticSearchController {
  private index_name: string;
  constructor(
    private elasticSearchService: ElasticSearchService,
    private externalCryptoApiService: ExternalCryptoApiService,
  ) {}


  @Get('v1/fetch-and-index-crypto-options')
  async fetchAndIndexCryptoOptions() {
    try {
      this.index_name = 'crypto_options'

      const crypto_response = await this.externalCryptoApiService.fetchDataFromApi()

      for (const data of crypto_response.data.data) {
        await this.elasticSearchService.indexDocument(this.index_name, data.id.toString(), data);
      }

      return 'Data indexed Successfully.'
    } catch (error) {
      throw error
    }
  }

  @Get('v1/search-crypto-options')
  async searchCryptoOptions(
    @Query('q') query: string,
    @Query('sort') sort: string
  ) {
    const regex_pattern = `.*${query}.*`;

    const search_query = {
      bool: {
        must: [
          {
            regexp: {
              name: regex_pattern,
            },
          },
        ],
      },
    };

    const sort_options = sort === 'desc' ? 'desc': 'asc'

    const res = await this.elasticSearchService.search(this.index_name, {
      query: search_query,
      sort: [{ id: {order: sort_options }}]
    })

    return res.hits.hits.map(hit => hit._source);
  }
}
