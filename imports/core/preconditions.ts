import { DomainError, OperationError, die, buildError } from './domain/errors';

export function ensure<T> (test: () => T | null | undefined, error: DomainError): T | never {
  const result = test()

  if (result == null) {
    throw buildError(error)
  }

  return result
}

export function notNull<T> (value: T | null): T | never {
  if (value == null) {
    throw new Error(OperationError.CANNOT_BE_NULL)
  }

  return value
}