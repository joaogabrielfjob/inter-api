import { Opponent } from './opponent.js'

export interface OpponentRepository {

  createMany(opponents: Opponent[]): Promise<number | nil>

  all(): Promise<Opponent[]>
}