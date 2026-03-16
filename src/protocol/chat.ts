import type { BaseRequest, BaseResponse } from './handshake.js'
import type { ChatSettings, ChatInfo, UserRole, ChatType, ChatUserDetails } from '../types/index.js'

/**
 * Запрос на подключение к чату
 */
export interface AuthConnectRequest extends BaseRequest {
  type: 'auth.connect'
  data: {
    /** Email пользователя */
    email: string
    /** ID чата */
    chatId: string
    /** Публичный ключ (base64) */
    publicKey: string
  }
}

/**
 * Успешный ответ на подключение к чату
 */
export interface AuthConnectSuccessResponse extends BaseResponse {
  type: 'auth.connect.success'
  data: {
    /** ID соединения */
    connectionId: string
    /** Зашифрованный ключ чата (base64) */
    encryptedChatKey: string
    /** Настройки чата */
    chatSettings: ChatSettings
  }
}

/**
 * Ответ: требуется верификация email
 */
export interface AuthVerifyRequiredResponse extends BaseResponse {
  type: 'auth.verify_required'
  data: {
    /** Код или ссылка для верификации */
    challenge: string
  }
}

/**
 * Запрос на подтверждение email
 */
export interface AuthVerifyRequest extends BaseRequest {
  type: 'auth.verify'
  data: {
    /** Email пользователя */
    email: string
    /** ID чата */
    chatId: string
    /** Публичный ключ (base64) */
    publicKey: string
    /** Код подтверждения */
    code: string
  }
}

/**
 * Успешный ответ на подтверждение email
 */
export interface AuthVerifySuccessResponse extends BaseResponse {
  type: 'auth.verify.success'
  data: {
    /** ID соединения */
    connectionId: string
    /** Зашифрованный ключ чата (base64) */
    encryptedChatKey: string
  }
}

export interface AuthDisconnectRequest extends BaseRequest {
  type: 'auth.disconnect'
  connectionId: string
  data: {
    chatId: string
  }
}

export interface AuthDisconnectSuccessResponse extends BaseResponse {
  type: 'auth.disconnect.success'
  data: {
    connectionId: string
  }
}

export interface ConnectionRevokeRequest extends BaseRequest {
  type: 'connection.revoke'
  connectionId: string
  data: {
    targetConnectionId: string
    chatId: string
  }
}

export interface ConnectionRevokeSuccessResponse extends BaseResponse {
  type: 'connection.revoke.success'
  data: {
    connectionId: string
  }
}

export interface ConnectionRevokedNotification extends BaseResponse {
  type: 'connection.revoked'
  data: {
    chatId: string
    reason: 'user_revoked' | 'moderator_revoked'
  }
}

/**
 * Запрос на создание чата
 */
export interface ChatCreateRequest extends BaseRequest {
  type: 'chat.create'
  connectionId: string
  data: {
    /** Название */
    name: string
    /** Описание */
    description?: string
    /** Иконка (base64) */
    icon?: string
    /** Тип чата */
    type: ChatType
    /** Виден ли в списке */
    visible: boolean
    /** Разрешено ли свободное присоединение */
    allowJoin: boolean
    /** Настройки (частично) */
    settings?: Partial<ChatSettings>
  }
}

/**
 * Успешный ответ на создание чата
 */
export interface ChatCreateSuccessResponse extends BaseResponse {
  type: 'chat.create.success'
  data: {
    /** ID созданного чата */
    chatId: string
    /** Зашифрованный ключ чата (base64) */
    encryptedChatKey: string
  }
}

/**
 * Запрос информации о чате
 */
export interface ChatInfoRequest extends BaseRequest {
  type: 'chat.info'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Ответ с информацией о чате
 */
export interface ChatInfoResponse extends BaseResponse {
  type: 'chat.info.success'
  data: ChatInfo
}

/**
 * Запрос на обновление настроек чата
 */
export interface ChatUpdateRequest extends BaseRequest {
  type: 'chat.update'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** Новое название */
    name?: string
    /** Новое описание */
    description?: string
    /** Новая иконка (base64) */
    icon?: string
    /** Видимость в списке */
    visible?: boolean
    /** Разрешить свободное присоединение */
    allowJoin?: boolean
    /** Новые настройки (частично) */
    settings?: Partial<ChatSettings>
  }
}

