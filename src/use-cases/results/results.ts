import { ResultRepository } from '../../domain/result/result_repository.js';
import { ResultsOutput } from './types.js';

export class Results {

  constructor(private readonly repo: ResultRepository) { }

  async do(): Promise<ResultsOutput[]> {
    const results = await this.repo.all()

    return results
  }
}