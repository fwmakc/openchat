import type { ChatSettings, ChatInfo, ParticipantRole, ParticipantDetails } from '../types/index.js'

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
    type: 'public' | 'protected'
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

export interface ChatCheckUserRequest {
  type: 'chat.check_user'
  connectionId: string
  data: {
    chatId: string
    email: string
  }
}

export interface ChatCheckUserResponse {
  type: 'chat.check_user.success'
  data: {
    exists: boolean
    role?: ParticipantRole
  }
}

export interface ParticipantsListRequest {
  type: 'participants.list'
  connectionId: string
  data: {
    chatId: string
  }
}

export interface ParticipantsListResponse {
  type: 'participants.list.success'
  data: {
    participants: ParticipantDetails[]
  }
}

export interface ParticipantsSetRoleRequest {
  type: 'participants.set_role'
  connectionId: string
  data: {
    chatId: string
    targetEmail: string
    role: ParticipantRole
  }
}

export interface ChatInviteRequest {
  type: 'chat.invite'
  connectionId: string
  data: {
    chatId: string
    email: string
    role: ParticipantRole
  }
}

export interface ChatInviteSuccessResponse {
  type: 'chat.invite.success'
  data: {
    chatId: string
    email: string
  }
}

export interface ChatInvitedNotification {
  type: 'chat.invited'
  data: {
    chatId: string
    chatName: string
    inviterEmail: string
    role: ParticipantRole
  }
}

export interface ChatLeaveRequest {
  type: 'chat.leave'
  connectionId: string
  data: {
    chatId: string
  }
}

export interface ChatKickRequest {
  type: 'chat.kick'
  connectionId: string
  data: {
    chatId: string
    email: string
  }
}
