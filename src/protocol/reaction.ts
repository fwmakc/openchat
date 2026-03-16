import type { ReactionAction } from '../types/index.js'

export interface ReactionAddRequest {
  type: 'reaction.add'
  connectionId: string
  data: {
    chatId: string
    messageId: string
    reaction: string
  }
}

export interface ReactionRemoveRequest {
  type: 'reaction.remove'
  connectionId: string
  data: {
    chatId: string
    messageId: string
  }
}

export interface ReactionAddSuccessResponse {
  type: 'reaction.add.success'
  data: {
    chatId: string
    messageId: string
    reaction: string
  }
}

export interface ReactionRemoveSuccessResponse {
  type: 'reaction.remove.success'
  data: {
    chatId: string
    messageId: string
  }
}

export interface ReactionNotification {
  type: 'reaction.notification'
  data: {
    chatId: string
    messageId: string
    email: string
    reaction: string
    action: ReactionAction
  }
}
