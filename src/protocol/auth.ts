/**
 * @fileoverview Протокол аутентификации и управления подключениями
 * @module protocol/auth
 */

import type { BaseRequest, BaseResponse } from './handshake.js'
import type { ChatSettings } from '../types/index.js'

/**
 * Запрос на подключение к чату
 * @interface AuthConnectRequest
 * @extends {BaseRequest}
 */
export interface AuthConnectRequest extends BaseRequest {
  type: 'auth.connect'
  data: {
    /** Email пользователя */
    email: string
    /** ID чата */
    chatId: string
    /** Публичный ключ устройства (base64) */
    publicKey: string
  }
}

/**
 * Успешный ответ на подключение к чату
 * @interface AuthConnectSuccessResponse
 * @extends {BaseResponse}
 */
export interface AuthConnectSuccessResponse extends BaseResponse {
  type: 'auth.connect.success'
  data: {
    /** ID соединения */
    connectionId: string
    /** Зашифрованный ключ чата (base64) */
    encryptedChatKey: string
    /** Настройки чата */
    chatSettings: ChatSettings
  }
}

/**
 * Ответ: требуется верификация email
 * @interface AuthVerifyRequiredResponse
 * @extends {BaseResponse}
 */
export interface AuthVerifyRequiredResponse extends BaseResponse {
  type: 'auth.verify_required'
  data: {
    /** Код или ссылка для верификации */
    challenge: string
  }
}

/**
 * Запрос на подтверждение email кодом
 * @interface AuthVerifyRequest
 * @extends {BaseRequest}
 */
export interface AuthVerifyRequest extends BaseRequest {
  type: 'auth.verify'
  data: {
    /** Email пользователя */
    email: string
    /** ID чата */
    chatId: string
    /** Публичный ключ устройства (base64) */
    publicKey: string
    /** Код подтверждения */
    code: string
  }
}

/**
 * Успешный ответ на подтверждение email
 * @interface AuthVerifySuccessResponse
 * @extends {BaseResponse}
 */
export interface AuthVerifySuccessResponse extends BaseResponse {
  type: 'auth.verify.success'
  data: {
    /** ID соединения */
    connectionId: string
    /** Зашифрованный ключ чата (base64) */
    encryptedChatKey: string
  }
}

/**
 * Запрос на отключение от чата (logout)
 * @interface AuthDisconnectRequest
 * @extends {BaseRequest}
 */
export interface AuthDisconnectRequest extends BaseRequest {
  type: 'auth.disconnect'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Успешный ответ на отключение от чата
 * @interface AuthDisconnectSuccessResponse
 * @extends {BaseResponse}
 */
export interface AuthDisconnectSuccessResponse extends BaseResponse {
  type: 'auth.disconnect.success'
  data: {
    /** ID отключённого соединения */
    connectionId: string
  }
}

/**
 * Запрос на отзыв подключения (устройства)
 * Позволяет отозвать своё подключение или (для модератора) чужое
 * @interface ConnectionRevokeRequest
 * @extends {BaseRequest}
 */
export interface ConnectionRevokeRequest extends BaseRequest {
  type: 'connection.revoke'
  connectionId: string
  data: {
    /** ID подключения для отзыва */
    targetConnectionId: string
    /** ID чата */
    chatId: string
  }
}

/**
 * Успешный ответ на отзыв подключения
 * @interface ConnectionRevokeSuccessResponse
 * @extends {BaseResponse}
 */
export interface ConnectionRevokeSuccessResponse extends BaseResponse {
  type: 'connection.revoke.success'
  data: {
    /** ID отозванного подключения */
    connectionId: string
  }
}

/**
 * Уведомление об отзыве подключения (server push)
 * @interface ConnectionRevokedNotification
 * @extends {BaseResponse}
 */
export interface ConnectionRevokedNotification extends BaseResponse {
  type: 'connection.revoked'
  data: {
    /** ID чата */
    chatId: string
    /** Причина отзыва */
    reason: 'user_revoked' | 'moderator_revoked'
  }
}
