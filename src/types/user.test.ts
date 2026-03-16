import { describe, it, expect } from 'vitest'
import type { UserProfile, Connection, UserStatus } from './user.js'

describe('UserStatus type', (): void => {
  it('allows valid status values', (): void => {
    const statuses: UserStatus[] = ['online', 'offline', 'away']
    expect(statuses).toHaveLength(3)
  })
})

describe('UserProfile interface', (): void => {
  it('creates valid profile with required fields', (): void => {
    const profile: UserProfile = {
      email: 'test@example.com',
      status: 'online',
      visible: true,
    }

    expect(profile.email).toBe('test@example.com')
    expect(profile.status).toBe('online')
    expect(profile.visible).toBe(true)
  })

  it('creates valid profile with all fields', (): void => {
    const profile: UserProfile = {
      email: 'test@example.com',
      nickname: 'tester',
      firstName: 'Test',
      lastName: 'User',
      avatar: 'https://example.com/avatar.png',
      status: 'away',
      visible: false,
    }

    expect(profile.nickname).toBe('tester')
    expect(profile.firstName).toBe('Test')
    expect(profile.lastName).toBe('User')
    expect(profile.avatar).toBe('https://example.com/avatar.png')
  })
})

describe('Connection interface', (): void => {
  it('creates valid connection', (): void => {
    const connection: Connection = {
      connectionId: 'conn-123',
      email: 'test@example.com',
      chatId: 'chat-456',
      publicKey: 'public-key-base64',
      createdAt: Date.now(),
    }

    expect(connection.connectionId).toBe('conn-123')
    expect(connection.email).toBe('test@example.com')
    expect(connection.chatId).toBe('chat-456')
    expect(connection.publicKey).toBe('public-key-base64')
    expect(typeof connection.createdAt).toBe('number')
  })
})
