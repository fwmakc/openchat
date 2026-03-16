import { describe, it, expect } from 'vitest'
import { version } from './index.js'

describe('index exports', (): void => {
  it('exports version', (): void => {
    expect(version).toBe('0.0.1')
  })
})
