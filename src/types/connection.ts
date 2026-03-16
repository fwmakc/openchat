/**
 * @fileoverview Типы данных подключений
 * @module types/connection
 */

/**
 * Подключение пользователя к чату
 * Связывает пользователя, сервер, чат и публичный ключ устройства
 * @interface Connection
 */
export interface Connection {
  /** Уникальный ID подключения */
  connectionId: string
  /** Email пользователя */
  email: string
  /** ID чата */
  chatId: string
  /** Публичный ключ устройства (base64) */
  publicKey: string
  /** Unix timestamp подключения */
  connectedAt: number
  /** Unix timestamp последней активности */
  lastActivityAt: number
}

/**
 * Причина отзыва подключения
 * - user_revoked: отозван самим пользователем
 * - moderator_revoked: отозван модератором/владельцем чата
 * @typedef {'user_revoked' | 'moderator_revoked'} ConnectionRevokeReason
 */
export type ConnectionRevokeReason = 'user_revoked' | 'moderator_revoked'
