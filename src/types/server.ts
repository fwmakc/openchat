import type { ContentType } from './message.js'

export type ServerFeature = 'msgpack' | 'webrtc'

export interface ServerLimits {
  maxUsers: number
  maxMessageSize: number
  rateLimit: number
}

export interface ServerSettings {
  registrationOpen: boolean
  trustedServers: string[]
  emailWhitelist: string[]
  emailBlacklist: string[]
  ipWhitelist: string[]
  ipBlacklist: string[]
  emailVerificationRequired: boolean
  chatCreationOpen: boolean
  allowPublicChats: boolean
  allowProtectedChats: boolean
  maxUsersPerChat: number
  maxMessageSize: number
  historyLimit: number
  allowedContentTypes: ContentType[]
}

export interface ServerInfo {
  url: string
  name: string
  description?: string
  icon?: string
  version: string
  features: ServerFeature[]
  limits: ServerLimits
}
