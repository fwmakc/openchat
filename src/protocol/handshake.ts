/**
 * Формат данных для обмена
 */
export type DataFormat = 'json' | 'msgpack'

/**
 * Запрос handshake для установки формата обмена
 */
export interface HandshakeRequest {
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
export interface HandshakeSuccessResponse {
  type: 'handshake.success'
  data: {
    /** Выбранный формат данных */
    format: DataFormat
    /** Версия протокола сервера */
    version: string
  }
}
