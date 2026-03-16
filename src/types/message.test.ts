import { describe, it, expect } from 'vitest'
import type { Message, MessageWithStatus, ContentType, MessageStatus } from './message.js'

describe('ContentType type', (): void => {
  it('allows valid content types', (): void => {
    const types: ContentType[] = ['text', 'media', 'poll']
    expect(types).toHaveLength(3)
  })
})

describe('MessageStatus type', (): void => {
  it('allows valid statuses', (): void => {
    const statuses: MessageStatus[] = ['sent', 'delivered', 'read']
    expect(statuses).toHaveLength(3)
  })
})

describe('Message interface', (): void => {
  it('creates valid message', (): void => {
    const message: Message = {
      messageId: 'msg-123',
      chatId: 'chat-456',
      senderEmail: 'user@example.com',
      senderConnectionId: 'conn-789',
      contentType: 'text',
      content: 'Hello, world!',
      timestamp: Date.now(),
    }

    expect(message.messageId).toBe('msg-123')
    expect(message.chatId).toBe('chat-456')
    expect(message.contentType).toBe('text')
    expect(message.content).toBe('Hello, world!')
  })

  it('creates valid media message', (): void => {
    const message: Message = {
      messageId: 'msg-456',
      chatId: 'chat-123',
      senderEmail: 'sender@example.com',
      senderConnectionId: 'conn-1',
      contentType: 'media',
      content: 'https://example.com/image.png',
      timestamp: 1234567890,
    }

    expect(message.contentType).toBe('media')
    expect(typeof message.timestamp).toBe('number')
  })
})

describe('MessageWithStatus interface', (): void => {
  it('extends Message with status', (): void => {
    const message: MessageWithStatus = {
      messageId: 'msg-789',
      chatId: 'chat-1',
      senderEmail: 'user@example.com',
      senderConnectionId: 'conn-1',
      contentType: 'text',
      content: 'Test message',
      timestamp: Date.now(),
      status: 'delivered',
    }

    expect(message.status).toBe('delivered')
  })
})
