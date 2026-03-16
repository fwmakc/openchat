/**
 * @fileoverview Типы данных сообщений
 * @module types/message
 */

/**
 * Тип содержимого сообщения
 * - text: текстовое сообщение
 * - media: медиа-контент (изображение, видео, аудио)
 * - poll: голосование
 * @typedef {'text' | 'media' | 'poll'} ContentType
 */
export type ContentType = 'text' | 'media' | 'poll'

/**
 * Статус доставки сообщения
 * - sent: отправлено на сервер
 * - delivered: доставлено клиенту
 * - read: прочитано
 * @typedef {'sent' | 'delivered' | 'read'} MessageStatus
 */
export type MessageStatus = 'sent' | 'delivered' | 'read'

/**
 * Тип звонка
 * @typedef {'audio' | 'video'} CallType
 */
export type CallType = 'audio' | 'video'

/**
 * Причина завершения звонка
 * - hangup: положили трубку
 * - rejected: отклонён
 * - timeout: нет ответа
 * - error: ошибка соединения
 * @typedef {'hangup' | 'rejected' | 'timeout' | 'error'} CallEndReason
 */
export type CallEndReason = 'hangup' | 'rejected' | 'timeout' | 'error'

/**
 * Действие с реакцией
 * @typedef {'add' | 'remove'} ReactionAction
 */
export type ReactionAction = 'add' | 'remove'

/**
 * Информация о реакции на сообщение
 * @interface MessageReaction
 */
export interface MessageReaction {
  /** Реакция (emoji) */
  reaction: string
  /** Количество пользователей, поставивших реакцию */
  count: number
  /** Email пользователей, поставивших реакцию */
  emails: string[]
}

/**
 * Сообщение в чате
 * @interface Message
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
  /** Unix timestamp создания */
  timestamp: number
  /** Unix timestamp последнего редактирования (если редактировалось) */
  editedAt?: number
  /** Флаг удаления сообщения */
  deleted?: boolean
}
