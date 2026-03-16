export interface ServerLimits {
  maxParticipants: number
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
  maxParticipantsPerChat: number
  maxMessageSize: number
  historyLimit: number
  allowedContentTypes: string[]
}

export interface ServerInfo {
  url: string
  name: string
  description?: string
  icon?: string
  version: string
  features: string[]
  limits: ServerLimits
}
