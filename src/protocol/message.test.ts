import { describe, it, expect } from 'vitest'
import type {
  MessageSendRequest,
  MessageSendSuccessResponse,
  MessageReceiveNotification,
  MessageStatusRequest,
  HistoryGetRequest,
  HistoryGetResponse,
} from './message.js'

describe('MessageSendRequest', (): void => {
  it('creates valid send request', (): void => {
    const request: MessageSendRequest = {
      type: 'message.send',
      connectionId: 'conn-123',
      data: {
        chatId: 'chat-456',
        messageId: 'msg-789',
        contentType: 'text',
        content: 'Hello!',
        timestamp: Date.now(),
      },
    }

    expect(request.type).toBe('message.send')
    expect(request.data.chatId).toBe('chat-456')
    expect(request.data.contentType).toBe('text')
  })
})

describe('MessageSendSuccessResponse', (): void => {
  it('creates valid success response', (): void => {
    const response: MessageSendSuccessResponse = {
      type: 'message.send.success',
      data: {
        messageId: 'msg-789',
        serverTimestamp: Date.now(),
      },
    }

    expect(response.type).toBe('message.send.success')
    expect(response.data.messageId).toBe('msg-789')
    expect(typeof response.data.serverTimestamp).toBe('number')
  })
})

describe('MessageReceiveNotification', (): void => {
  it('creates valid receive notification', (): void => {
    const notification: MessageReceiveNotification = {
      type: 'message.receive',
      data: {
        messageId: 'msg-1',
        chatId: 'chat-1',
        senderEmail: 'sender@example.com',
        senderConnectionId: 'conn-1',
        contentType: 'text',
        content: 'Hello world',
        timestamp: 1234567890,
      },
    }

    expect(notification.type).toBe('message.receive')
    expect(notification.data.senderEmail).toBe('sender@example.com')
  })
})

describe('MessageStatusRequest', (): void => {
  it('creates delivered status request', (): void => {
    const request: MessageStatusRequest = {
      type: 'message.status',
      connectionId: 'conn-1',
      data: { messageId: 'msg-1', status: 'delivered' },
    }

    expect(request.data.status).toBe('delivered')
  })

  it('creates read status request', (): void => {
    const request: MessageStatusRequest = {
      type: 'message.status',
      connectionId: 'conn-1',
      data: { messageId: 'msg-1', status: 'read' },
    }

    expect(request.data.status).toBe('read')
  })
})

describe('HistoryGetRequest', (): void => {
  it('creates valid history request', (): void => {
    const request: HistoryGetRequest = {
      type: 'history.get',
      connectionId: 'conn-1',
      data: {
        chatId: 'chat-1',
        limit: 50,
      },
    }

    expect(request.data.chatId).toBe('chat-1')
    expect(request.data.limit).toBe(50)
    expect(request.data.from).toBeUndefined()
  })

  it('creates history request with from cursor', (): void => {
    const request: HistoryGetRequest = {
      type: 'history.get',
      connectionId: 'conn-1',
      data: {
        chatId: 'chat-1',
        from: 'msg-100',
        limit: 50,
      },
    }

    expect(request.data.from).toBe('msg-100')
  })
})

describe('HistoryGetResponse', (): void => {
  it('creates valid response', (): void => {
    const response: HistoryGetResponse = {
      type: 'history.get.success',
      data: {
        messages: [
          {
            messageId: 'msg-1',
            chatId: 'chat-1',
            senderEmail: 'user@example.com',
            senderConnectionId: 'conn-1',
            contentType: 'text',
            content: 'Message 1',
            timestamp: 1000,
          },
          {
            messageId: 'msg-2',
            chatId: 'chat-1',
            senderEmail: 'user2@example.com',
            senderConnectionId: 'conn-2',
            contentType: 'text',
            content: 'Message 2',
            timestamp: 2000,
          },
        ],
        hasMore: true,
      },
    }

    expect(response.data.messages).toHaveLength(2)
    expect(response.data.hasMore).toBe(true)
  })
})
