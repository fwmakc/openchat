import { describe, it, expect } from 'vitest'
import type {
  Chat,
  ChatSettings,
  ChatType,
  ParticipantRole,
  ParticipantInfo,
  ParticipantDetails,
} from './chat.js'

describe('ChatType type', (): void => {
  it('allows valid chat types', (): void => {
    const types: ChatType[] = ['public', 'protected']
    expect(types).toHaveLength(2)
  })
})

describe('ParticipantRole type', (): void => {
  it('allows valid roles', (): void => {
    const roles: ParticipantRole[] = ['owner', 'moderator', 'member', 'observer']
    expect(roles).toHaveLength(4)
  })
})

describe('ChatSettings interface', (): void => {
  it('creates valid settings', (): void => {
    const settings: ChatSettings = {
      maxParticipants: 100,
      messageSize: 4096,
      historyLimit: 1000,
      allowedContentTypes: ['text', 'media'],
    }

    expect(settings.maxParticipants).toBe(100)
    expect(settings.messageSize).toBe(4096)
    expect(settings.historyLimit).toBe(1000)
    expect(settings.allowedContentTypes).toEqual(['text', 'media'])
  })
})

describe('Chat interface', (): void => {
  it('creates valid chat with required fields', (): void => {
    const chat: Chat = {
      chatId: 'chat-123',
      name: 'Test Chat',
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
    }

    expect(chat.chatId).toBe('chat-123')
    expect(chat.name).toBe('Test Chat')
    expect(chat.type).toBe('public')
  })

  it('creates valid chat with optional fields', (): void => {
    const chat: Chat = {
      chatId: 'chat-456',
      name: 'Protected Chat',
      description: 'A protected chat',
      icon: 'https://example.com/icon.png',
      type: 'protected',
      visible: false,
      join: false,
      settings: {
        maxParticipants: 10,
        messageSize: 2048,
        historyLimit: 500,
        allowedContentTypes: ['text', 'media', 'poll'],
      },
      participantCount: 3,
    }

    expect(chat.description).toBe('A protected chat')
    expect(chat.icon).toBe('https://example.com/icon.png')
  })
})

describe('ParticipantInfo interface', (): void => {
  it('creates valid participant info', (): void => {
    const participant: ParticipantInfo = {
      email: 'user@example.com',
      nickname: 'user1',
      connections: 2,
      role: 'member',
    }

    expect(participant.email).toBe('user@example.com')
    expect(participant.role).toBe('member')
    expect(participant.connections).toBe(2)
  })
})

describe('ParticipantDetails interface', (): void => {
  it('creates valid participant details', (): void => {
    const details: ParticipantDetails = {
      email: 'user@example.com',
      nickname: 'user1',
      connections: 1,
      role: 'moderator',
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://example.com/avatar.png',
      status: 'online',
      connectionIds: [{ connectionId: 'conn-1', connectedAt: Date.now() }],
    }

    expect(details.status).toBe('online')
    expect(details.connectionIds).toHaveLength(1)
    expect(details.role).toBe('moderator')
  })
})
