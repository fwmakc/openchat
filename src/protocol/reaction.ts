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
