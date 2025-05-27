import { ResultRepository } from '../../domain/result/result_repository.js'
import { ResultsOutput, ResultsParams } from './types.js'

export class Results {

  constructor(private readonly repo: ResultRepository) { }

  async do({ year, month, league, opponent }: ResultsParams): Promise<ResultsOutput[]> {
    const results = await this.repo.filtered(year, month, league, opponent)

    return results
  }
}