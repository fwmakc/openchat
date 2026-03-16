export type ContentType = 'text' | 'media' | 'poll'
export type MessageStatus = 'sent' | 'delivered' | 'read'
export type CallType = 'audio' | 'video'
export type CallEndReason = 'hangup' | 'rejected' | 'timeout' | 'error'
export type ReactionAction = 'add' | 'remove'

export interface Message {
  messageId: string
  chatId: string
  senderEmail: string
  senderConnectionId: string
  contentType: ContentType
  content: string
  timestamp: number
}
