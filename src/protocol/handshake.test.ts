import { describe, it, expect } from 'vitest'
import type { HandshakeRequest, HandshakeSuccessResponse, DataFormat } from './handshake.js'

describe('DataFormat type', (): void => {
  it('allows valid formats', (): void => {
    const formats: DataFormat[] = ['json', 'msgpack']
    expect(formats).toHaveLength(2)
  })
})

describe('HandshakeRequest interface', (): void => {
  it('creates valid json handshake request', (): void => {
    const request: HandshakeRequest = {
      type: 'handshake',
      data: {
        format: 'json',
        version: '1.0.0',
      },
    }

    expect(request.type).toBe('handshake')
    expect(request.data.format).toBe('json')
    expect(request.data.version).toBe('1.0.0')
  })

  it('creates valid msgpack handshake request', (): void => {
    const request: HandshakeRequest = {
      type: 'handshake',
      data: {
        format: 'msgpack',
        version: '1.0.0',
      },
    }

    expect(request.data.format).toBe('msgpack')
  })
})

describe('HandshakeSuccessResponse interface', (): void => {
  it('creates valid response', (): void => {
    const response: HandshakeSuccessResponse = {
      type: 'handshake.success',
      data: {
        format: 'json',
        version: '1.0.0',
      },
    }

    expect(response.type).toBe('handshake.success')
    expect(response.data.format).toBe('json')
  })
})
