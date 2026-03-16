import type { BaseRequest, BaseResponse } from './handshake.js'
import type { ReactionAction } from '../types/index.js'

/**
 * Запрос на добавление реакции
 */
export interface ReactionAddRequest extends BaseRequest {
  type: 'reaction.add'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
    /** Реакция (emoji) */
    reaction: string
  }
}

/**
 * Запрос на удаление реакции
 */
export interface ReactionRemoveRequest extends BaseRequest {
  type: 'reaction.remove'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
    reaction: string
  }
}

/**
 * Успешный ответ на добавление реакции
 */
export interface ReactionAddSuccessResponse extends BaseResponse {
  type: 'reaction.add.success'
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
    /** Добавленная реакция */
    reaction: string
  }
}

/**
 * Успешный ответ на удаление реакции
 */
export interface ReactionRemoveSuccessResponse extends BaseResponse {
  type: 'reaction.remove.success'
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
    reaction: string
  }
}

/**
 * Уведомление о реакции (server push)
 */
export interface ReactionNotification extends BaseResponse {
  type: 'reaction.notification'
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
    /** Email пользователя */
    email: string
    /** Реакция (emoji) */
    reaction: string
    /** Действие */
    action: ReactionAction
  }
}
