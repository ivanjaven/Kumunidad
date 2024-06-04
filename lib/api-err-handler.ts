import { APIResponse } from '@/lib/api-res-helper'

export function APIErrHandler(error: Error & { code: string }) {
  if ('code' in error && errorResponses[error.code]) {
    return errorResponses[error.code]()
  }
  return null // Return null if no matching error code found
}

const errorResponses: { [key: string]: () => any } = {
  ER_BAD_DB_ERROR: () => APIResponse({ error: 'Database not found' }, 404),
  ER_ACCESS_DENIED_ERROR: () =>
    APIResponse({ error: 'Database access denied' }, 403),
  // Add more error codes and corresponding response functions as needed
}
