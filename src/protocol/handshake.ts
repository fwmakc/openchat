export type DataFormat = 'json' | 'msgpack'

export interface HandshakeRequest {
  type: 'handshake'
  data: {
    format: DataFormat
    version: string
  }
}

export interface HandshakeSuccessResponse {
  type: 'handshake.success'
  data: {
    format: DataFormat
    version: string
  }
}
