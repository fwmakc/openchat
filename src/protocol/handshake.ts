/**
 * Формат данных для обмена
 */
export type DataFormat = 'json' | 'msgpack'

/**
 * Базовый интерфейс для всех запросов
 */
export interface BaseRequest {
  /** ID запроса для корреляции (опционально) */
  requestId?: string
}

/**
 * Базовый интерфейс для всех ответов
 */
export interface BaseResponse {
  /** ID запроса для корреляции (если был в запросе) */
  requestId?: string
}

/**
 * Запрос handshake для установки формата обмена
 */
export interface HandshakeRequest extends BaseRequest {
  type: 'handshake'
  data: {
    /** Желаемый формат данных */
    format: DataFormat
    /** Версия протокола клиента */
    version: string
  }
}

/**
 * Успешный ответ на handshake
 */
export interface HandshakeSuccessResponse extends BaseResponse {
  type: 'handshake.success'
  data: {
    /** Выбранный формат данных */
    format: DataFormat
    /** Версия протокола сервера */
    version: string
    /** Интервал отправки ping (мс) */
    pingInterval: number
    /** Таймаут ожидания pong (мс) */
    pongTimeout: number
  }
}

/**
 * Запрос ping
 */
export interface PingRequest extends BaseRequest {
  type: 'ping'
}

/**
 * Ответ pong
 */
export interface PongResponse extends BaseResponse {
  type: 'pong'
  data: {
    /** Unix timestamp сервера */
    timestamp: number
  }
}
