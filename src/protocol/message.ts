/**
 * @fileoverview Протокол сообщений
 * @module protocol/message
 */

import type { BaseRequest, BaseResponse } from './handshake.js'
import type { Message, ContentType, MessageStatus, MessageReaction } from '../types/index.js'

/**
 * Запрос на отправку сообщения
 * @interface MessageSendRequest
 * @extends {BaseRequest}
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
 * @interface MessageSendSuccessResponse
 * @extends {BaseResponse}
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

/**
 * Запрос на редактирование сообщения
 * Участник редактирует только свои. Модератор/owner — любые.
 * @interface MessageEditRequest
 * @extends {BaseRequest}
 */
export interface MessageEditRequest extends BaseRequest {
  type: 'message.edit'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
    /** Новое зашифрованное содержимое (base64) */
    content: string
  }
}

/**
 * Успешный ответ на редактирование сообщения
 * @interface MessageEditSuccessResponse
 * @extends {BaseResponse}
 */
export interface MessageEditSuccessResponse extends BaseResponse {
  type: 'message.edit.success'
  data: {
    /** ID сообщения */
    messageId: string
    /** Unix timestamp редактирования */
    serverTimestamp: number
  }
}

/**
 * Уведомление о редактировании сообщения (server push)
 * @interface MessageEditedNotification
 * @extends {BaseResponse}
 */
export interface MessageEditedNotification extends BaseResponse {
  type: 'message.edited'
  data: {
    /** ID сообщения */
    messageId: string
    /** ID чата */
    chatId: string
    /** Новое зашифрованное содержимое (base64) */
    content: string
    /** Unix timestamp редактирования */
    editedAt: number
  }
}

/**
 * Запрос на удаление сообщения
 * Участник удаляет только свои. Модератор/owner — любые.
 * @interface MessageDeleteRequest
 * @extends {BaseRequest}
 */
export interface MessageDeleteRequest extends BaseRequest {
  type: 'message.delete'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
  }
}

/**
 * Успешный ответ на удаление сообщения
 * @interface MessageDeleteSuccessResponse
 * @extends {BaseResponse}
 */
export interface MessageDeleteSuccessResponse extends BaseResponse {
  type: 'message.delete.success'
  data: {
    /** ID сообщения */
    messageId: string
  }
}

/**
 * Уведомление об удалении сообщения (server push)
 * @interface MessageDeletedNotification
 * @extends {BaseResponse}
 */
export interface MessageDeletedNotification extends BaseResponse {
  type: 'message.deleted'
  data: {
    /** ID сообщения */
    messageId: string
    /** ID чата */
    chatId: string
    /** Email удалившего */
    deletedBy: string
  }
}

/**
 * Уведомление о новом сообщении (server push)
 * @interface MessageReceiveNotification
 * @extends {BaseResponse}
 */
export interface MessageReceiveNotification extends BaseResponse {
  type: 'message.receive'
  data: Message
}

/**
 * Запрос на обновление статуса сообщения
 * @interface MessageStatusRequest
 * @extends {BaseRequest}
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
 * @interface MessageStatusSuccessResponse
 * @extends {BaseResponse}
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
 * @interface MessageStatusNotification
 * @extends {BaseResponse}
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
 * @interface MessagesHistoryRequest
 * @extends {BaseRequest}
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
 * @interface MessagesHistoryResponse
 * @extends {BaseResponse}
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
 * @interface MessageReactionsRequest
 * @extends {BaseRequest}
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
 * @interface MessageReactionsResponse
 * @extends {BaseResponse}
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
