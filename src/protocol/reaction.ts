import type { ReactionAction } from '../types/index.js'

/**
 * Запрос на добавление реакции
 */
export interface ReactionAddRequest {
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
export interface ReactionRemoveRequest {
  type: 'reaction.remove'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
  }
}

/**
 * Успешный ответ на добавление реакции
 */
export interface ReactionAddSuccessResponse {
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
export interface ReactionRemoveSuccessResponse {
  type: 'reaction.remove.success'
  data: {
    /** ID чата */
    chatId: string
    /** ID сообщения */
    messageId: string
  }
}

/**
 * Уведомление о реакции (server push)
 */
export interface ReactionNotification {
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
