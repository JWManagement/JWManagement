export enum DomainError {
  TEAM_NOT_FOUND = 'TEAM_NOT_FOUND',
  PUBLISHER_NOT_FOUND = 'PUBLISHER_NOT_FOUND',
  TEAM_ALREADY_FULL = 'TEAM_ALREADY_FULL',
  SHIFT_HAS_EXPIRED = 'SHIFT_HAS_EXPIRED',
  SHIFT_NOT_OPEN = 'SHIFT_NOT_OPEN',
  PUBLISHER_ALREADY_REQUESTED = 'PUBLISHER_ALREADY_REQUESTED',
  REQUEST_NOT_FOUND = 'REQUEST_NOT_FOUND',
  REQUEST_NOT_APPROVED = 'REQUEST_NOT_APPROVED',
  REQUEST_NOT_APPROVABLE = 'REQUEST_NOT_APPROVABLE',
  REQUEST_NOT_OPEN = 'REQUEST_NOT_OPEN'
}

export enum OperationError {
  CANNOT_BE_NULL = 'CANNOT_BE_NULL'
}

export function die(error: DomainError, details?: any): never {
  throw buildError(error, details)
}

export function buildError(error: DomainError, details?: any) {
  return {
    message: error,
    details: details
  }
}