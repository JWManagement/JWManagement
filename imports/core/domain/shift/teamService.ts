import { TeamRepository, PublisherRepository } from '../../repositories';
import { DomainError } from '../errors';
import { ensure } from '../../preconditions';
import { Team } from './team';

export class TeamService {
  _teamRepo: TeamRepository
  _publisherRepo: PublisherRepository

  constructor(teamRepo: TeamRepository, publisherRepo: PublisherRepository) {
    this._teamRepo = teamRepo
    this._publisherRepo = publisherRepo
  }

  request (teamId: string, publisherId: string): string {
    const team = ensure<Team>(() => this._teamRepo.find(teamId), DomainError.TEAM_NOT_FOUND)
    ensure(() => this._publisherRepo.find(publisherId), DomainError.PUBLISHER_NOT_FOUND)

    const request = team.request(publisherId)
    this._teamRepo.save(team)

    return request.requestId
  }
}