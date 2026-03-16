import type { UserStatus, UserProfile } from './user.js'
import type { ContentType } from './message.js'

export type ChatType = 'public' | 'protected'
export type UserRole = 'owner' | 'moderator' | 'member' | 'observer'

export interface ChatSettings {
  maxUsers: number
  messageSize: number
  historyLimit: number
  allowedContentTypes: ContentType[]
}

export interface Chat {
  chatId: string
  name: string
  description?: string
  icon?: string
  type: ChatType
  visible: boolean
  join: boolean
  settings: ChatSettings
  userCount: number
}

export interface ChatInfo extends Omit<Chat, 'userCount'> {
  users: ChatUserInfo[]
}

export interface ChatUserInfo extends Pick<UserProfile, 'email' | 'nickname'> {
  connections: number
  role: UserRole
}

export interface ChatUserDetails extends ChatUserInfo {
  firstName?: string
  lastName?: string
  avatar?: string
  status: UserStatus
  connectionIds: ConnectionInfo[]
}

export interface ConnectionInfo {
  connectionId: string
  connectedAt: number
}
