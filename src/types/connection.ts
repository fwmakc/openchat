export interface Connection {
  connectionId: string
  email: string
  chatId: string
  publicKey: string
  connectedAt: number
  lastActivityAt: number
}

export type ConnectionRevokeReason = 'user_revoked' | 'moderator_revoked'
