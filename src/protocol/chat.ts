import type { ChatSettings, ChatInfo, UserRole, ChatType, ChatUserDetails } from '../types/index.js'

export interface AuthConnectRequest {
  type: 'auth.connect'
  data: {
    email: string
    chatId: string
    publicKey: string
  }
}

export interface AuthConnectSuccessResponse {
  type: 'auth.connect.success'
  data: {
    connectionId: string
    encryptedChatKey: string
    chatSettings: ChatSettings
  }
}

export interface AuthVerifyRequiredResponse {
  type: 'auth.verify_required'
  data: {
    challenge: string
  }
}

export interface AuthVerifyRequest {
  type: 'auth.verify'
  data: {
    email: string
    chatId: string
    publicKey: string
    code: string
  }
}

export interface AuthVerifySuccessResponse {
  type: 'auth.verify.success'
  data: {
    connectionId: string
    encryptedChatKey: string
  }
}

export interface ChatCreateRequest {
  type: 'chat.create'
  connectionId: string
  data: {
    name: string
    description?: string
    icon?: string
    type: ChatType
    visible: boolean
    join: boolean
    settings?: Partial<ChatSettings>
  }
}

export interface ChatCreateSuccessResponse {
  type: 'chat.create.success'
  data: {
    chatId: string
    encryptedChatKey: string
  }
}

export interface ChatInfoRequest {
  type: 'chat.info'
  connectionId: string
  data: {
    chatId: string
  }
}

export interface ChatInfoResponse {
  type: 'chat.info.success'
  data: ChatInfo
}

export interface ChatUpdateRequest {
  type: 'chat.update'
  connectionId: string
  data: {
    chatId: string
    name?: string
    description?: string
    icon?: string
    visible?: boolean
    join?: boolean
    settings?: Partial<ChatSettings>
  }
}

export interface ChatUpdateSuccessResponse {
  type: 'chat.update.success'
  data: {
    chatId: string
  }
}

export interface ChatUsersCheckRequest {
  type: 'chat.users.check'
  connectionId: string
  data: {
    chatId: string
    email: string
  }
}

export interface ChatUsersCheckResponse {
  type: 'chat.users.check.success'
  data: {
    exists: boolean
    role?: UserRole
  }
}

export interface ChatUsersListRequest {
  type: 'chat.users.list'
  connectionId: string
  data: {
    chatId: string
  }
}

export interface ChatUsersListResponse {
  type: 'chat.users.list.success'
  data: {
    users: ChatUserDetails[]
  }
}

export interface ChatUsersSetRoleRequest {
  type: 'chat.users.set_role'
  connectionId: string
  data: {
    chatId: string
    email: string
    role: UserRole
  }
}

export interface ChatUsersSetRoleSuccessResponse {
  type: 'chat.users.set_role.success'
  data: {
    chatId: string
    email: string
    role: UserRole
  }
}

export interface ChatInviteRequest {
  type: 'chat.invite'
  connectionId: string
  data: {
    chatId: string
    email: string
    role: UserRole
  }
}

export interface ChatInviteSuccessResponse {
  type: 'chat.invite.success'
  data: {
    chatId: string
    email: string
  }
}

export interface UserInvitedNotification {
  type: 'user.invited'
  data: {
    chatId: string
    chatName: string
    inviterEmail: string
    role: UserRole
  }
}

export interface ChatLeaveRequest {
  type: 'chat.leave'
  connectionId: string
  data: {
    chatId: string
  }
}

export interface ChatLeaveSuccessResponse {
  type: 'chat.leave.success'
  data: {
    chatId: string
  }
}

export interface ChatRemoveRequest {
  type: 'chat.remove'
  connectionId: string
  data: {
    chatId: string
    email: string
  }
}

export interface ChatRemoveSuccessResponse {
  type: 'chat.remove.success'
  data: {
    chatId: string
    email: string
  }
}

export interface UserJoinedNotification {
  type: 'user.joined'
  data: {
    chatId: string
    email: string
    role: UserRole
  }
}

export interface UserLeftNotification {
  type: 'user.left'
  data: {
    chatId: string
    email: string
  }
}

export interface UserRemovedNotification {
  type: 'user.removed'
  data: {
    chatId: string
    email: string
  }
}
