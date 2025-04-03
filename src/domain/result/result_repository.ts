import { Result } from './result_entity.js'

export interface ResultRepository {

  createMany(results: Result[]): Promise<number | nil>

  filtered(year?: string, month?: string, league?: string, opponent?: string): Promise<Result[]>
}