/**
 * @fileoverview Коды ошибок и формат ошибок протокола
 * @module protocol/error
 */

import type { BaseResponse } from './handshake.js'

/**
 * Код ошибки протокола
 * @typedef {typeof ErrorCode} ErrorCode
 */
export type ErrorCode =
  | 'AUTH_REQUIRED'
  | 'INVALID_EMAIL'
  | 'INVALID_CODE'
  | 'CODE_EXPIRED'
  | 'CHAT_NOT_FOUND'
  | 'CHAT_FULL'
  | 'PERMISSION_DENIED'
  | 'RATE_LIMIT'
  | 'INVALID_MESSAGE'
  | 'CONTENT_TYPE_NOT_ALLOWED'
  | 'CALL_NOT_FOUND'
  | 'CALL_BUSY'
  | 'CALL_TIMEOUT'
  | 'UNSUPPORTED_FORMAT'
  | 'INVITE_DENIED'
  | 'USER_ALREADY_IN_CHAT'
  | 'NOT_ALLOW_JOIN'
  | 'USER_HIDDEN'
  | 'CHAT_HIDDEN'
  | 'REGISTRATION_CLOSED'
  | 'MESSAGE_NOT_FOUND'
  | 'CONNECTION_NOT_FOUND'
  | 'TIMESTAMP_OUT_OF_RANGE'
  | 'NONCE_REUSED'

/**
 * Описание кодов ошибок:
 *
 * Аутентификация:
 * - `AUTH_REQUIRED` — требуется аутентификация
 * - `INVALID_EMAIL` — неверный формат email
 * - `INVALID_CODE` — неверный код подтверждения
 * - `CODE_EXPIRED` — код подтверждения истёк
 *
 * Чаты:
 * - `CHAT_NOT_FOUND` — чат не найден
 * - `CHAT_FULL` — чат заполнен
 * - `CHAT_HIDDEN` — чат скрыт
 * - `NOT_ALLOW_JOIN` — присоединение к чату запрещено
 * - `REGISTRATION_CLOSED` — регистрация закрыта
 *
 * Права:
 * - `PERMISSION_DENIED` — недостаточно прав
 * - `INVITE_DENIED` — нет прав на приглашение
 *
 * Сообщения:
 * - `INVALID_MESSAGE` — неверный формат сообщения
 * - `CONTENT_TYPE_NOT_ALLOWED` — тип контента не разрешён
 * - `MESSAGE_NOT_FOUND` — сообщение не найдено
 *
 * Звонки:
 * - `CALL_NOT_FOUND` — звонок не найден
 * - `CALL_BUSY` — пользователь занят
 * - `CALL_TIMEOUT` — нет ответа
 *
 * Пользователи:
 * - `USER_ALREADY_IN_CHAT` — пользователь уже в чате
 * - `USER_HIDDEN` — пользователь скрыт
 *
 * Подключения:
 * - `CONNECTION_NOT_FOUND` — подключение не найдено
 *
 * Безопасность (server-to-server):
 * - `TIMESTAMP_OUT_OF_RANGE` — timestamp вне допустимого диапазона (±5 мин)
 * - `NONCE_REUSED` — nonce уже использовался
 *
 * Прочее:
 * - `RATE_LIMIT` — превышен лимит запросов
 * - `UNSUPPORTED_FORMAT` — формат не поддерживается (например, MessagePack)
 */

/**
 * Ответ с ошибкой
 * @interface ErrorResponse
 * @extends {BaseResponse}
 */
export interface ErrorResponse extends BaseResponse {
  type: 'error'
  data: {
    /** Код ошибки */
    code: ErrorCode
    /** Человекочитаемое сообщение */
    message: string
  }
}
