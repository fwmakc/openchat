import { describe, it, expect } from 'vitest'
import type {
  ServerInfoRequest,
  ServerInfoResponse,
  ServerChatsRequest,
  ServerChatsResponse,
  UserCheckRequest,
  UserCheckResponse,
  UserProfileRequest,
  UserProfileUpdateRequest,
  UserChatsResponse,
} from './server.js'

describe('ServerInfoRequest', (): void => {
  it('creates valid request', (): void => {
    const request: ServerInfoRequest = { type: 'server.info' }
    expect(request.type).toBe('server.info')
  })
})

describe('ServerInfoResponse', (): void => {
  it('creates valid response', (): void => {
    const response: ServerInfoResponse = {
      type: 'server.info.success',
      data: {
        url: 'https://example.com',
        name: 'Test Server',
        version: '1.0.0',
        features: ['e2e'],
        limits: { maxParticipants: 100, maxMessageSize: 4096, rateLimit: 50 },
      },
    }

    expect(response.type).toBe('server.info.success')
    expect(response.data.name).toBe('Test Server')
  })
})

describe('ServerChatsRequest', (): void => {
  it('creates valid request', (): void => {
    const request: ServerChatsRequest = { type: 'server.chats' }
    expect(request.type).toBe('server.chats')
  })
})

describe('ServerChatsResponse', (): void => {
  it('creates valid response with chats', (): void => {
    const response: ServerChatsResponse = {
      type: 'server.chats.success',
      data: {
        chats: [
          {
            chatId: 'chat-1',
            name: 'General',
            type: 'public',
            visible: true,
            join: true,
            settings: {
              maxParticipants: 50,
              messageSize: 1024,
              historyLimit: 100,
              allowedContentTypes: ['text'],
            },
            participantCount: 10,
          },
        ],
      },
    }

    expect(response.data.chats).toHaveLength(1)
    expect(response.data.chats[0].name).toBe('General')
  })
})

describe('UserCheckRequest', (): void => {
  it('creates valid request', (): void => {
    const request: UserCheckRequest = {
      type: 'user.check',
      data: { email: 'user@example.com' },
    }

    expect(request.type).toBe('user.check')
    expect(request.data.email).toBe('user@example.com')
  })
})

describe('UserCheckResponse', (): void => {
  it('creates response for existing user', (): void => {
    const response: UserCheckResponse = {
      type: 'user.check.success',
      data: {
        exists: true,
        profile: {
          email: 'user@example.com',
          status: 'online',
          visible: true,
        },
        chats: ['chat-1', 'chat-2'],
      },
    }

    expect(response.data.exists).toBe(true)
    expect(response.data.chats).toHaveLength(2)
  })

  it('creates response for non-existing user', (): void => {
    const response: UserCheckResponse = {
      type: 'user.check.success',
      data: { exists: false },
    }

    expect(response.data.exists).toBe(false)
    expect(response.data.profile).toBeUndefined()
  })
})

describe('UserProfileRequest', (): void => {
  it('creates valid request', (): void => {
    const request: UserProfileRequest = {
      type: 'user.profile',
      data: { email: 'user@example.com' },
    }

    expect(request.type).toBe('user.profile')
  })
})

describe('UserProfileUpdateRequest', (): void => {
  it('creates valid update request', (): void => {
    const request: UserProfileUpdateRequest = {
      type: 'user.profile.update',
      connectionId: 'conn-123',
      data: { nickname: 'newname', status: 'away' },
    }

    expect(request.connectionId).toBe('conn-123')
    expect(request.data.nickname).toBe('newname')
  })
})

describe('UserChatsResponse', (): void => {
  it('creates valid response with unread counts', (): void => {
    const response: UserChatsResponse = {
      type: 'user.chats.success',
      data: {
        chats: [
          {
            chatId: 'chat-1',
            name: 'Chat 1',
            type: 'public',
            visible: true,
            join: true,
            settings: {
              maxParticipants: 50,
              messageSize: 1024,
              historyLimit: 100,
              allowedContentTypes: ['text'],
            },
            participantCount: 5,
            unreadCount: 10,
          },
        ],
      },
    }

    expect(response.data.chats[0].unreadCount).toBe(10)
  })
})
