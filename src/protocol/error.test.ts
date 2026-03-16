import { describe, it, expect } from 'vitest'
import { createError, type ErrorCode, type ErrorResponse } from './error.js'

describe('createError', (): void => {
  it('creates error response with code and message', (): void => {
    const code: ErrorCode = 'AUTH_REQUIRED'
    const message = 'Authentication required'
    const result: ErrorResponse = createError(code, message)

    expect(result).toEqual({
      type: 'error',
      data: { code, message },
    })
  })

  it('creates error with CHAT_NOT_FOUND code', (): void => {
    const result = createError('CHAT_NOT_FOUND', 'Chat does not exist')

    expect(result.type).toBe('error')
    expect(result.data.code).toBe('CHAT_NOT_FOUND')
    expect(result.data.message).toBe('Chat does not exist')
  })

  it('creates error with RATE_LIMIT code', (): void => {
    const result = createError('RATE_LIMIT', 'Too many requests')

    expect(result.data.code).toBe('RATE_LIMIT')
  })

  it('creates error with PERMISSION_DENIED code', (): void => {
    const result = createError('PERMISSION_DENIED', 'Access denied')

    expect(result.data.code).toBe('PERMISSION_DENIED')
  })
})
