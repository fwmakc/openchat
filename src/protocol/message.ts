import type { Message } from '../types/index.js'

export interface MessageSendRequest {
  type: 'message.send'
  connectionId: string
  data: {
    chatId: string
    messageId: string
    contentType: string
    content: string
    timestamp: number
  }
}

export interface MessageSendSuccessResponse {
  type: 'message.send.success'
  data: {
    messageId: string
    serverTimestamp: number
  }
}

export interface MessageReceiveNotification {
  type: 'message.receive'
  data: Message
}

export interface MessageStatusRequest {
  type: 'message.status'
  connectionId: string
  data: {
    messageId: string
    status: 'delivered' | 'read'
  }
}

export interface HistoryGetRequest {
  type: 'history.get'
  connectionId: string
  data: {
    chatId: string
    from?: string
    limit: number
  }
}

export interface HistoryGetResponse {
  type: 'history.get.success'
  data: {
    messages: Message[]
    hasMore: boolean
  }
}
