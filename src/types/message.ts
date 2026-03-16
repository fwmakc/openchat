/**
 * Тип содержимого сообщения
 */
export type ContentType = 'text' | 'media' | 'poll'

/**
 * Статус доставки сообщения
 */
export type MessageStatus = 'sent' | 'delivered' | 'read'

/**
 * Тип звонка
 */
export type CallType = 'audio' | 'video'

/**
 * Причина завершения звонка
 */
export type CallEndReason = 'hangup' | 'rejected' | 'timeout' | 'error'

/**
 * Действие с реакцией
 */
export type ReactionAction = 'add' | 'remove'

/**
 * Информация о реакции на сообщение
 */
export interface MessageReaction {
  /** Реакция (emoji) */
  reaction: string
  /** Количество */
  count: number
  /** Email пользователей, поставивших реакцию */
  emails: string[]
}

/**
 * Сообщение в чате
 */
export interface Message {
  /** ID сообщения */
  messageId: string
  /** ID чата */
  chatId: string
  /** Email отправителя */
  senderEmail: string
  /** Connection ID отправителя */
  senderConnectionId: string
  /** Тип содержимого */
  contentType: ContentType
  /** Зашифрованное содержимое (base64) */
  content: string
  /** Unix timestamp */
  timestamp: number
}
