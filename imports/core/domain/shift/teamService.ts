import { TeamRepository, PublisherRepository, ShiftRepository } from '../repositories';
import { DomainError } from '../errors';
import { ensure } from '../../preconditions';
import { Team } from './team';
import { ShiftStatus } from './shift';

export class TeamService {
  _teamRepo: TeamRepository
  _publisherRepo: PublisherRepository
  _shiftRepo: ShiftRepository;
  

  constructor(teamRepo: TeamRepository, publisherRepo: PublisherRepository, shiftRepo: ShiftRepository) {
    this._teamRepo = teamRepo
    this._publisherRepo = publisherRepo
    this._shiftRepo = shiftRepo
  }

  request (shiftId: string, teamId: string, publisherId: string): string {
    const team = ensure<Team>(() => this._teamRepo.find(teamId), DomainError.TEAM_NOT_FOUND)
    ensure(() => this._publisherRepo.find(publisherId), DomainError.PUBLISHER_NOT_FOUND)
    ensure(() => {
      const shift = this._shiftRepo.find(shiftId)
      return shift != null && shift.status === ShiftStatus.OPEN
    }, DomainError.SHIFT_NOT_OPEN)

    const request = team.request(publisherId)
    this._teamRepo.save(team)

    return request.requestId
  }
}