/**
 * Успешный ответ на обновление чата
 */
export interface ChatUpdateSuccessResponse extends BaseResponse {
  type: 'chat.update.success'
  data: {
    /** ID чата */
    chatId: string
  }
}

export interface ChatDeleteRequest extends BaseRequest {
  type: 'chat.delete'
  connectionId: string
  data: {
    chatId: string
  }
}

export interface ChatDeleteSuccessResponse extends BaseResponse {
  type: 'chat.delete.success'
  data: {
    chatId: string
  }
}

export interface ChatDeletedNotification extends BaseResponse {
  type: 'chat.deleted'
  data: {
    chatId: string
    deletedBy: string
  }
}

/**
 * Запрос проверки пользователя в чате
 */
export interface ChatUsersCheckRequest extends BaseRequest {
  type: 'chat.users.check'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** Email пользователя */
    email: string
  }
}

/**
 * Ответ на проверку пользователя в чате
 */
export interface ChatUsersCheckResponse extends BaseResponse {
  type: 'chat.users.check.success'
  data: {
    /** Существует ли пользователь в чате */
    exists: boolean
    /** Роль (если существует) */
    role?: UserRole
  }
}

/**
 * Запрос списка пользователей чата
 */
export interface ChatUsersListRequest extends BaseRequest {
  type: 'chat.users.list'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
  }
}

export interface ChatUsersListResponse extends BaseResponse {
  type: 'chat.users.list.success'
  data: {
    /** Список пользователей с деталями */
    users: ChatUserDetails[]
  }
}

export interface ChatUsersSetRoleRequest extends BaseRequest {
  type: 'chat.users.set_role'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** Email пользователя */
    email: string
    /** Новая роль */
    role: UserRole
  }
}

export interface ChatUsersSetRoleSuccessResponse extends BaseResponse {
  type: 'chat.users.set_role.success'
  data: {
    /** ID чата */
    chatId: string
    /** Email пользователя */
    email: string
    /** Новая роль */
    role: UserRole
  }
}

export interface ChatInviteRequest extends BaseRequest {
  type: 'chat.invite'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** Email приглашаемого */
    email: string
    /** Роль в чате */
    role: UserRole
  }
}

export interface ChatInviteSuccessResponse extends BaseResponse {
  type: 'chat.invite.success'
  data: {
    /** ID чата */
    chatId: string
    /** Email приглашённого */
    email: string
  }
}

/**
 * Уведомление о приглашении в чат (server push)
 */
export interface UserInvitedNotification extends BaseResponse {
  type: 'user.invited'
  data: {
    /** ID чата */
    chatId: string
    /** Название чата */
    chatName: string
    /** Email пригласившего */
    inviterEmail: string
    /** Роль в чате */
    role: UserRole
  }
}

/**
 * Запрос на выход из чата
 */
export interface ChatLeaveRequest extends BaseRequest {
  type: 'chat.leave'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Успешный ответ на выход из чата
 */
export interface ChatLeaveSuccessResponse extends BaseResponse {
  type: 'chat.leave.success'
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Запрос на исключение пользователя из чата (owner/moderator only)
 */
export interface ChatRemoveRequest extends BaseRequest {
  type: 'chat.remove'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** Email исключаемого */
    email: string
  }
}

/**
 * Успешный ответ на исключение
 */
export interface ChatRemoveSuccessResponse extends BaseResponse {
  type: 'chat.remove.success'
  data: {
    /** ID чата */
    chatId: string
    /** Email исключённого */
    email: string
  }
}

/**
 * Уведомление о вступлении пользователя в чат (server push)
 */
export interface UserJoinedNotification extends BaseResponse {
  type: 'user.joined'
  data: {
    /** ID чата */
    chatId: string
    /** Email пользователя */
    email: string
    /** Роль в чате */
    role: UserRole
  }
}

/**
 * Уведомление о выходе пользователя из чата (server push)
 */
export interface UserLeftNotification extends BaseResponse {
  type: 'user.left'
  data: {
    /** ID чата */
    chatId: string
    /** Email пользователя */
    email: string
  }
}

/**
 * Уведомление об исключении пользователя из чата (server push)
 */
export interface UserRemovedNotification extends BaseResponse {
  type: 'user.removed'
  data: {
    /** ID чата */
    chatId: string
    /** Email пользователя */
    email: string
  }
}
