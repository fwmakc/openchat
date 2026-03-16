/**
 * @fileoverview Протокол реакций на сообщения
 * @module protocol/reaction
 */

import type { BaseRequest, BaseResponse } from './handshake.js'
import type { ReactionAction } from '../types/index.js'

/**
 * Запрос на добавление реакции
 * @interface ReactionAddRequest
 * @extends {BaseRequest}
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
 * Параметр reaction обязателен, если пользователь поставил несколько реакций
 * @interface ReactionRemoveRequest
 * @extends {BaseRequest}
 */
export interface ReactionRemoveRequest extends BaseRequest {
  type: 'reaction.remove'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
    /** Реакция для удаления (emoji) */
    reaction: string
  }
}

/**
 * Успешный ответ на добавление реакции
 * @interface ReactionAddSuccessResponse
 * @extends {BaseResponse}
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
 * @interface ReactionRemoveSuccessResponse
 * @extends {BaseResponse}
 */
export interface ReactionRemoveSuccessResponse extends BaseResponse {
  type: 'reaction.remove.success'
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
    /** Удалённая реакция */
    reaction: string
  }
}

/**
 * Уведомление о реакции (server push)
 * @interface ReactionNotification
 * @extends {BaseResponse}
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
    /** Действие: add или remove */
    action: ReactionAction
  }
}
