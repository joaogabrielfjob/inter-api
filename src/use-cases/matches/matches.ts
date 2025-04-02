import { MatchRepository } from '../../domain/match/match_repository.js'
import { MatchesOutput } from './types.js'

export class Matches {

  constructor(private readonly repo: MatchRepository) { }

  async do(): Promise<MatchesOutput[]> {
    const matches = await this.repo.all()

    return matches
  }
}