import { Result } from './result_entity.js'

export interface ResultRepository {

  createMany(results: Result[]): Promise<number | nil>

  all(): Promise<Result[]>
}