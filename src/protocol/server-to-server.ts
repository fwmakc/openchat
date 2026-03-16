/**
 * Запрос проверки пользователя на другом сервере
 */
export interface ServerUserCheckRequest {
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
export interface ServerUserCheckResponse {
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
export interface ServerChallengeRequest {
  type: 'server.challenge'
  data: {
    /** Email пользователя */
    email: string
    /** Случайная строка для подписи */
    challenge: string
  }
}

/**
 * Ответ с подписанным challenge (от клиента)
 */
export interface ServerChallengeResponse {
  type: 'server.challenge.response'
  data: {
    /** Email пользователя */
    email: string
    /** Исходный challenge */
    challenge: string
    /** Подпись (base64) */
    signature: string
  }
}
