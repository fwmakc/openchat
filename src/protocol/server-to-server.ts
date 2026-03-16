import type { BaseRequest, BaseResponse } from './handshake.js'

/**
 * Запрос проверки пользователя на другом сервере
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
 * Ответ на проверку пользователя
 */
export interface ServerUserCheckResponse extends BaseResponse {
  type: 'server.user_check.success'
  data: {
    /** Существует ли пользователь */
    exists: boolean
    /** Публичные ключи пользователя (base64) */
    publicKeys: string[]
  }
}

/**
 * Запрос challenge для верификации пользователя
 */
export interface ServerChallengeRequest extends BaseRequest {
  type: 'server.challenge'
  data: {
    /** Email пользователя */
    email: string
    /** Случайная строка для подписи */
    challenge: string
    timestamp: number
    nonce: string
  }
}

/**
 * Ответ с подписанным challenge (от клиента)
 */
export interface ServerChallengeResponse extends BaseResponse {
  type: 'server.challenge.response'
  data: {
    /** Email пользователя */
    email: string
    /** Исходный challenge */
    challenge: string
    /** Подпись (base64) */
    signature: string
    timestamp: number
    nonce: string
  }
}
