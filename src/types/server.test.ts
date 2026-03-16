import { describe, it, expect } from 'vitest'
import type { ServerLimits, ServerSettings, ServerInfo } from './server.js'

describe('ServerLimits interface', (): void => {
  it('creates valid limits', (): void => {
    const limits: ServerLimits = {
      maxParticipants: 1000,
      maxMessageSize: 8192,
      rateLimit: 100,
    }

    expect(limits.maxParticipants).toBe(1000)
    expect(limits.maxMessageSize).toBe(8192)
    expect(limits.rateLimit).toBe(100)
  })
})

describe('ServerSettings interface', (): void => {
  it('creates valid settings', (): void => {
    const settings: ServerSettings = {
      registrationOpen: true,
      trustedServers: ['server1.example.com', 'server2.example.com'],
      emailWhitelist: [],
      emailBlacklist: ['spam.com'],
      ipWhitelist: [],
      ipBlacklist: [],
      emailVerificationRequired: true,
      chatCreationOpen: true,
      allowPublicChats: true,
      allowProtectedChats: true,
      maxParticipantsPerChat: 100,
      maxMessageSize: 4096,
      historyLimit: 1000,
      allowedContentTypes: ['text', 'media'],
    }

    expect(settings.registrationOpen).toBe(true)
    expect(settings.trustedServers).toHaveLength(2)
    expect(settings.emailVerificationRequired).toBe(true)
  })
})

describe('ServerInfo interface', (): void => {
  it('creates valid server info', (): void => {
    const info: ServerInfo = {
      url: 'https://chat.example.com',
      name: 'Example Chat Server',
      description: 'A test chat server',
      icon: 'https://example.com/icon.png',
      version: '1.0.0',
      features: ['e2e', 'calls', 'media'],
      limits: {
        maxParticipants: 500,
        maxMessageSize: 4096,
        rateLimit: 50,
      },
    }

    expect(info.url).toBe('https://chat.example.com')
    expect(info.name).toBe('Example Chat Server')
    expect(info.version).toBe('1.0.0')
    expect(info.features).toHaveLength(3)
  })

  it('creates minimal server info', (): void => {
    const info: ServerInfo = {
      url: 'https://localhost:8080',
      name: 'Local Server',
      version: '0.1.0',
      features: [],
      limits: {
        maxParticipants: 10,
        maxMessageSize: 1024,
        rateLimit: 10,
      },
    }

    expect(info.description).toBeUndefined()
    expect(info.icon).toBeUndefined()
    expect(info.features).toEqual([])
  })
})
