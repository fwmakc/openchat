/**
 * @fileoverview Протокол сервер-сервер взаимодействия
 * Запросы между серверами требуют подписи (HMAC-SHA256).
 * Заголовки: X-Server-Signature, X-Server-Timestamp, X-Server-Nonce
 * @module protocol/server-to-server
 */

import type { BaseRequest, BaseResponse } from './handshake.js'

/**
 * Запрос проверки пользователя на другом сервере
 * Сервер Б запрашивает у сервера А информацию о пользователе.
 * @interface ServerUserCheckRequest
 * @extends {BaseRequest}
 */
export interface ServerUserCheckRequest extends BaseRequest {
  type: 'server.user_check'
  data: {
    /** Email пользователя */
    email: string
    /** URL запрашивающего сервера */
    requestingServer: string
  }
}

/**
 * Ответ на проверку пользователя на другом сервере
 * @interface ServerUserCheckResponse
 * @extends {BaseResponse}
 */
export interface ServerUserCheckResponse extends BaseResponse {
  type: 'server.user_check.success'
  data: {
    /** Существует ли пользователь на сервере */
    exists: boolean
    /** Публичные ключи пользователя (base64) для верификации */
    publicKeys: string[]
  }
}

/**
 * Запрос challenge для верификации пользователя
 * Защита от replay-атак через timestamp и nonce.
 * Timestamp должен быть в пределах ±5 минут.
 * Nonce должен быть уникальным (сервер хранит 10 минут).
 * @interface ServerChallengeRequest
 * @extends {BaseRequest}
 */
export interface ServerChallengeRequest extends BaseRequest {
  type: 'server.challenge'
  data: {
    /** Email пользователя */
    email: string
    /** Случайная строка для подписи клиентом */
    challenge: string
    /** Unix timestamp запроса */
    timestamp: number
    /** Уникальный nonce (UUID v4) */
    nonce: string
  }
}

/**
 * Ответ с подписанным challenge (от клиента через сервер)
 * Сервер проверяет: timestamp в пределах ±5 минут, nonce не использовался ранее.
 * @interface ServerChallengeResponse
 * @extends {BaseResponse}
 */
export interface ServerChallengeResponse extends BaseResponse {
  type: 'server.challenge.response'
  data: {
    /** Email пользователя */
    email: string
    /** Исходный challenge */
    challenge: string
    /** Подпись приватным ключом клиента (base64) */
    signature: string
    /** Unix timestamp ответа */
    timestamp: number
    /** Исходный nonce */
    nonce: string
  }
}
