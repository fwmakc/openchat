import type { BaseRequest, BaseResponse } from './handshake.js'
import type { Message, ContentType, MessageStatus, MessageReaction } from '../types/index.js'

/**
 * Запрос на отправку сообщения
 */
export interface MessageSendRequest extends BaseRequest {
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
export interface MessageSendSuccessResponse extends BaseResponse {
  type: 'message.send.success'
  data: {
    /** ID сообщения */
    messageId: string
    /** Unix timestamp сервера */
    serverTimestamp: number
  }
}

export interface MessageEditedNotification extends BaseResponse {
  type: 'message.edited'
  data: {
    messageId: string
    chatId: string
    content: string
    editedAt: number
  }
}

export interface MessageDeleteRequest extends BaseRequest {
  type: 'message.delete'
  connectionId: string
  data: {
    chatId: string
    messageId: string
  }
}

export interface MessageDeleteSuccessResponse extends BaseResponse {
  type: 'message.delete.success'
  data: {
    messageId: string
  }
}

export interface MessageDeletedNotification extends BaseResponse {
  type: 'message.deleted'
  data: {
    messageId: string
    chatId: string
    deletedBy: string
  }
}

/**
 * Уведомление о новом сообщении (server push)
 */
export interface MessageReceiveNotification extends BaseResponse {
  type: 'message.receive'
  data: Message
}

/**
 * Запрос на обновление статуса сообщения
 */
export interface MessageStatusRequest extends BaseRequest {
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
export interface MessageStatusSuccessResponse extends BaseResponse {
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
export interface MessageStatusNotification extends BaseResponse {
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
export interface MessagesHistoryRequest extends BaseRequest {
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
export interface MessagesHistoryResponse extends BaseResponse {
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
export interface MessageReactionsRequest extends BaseRequest {
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
export interface MessageReactionsResponse extends BaseResponse {
  type: 'message.reactions.success'
  data: {
    /** ID сообщения */
    messageId: string
    /** Реакции на сообщение */
    reactions: MessageReaction[]
  }
}
