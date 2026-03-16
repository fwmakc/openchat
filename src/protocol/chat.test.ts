import { describe, it, expect } from 'vitest'
import type {
  AuthConnectRequest,
  AuthConnectSuccessResponse,
  AuthVerifyRequiredResponse,
  AuthVerifyRequest,
  ChatCreateRequest,
  ChatCreateSuccessResponse,
  ChatInfoRequest,
  ChatUpdateRequest,
  ChatLeaveRequest,
  ChatKickRequest,
  ChatInviteRequest,
} from './chat.js'

describe('AuthConnectRequest', (): void => {
  it('creates valid connect request', (): void => {
    const request: AuthConnectRequest = {
      type: 'auth.connect',
      data: {
        email: 'user@example.com',
        chatId: 'chat-123',
        publicKey: 'base64-public-key',
      },
    }

    expect(request.type).toBe('auth.connect')
    expect(request.data.email).toBe('user@example.com')
    expect(request.data.publicKey).toBe('base64-public-key')
  })
})

describe('AuthConnectSuccessResponse', (): void => {
  it('creates valid success response', (): void => {
    const response: AuthConnectSuccessResponse = {
      type: 'auth.connect.success',
      data: {
        connectionId: 'conn-123',
        encryptedChatKey: 'encrypted-key-base64',
        chatSettings: {
          maxParticipants: 100,
          messageSize: 4096,
          historyLimit: 1000,
          allowedContentTypes: ['text', 'media'],
        },
      },
    }

    expect(response.type).toBe('auth.connect.success')
    expect(response.data.connectionId).toBe('conn-123')
    expect(response.data.chatSettings.maxParticipants).toBe(100)
  })
})

describe('AuthVerifyRequiredResponse', (): void => {
  it('creates verify required response', (): void => {
    const response: AuthVerifyRequiredResponse = {
      type: 'auth.verify_required',
      data: { challenge: 'challenge-string' },
    }

    expect(response.type).toBe('auth.verify_required')
    expect(response.data.challenge).toBe('challenge-string')
  })
})

describe('AuthVerifyRequest', (): void => {
  it('creates valid verify request', (): void => {
    const request: AuthVerifyRequest = {
      type: 'auth.verify',
      data: {
        email: 'user@example.com',
        chatId: 'chat-123',
        publicKey: 'base64-key',
        code: '123456',
      },
    }

    expect(request.type).toBe('auth.verify')
    expect(request.data.code).toBe('123456')
  })
})

describe('ChatCreateRequest', (): void => {
  it('creates valid chat creation request', (): void => {
    const request: ChatCreateRequest = {
      type: 'chat.create',
      connectionId: 'conn-123',
      data: {
        name: 'New Chat',
        type: 'public',
        visible: true,
        join: true,
      },
    }

    expect(request.type).toBe('chat.create')
    expect(request.data.name).toBe('New Chat')
    expect(request.data.type).toBe('public')
  })

  it('creates chat with custom settings', (): void => {
    const request: ChatCreateRequest = {
      type: 'chat.create',
      connectionId: 'conn-123',
      data: {
        name: 'Custom Chat',
        description: 'A custom chat',
        type: 'protected',
        visible: false,
        join: false,
        settings: {
          maxParticipants: 20,
          messageSize: 2048,
          historyLimit: 500,
          allowedContentTypes: ['text'],
        },
      },
    }

    expect(request.data.settings?.maxParticipants).toBe(20)
  })
})

describe('ChatCreateSuccessResponse', (): void => {
  it('creates valid response', (): void => {
    const response: ChatCreateSuccessResponse = {
      type: 'chat.create.success',
      data: {
        chatId: 'chat-new',
        encryptedChatKey: 'encrypted-key',
      },
    }

    expect(response.data.chatId).toBe('chat-new')
  })
})

describe('ChatInfoRequest', (): void => {
  it('creates valid request', (): void => {
    const request: ChatInfoRequest = {
      type: 'chat.info',
      connectionId: 'conn-1',
      data: { chatId: 'chat-1' },
    }

    expect(request.data.chatId).toBe('chat-1')
  })
})

describe('ChatUpdateRequest', (): void => {
  it('creates valid update request', (): void => {
    const request: ChatUpdateRequest = {
      type: 'chat.update',
      connectionId: 'conn-1',
      data: {
        chatId: 'chat-1',
        name: 'Updated Name',
        join: false,
      },
    }

    expect(request.data.name).toBe('Updated Name')
    expect(request.data.join).toBe(false)
  })
})

describe('ChatInviteRequest', (): void => {
  it('creates valid invite request', (): void => {
    const request: ChatInviteRequest = {
      type: 'chat.invite',
      connectionId: 'conn-1',
      data: {
        chatId: 'chat-1',
        email: 'invited@example.com',
        role: 'member',
      },
    }

    expect(request.data.email).toBe('invited@example.com')
    expect(request.data.role).toBe('member')
  })
})

describe('ChatLeaveRequest', (): void => {
  it('creates valid leave request', (): void => {
    const request: ChatLeaveRequest = {
      type: 'chat.leave',
      connectionId: 'conn-1',
      data: { chatId: 'chat-1' },
    }

    expect(request.type).toBe('chat.leave')
  })
})

describe('ChatKickRequest', (): void => {
  it('creates valid kick request', (): void => {
    const request: ChatKickRequest = {
      type: 'chat.kick',
      connectionId: 'conn-1',
      data: {
        chatId: 'chat-1',
        email: 'kicked@example.com',
      },
    }

    expect(request.data.email).toBe('kicked@example.com')
  })
})
