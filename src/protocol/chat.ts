import type { ChatSettings, ChatInfo, UserRole, ChatType, ChatUserDetails } from '../types/index.js'

/**
 * Запрос на подключение к чату
 */
export interface AuthConnectRequest {
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
export interface AuthConnectSuccessResponse {
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
export interface AuthVerifyRequiredResponse {
  type: 'auth.verify_required'
  data: {
    /** Код или ссылка для верификации */
    challenge: string
  }
}

/**
 * Запрос на подтверждение email
 */
export interface AuthVerifyRequest {
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
export interface AuthVerifySuccessResponse {
  type: 'auth.verify.success'
  data: {
    /** ID соединения */
    connectionId: string
    /** Зашифрованный ключ чата (base64) */
    encryptedChatKey: string
  }
}

/**
 * Запрос на создание чата
 */
export interface ChatCreateRequest {
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
export interface ChatCreateSuccessResponse {
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
export interface ChatInfoRequest {
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
export interface ChatInfoResponse {
  type: 'chat.info.success'
  data: ChatInfo
}

/**
 * Запрос на обновление настроек чата
 */
export interface ChatUpdateRequest {
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
export interface ChatUpdateSuccessResponse {
  type: 'chat.update.success'
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Запрос проверки пользователя в чате
 */
export interface ChatUsersCheckRequest {
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
export interface ChatUsersCheckResponse {
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
export interface ChatUsersListRequest {
  type: 'chat.users.list'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Ответ со списком пользователей чата
 */
export interface ChatUsersListResponse {
  type: 'chat.users.list.success'
  data: {
    /** Список пользователей с деталями */
    users: ChatUserDetails[]
  }
}

/**
 * Запрос на изменение роли пользователя (только защищённый чат)
 */
export interface ChatUsersSetRoleRequest {
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

/**
 * Успешный ответ на изменение роли
 */
export interface ChatUsersSetRoleSuccessResponse {
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

/**
 * Запрос на приглашение пользователя в чат
 */
export interface ChatInviteRequest {
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

/**
 * Успешный ответ на приглашение
 */
export interface ChatInviteSuccessResponse {
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
export interface UserInvitedNotification {
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
export interface ChatLeaveRequest {
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
export interface ChatLeaveSuccessResponse {
  type: 'chat.leave.success'
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Запрос на исключение пользователя из чата (owner/moderator only)
 */
export interface ChatRemoveRequest {
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
export interface ChatRemoveSuccessResponse {
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
export interface UserJoinedNotification {
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
export interface UserLeftNotification {
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
export interface UserRemovedNotification {
  type: 'user.removed'
  data: {
    /** ID чата */
    chatId: string
    /** Email пользователя */
    email: string
  }
}
