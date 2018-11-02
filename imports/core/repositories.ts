
import { Team } from './domain/shift/team'
import { Publisher } from './domain/shift/publisher';

export interface TeamRepository {
  find(id: string): Team | null

  save(team: Team)
}

export interface PublisherRepository {
  find(id: string): Publisher | null
}