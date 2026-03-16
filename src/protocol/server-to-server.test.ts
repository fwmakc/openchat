import { describe, it, expect } from 'vitest'
import type {
  ServerUserCheckRequest,
  ServerUserCheckResponse,
  ServerChallengeRequest,
  ServerChallengeResponse,
} from './server-to-server.js'

describe('ServerUserCheckRequest', (): void => {
  it('creates valid request', (): void => {
    const request: ServerUserCheckRequest = {
      type: 'server.user_check',
      data: {
        email: 'user@example.com',
        requestingServer: 'server1.example.com',
      },
    }

    expect(request.type).toBe('server.user_check')
    expect(request.data.email).toBe('user@example.com')
    expect(request.data.requestingServer).toBe('server1.example.com')
  })
})

describe('ServerUserCheckResponse', (): void => {
  it('creates response for existing user', (): void => {
    const response: ServerUserCheckResponse = {
      type: 'server.user_check.success',
      data: {
        exists: true,
        publicKeys: ['key1', 'key2'],
      },
    }

    expect(response.data.exists).toBe(true)
    expect(response.data.publicKeys).toHaveLength(2)
  })

  it('creates response for non-existing user', (): void => {
    const response: ServerUserCheckResponse = {
      type: 'server.user_check.success',
      data: {
        exists: false,
        publicKeys: [],
      },
    }

    expect(response.data.exists).toBe(false)
    expect(response.data.publicKeys).toEqual([])
  })
})

describe('ServerChallengeRequest', (): void => {
  it('creates valid challenge request', (): void => {
    const request: ServerChallengeRequest = {
      type: 'server.challenge',
      data: {
        email: 'user@example.com',
        challenge: 'random-challenge-string',
      },
    }

    expect(request.type).toBe('server.challenge')
    expect(request.data.challenge).toBe('random-challenge-string')
  })
})

describe('ServerChallengeResponse', (): void => {
  it('creates valid challenge response', (): void => {
    const response: ServerChallengeResponse = {
      type: 'server.challenge.response',
      data: {
        email: 'user@example.com',
        challenge: 'random-challenge-string',
        signature: 'base64-signature',
      },
    }

    expect(response.type).toBe('server.challenge.response')
    expect(response.data.signature).toBe('base64-signature')
  })
})
