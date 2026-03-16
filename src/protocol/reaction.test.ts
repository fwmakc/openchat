import { describe, it, expect } from 'vitest'
import type { ReactionAddRequest, ReactionRemoveRequest } from './reaction.js'

describe('ReactionAddRequest', (): void => {
  it('creates valid add request', (): void => {
    const request: ReactionAddRequest = {
      type: 'reaction.add',
      connectionId: 'conn-123',
      data: {
        chatId: 'chat-456',
        messageId: 'msg-789',
        reaction: '👍',
      },
    }

    expect(request.type).toBe('reaction.add')
    expect(request.data.chatId).toBe('chat-456')
    expect(request.data.messageId).toBe('msg-789')
    expect(request.data.reaction).toBe('👍')
  })
})

describe('ReactionRemoveRequest', (): void => {
  it('creates valid remove request', (): void => {
    const request: ReactionRemoveRequest = {
      type: 'reaction.remove',
      connectionId: 'conn-123',
      data: {
        chatId: 'chat-456',
        messageId: 'msg-789',
      },
    }

    expect(request.type).toBe('reaction.remove')
    expect(request.data.chatId).toBe('chat-456')
    expect(request.data.messageId).toBe('msg-789')
  })
})
