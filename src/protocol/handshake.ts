/**
 * @fileoverview Протокол handshake и базовые типы запросов/ответов
 * @module protocol/handshake
 */

/**
 * Формат данных для обмена
 * - json: JSON (по умолчанию)
 * - msgpack: MessagePack (опционально, для экономии трафика)
 * @typedef {'json' | 'msgpack'} DataFormat
 */
export type DataFormat = 'json' | 'msgpack'

/**
 * Базовый интерфейс для всех запросов
 * @interface BaseRequest
 */
export interface BaseRequest {
  /** ID запроса для корреляции запрос-ответ (опционально) */
  requestId?: string
}

/**
 * Базовый интерфейс для всех ответов
 * @interface BaseResponse
 */
export interface BaseResponse {
  /** ID запроса для корреляции (если был в запросе) */
  requestId?: string
}

/**
 * Запрос handshake для установки формата обмена
 * @interface HandshakeRequest
 * @extends {BaseRequest}
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
 * @interface HandshakeSuccessResponse
 * @extends {BaseResponse}
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
 * Запрос ping для проверки соединения
 * @interface PingRequest
 * @extends {BaseRequest}
 */
export interface PingRequest extends BaseRequest {
  type: 'ping'
}

/**
 * Ответ pong на ping запрос
 * @interface PongResponse
 * @extends {BaseResponse}
 */
export interface PongResponse extends BaseResponse {
  type: 'pong'
  data: {
    /** Unix timestamp сервера */
    timestamp: number
  }
}
