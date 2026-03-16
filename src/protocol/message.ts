import type { Message, ContentType, MessageStatus, MessageReaction } from '../types/index.js'

/**
 * Запрос на отправку сообщения
 */
export interface MessageSendRequest {
  type: 'message.send'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения (генерируется клиентом) */
    messageId: string
    /** Тип содержимого */
    contentType: ContentType
    /** Зашифрованное содержимое (base64) */
    content: string
    /** Unix timestamp клиента */
    timestamp: number
  }
}

/**
 * Успешный ответ на отправку сообщения
 */
export interface MessageSendSuccessResponse {
  type: 'message.send.success'
  data: {
    /** ID сообщения */
    messageId: string
    /** Unix timestamp сервера */
    serverTimestamp: number
  }
}

/**
 * Уведомление о новом сообщении (server push)
 */
export interface MessageReceiveNotification {
  type: 'message.receive'
  data: Message
}

/**
 * Запрос на обновление статуса сообщения
 */
export interface MessageStatusRequest {
  type: 'message.status'
  connectionId: string
  data: {
    /** ID сообщения */
    messageId: string
    /** Новый статус (delivered или read) */
    status: Exclude<MessageStatus, 'sent'>
  }
}

/**
 * Успешный ответ на обновление статуса
 */
export interface MessageStatusSuccessResponse {
  type: 'message.status.success'
  data: {
    /** ID сообщения */
    messageId: string
    /** Подтверждённый статус */
    status: Exclude<MessageStatus, 'sent'>
  }
}

/**
 * Уведомление об изменении статуса сообщения (server push)
 */
export interface MessageStatusNotification {
  type: 'message.status.notification'
  data: {
    /** ID сообщения */
    messageId: string
    /** ID чата */
    chatId: string
    /** Email пользователя, изменившего статус */
    email: string
    /** Новый статус */
    status: Exclude<MessageStatus, 'sent'>
  }
}

/**
 * Запрос на получение истории сообщений
 */
export interface MessagesHistoryRequest {
  type: 'messages.history'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения для пагинации (опционально) */
    from?: string
    /** Количество сообщений */
    limit: number
  }
}

/**
 * Ответ с историей сообщений
 */
export interface MessagesHistoryResponse {
  type: 'messages.history.success'
  data: {
    /** Сообщения */
    messages: Message[]
    /** Есть ли ещё сообщения */
    hasMore: boolean
  }
}

/**
 * Запрос на получение реакций сообщения
 */
export interface MessageReactionsRequest {
  type: 'message.reactions'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
  }
}

/**
 * Ответ с реакциями сообщения
 */
export interface MessageReactionsResponse {
  type: 'message.reactions.success'
  data: {
    /** ID сообщения */
    messageId: string
    /** Реакции на сообщение */
    reactions: MessageReaction[]
  }
}
