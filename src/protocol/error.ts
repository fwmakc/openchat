/**
 * Код ошибки протокола
 */
export type ErrorCode =
  | 'AUTH_REQUIRED'
  | 'INVALID_EMAIL'
  | 'INVALID_CODE'
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

/**
 * Описание кодов ошибок:
 * - AUTH_REQUIRED — требуется аутентификация
 * - INVALID_EMAIL — неверный формат email
 * - INVALID_CODE — неверный код подтверждения
 * - CHAT_NOT_FOUND — чат не найден
 * - CHAT_FULL — чат заполнен
 * - PERMISSION_DENIED — недостаточно прав
 * - RATE_LIMIT — превышен лимит запросов
 * - INVALID_MESSAGE — неверный формат сообщения
 * - CONTENT_TYPE_NOT_ALLOWED — тип контента не разрешён
 * - CALL_NOT_FOUND — звонок не найден
 * - CALL_BUSY — пользователь занят
 * - CALL_TIMEOUT — нет ответа
 * - UNSUPPORTED_FORMAT — формат не поддерживается (msgpack)
 * - INVITE_DENIED — нет прав на приглашение
 * - USER_ALREADY_IN_CHAT — пользователь уже в чате
 * - NOT_ALLOW_JOIN — присоединение к чату запрещено
 * - USER_HIDDEN — пользователь скрыт
 * - CHAT_HIDDEN — чат скрыт
 * - REGISTRATION_CLOSED — регистрация закрыта
 */

/**
 * Ответ с ошибкой
 */
export interface ErrorResponse {
  type: 'error'
  data: {
    /** Код ошибки */
    code: ErrorCode
    /** Человекочитаемое сообщение */
    message: string
  }
}
