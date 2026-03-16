/**
 * @fileoverview Протокол аутентификации и управления чатами
 * @module protocol/chat
 */

import type { BaseRequest, BaseResponse } from './handshake.js'
import type { ChatSettings, ChatInfo, UserRole, ChatType, ChatUserDetails } from '../types/index.js'

/**
 * Запрос на подключение к чату
 * @interface AuthConnectRequest
 * @extends {BaseRequest}
 */
export interface AuthConnectRequest extends BaseRequest {
  type: 'auth.connect'
  data: {
    /** Email пользователя */
    email: string
    /** ID чата */
    chatId: string
    /** Публичный ключ устройства (base64) */
    publicKey: string
  }
}

/**
 * Успешный ответ на подключение к чату
 * @interface AuthConnectSuccessResponse
 * @extends {BaseResponse}
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
 * @interface AuthVerifyRequiredResponse
 * @extends {BaseResponse}
 */
export interface AuthVerifyRequiredResponse extends BaseResponse {
  type: 'auth.verify_required'
  data: {
    /** Код или ссылка для верификации */
    challenge: string
  }
}

/**
 * Запрос на подтверждение email кодом
 * @interface AuthVerifyRequest
 * @extends {BaseRequest}
 */
export interface AuthVerifyRequest extends BaseRequest {
  type: 'auth.verify'
  data: {
    /** Email пользователя */
    email: string
    /** ID чата */
    chatId: string
    /** Публичный ключ устройства (base64) */
    publicKey: string
    /** Код подтверждения */
    code: string
  }
}

/**
 * Успешный ответ на подтверждение email
 * @interface AuthVerifySuccessResponse
 * @extends {BaseResponse}
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

/**
 * Запрос на отключение от чата (logout)
 * @interface AuthDisconnectRequest
 * @extends {BaseRequest}
 */
export interface AuthDisconnectRequest extends BaseRequest {
  type: 'auth.disconnect'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Успешный ответ на отключение от чата
 * @interface AuthDisconnectSuccessResponse
 * @extends {BaseResponse}
 */
export interface AuthDisconnectSuccessResponse extends BaseResponse {
  type: 'auth.disconnect.success'
  data: {
    /** ID отключённого соединения */
    connectionId: string
  }
}

/**
 * Запрос на отзыв подключения (устройства)
 * Позволяет отозвать своё подключение или (для модератора) чужое
 * @interface ConnectionRevokeRequest
 * @extends {BaseRequest}
 */
export interface ConnectionRevokeRequest extends BaseRequest {
  type: 'connection.revoke'
  connectionId: string
  data: {
    /** ID подключения для отзыва */
    targetConnectionId: string
    /** ID чата */
    chatId: string
  }
}

/**
 * Успешный ответ на отзыв подключения
 * @interface ConnectionRevokeSuccessResponse
 * @extends {BaseResponse}
 */
export interface ConnectionRevokeSuccessResponse extends BaseResponse {
  type: 'connection.revoke.success'
  data: {
    /** ID отозванного подключения */
    connectionId: string
  }
}

/**
 * Уведомление об отзыве подключения (server push)
 * @interface ConnectionRevokedNotification
 * @extends {BaseResponse}
 */
export interface ConnectionRevokedNotification extends BaseResponse {
  type: 'connection.revoked'
  data: {
    /** ID чата */
    chatId: string
    /** Причина отзыва */
    reason: 'user_revoked' | 'moderator_revoked'
  }
}

/**
 * Запрос на создание чата
 * @interface ChatCreateRequest
 * @extends {BaseRequest}
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
    /** Виден ли в списке чатов */
    visible: boolean
    /** Разрешено ли свободное присоединение */
    allowJoin: boolean
    /** Настройки (частично, недостающие заполняются сервером) */
    settings?: Partial<ChatSettings>
  }
}

/**
 * Успешный ответ на создание чата
 * @interface ChatCreateSuccessResponse
 * @extends {BaseResponse}
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
 * @interface ChatInfoRequest
 * @extends {BaseRequest}
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
 * @interface ChatInfoResponse
 * @extends {BaseResponse}
 */
export interface ChatInfoResponse extends BaseResponse {
  type: 'chat.info.success'
  data: ChatInfo
}

/**
 * Запрос на обновление настроек чата
 * @interface ChatUpdateRequest
 * @extends {BaseRequest}
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
 * @interface ChatUpdateSuccessResponse
 * @extends {BaseResponse}
 */
export interface ChatUpdateSuccessResponse extends BaseResponse {
  type: 'chat.update.success'
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Запрос на удаление чата
 * Только owner. В публичном чате — любой участник.
 * @interface ChatDeleteRequest
 * @extends {BaseRequest}
 */
export interface ChatDeleteRequest extends BaseRequest {
  type: 'chat.delete'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Успешный ответ на удаление чата
 * @interface ChatDeleteSuccessResponse
 * @extends {BaseResponse}
 */
export interface ChatDeleteSuccessResponse extends BaseResponse {
  type: 'chat.delete.success'
  data: {
    /** ID удалённого чата */
    chatId: string
  }
}

/**
 * Уведомление об удалении чата (server push)
 * @interface ChatDeletedNotification
 * @extends {BaseResponse}
 */
export interface ChatDeletedNotification extends BaseResponse {
  type: 'chat.deleted'
  data: {
    /** ID чата */
    chatId: string
    /** Email удалившего */
    deletedBy: string
  }
}

/**
 * Запрос проверки пользователя в чате
 * @interface ChatUsersCheckRequest
 * @extends {BaseRequest}
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
 * @interface ChatUsersCheckResponse
 * @extends {BaseResponse}
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
 * @interface ChatUsersListRequest
 * @extends {BaseRequest}
 */
export interface ChatUsersListRequest extends BaseRequest {
  type: 'chat.users.list'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Ответ со списком пользователей чата
 * @interface ChatUsersListResponse
 * @extends {BaseResponse}
 */
export interface ChatUsersListResponse extends BaseResponse {
  type: 'chat.users.list.success'
  data: {
    /** Список пользователей с деталями */
    users: ChatUserDetails[]
  }
}

/**
 * Запрос на изменение роли пользователя (только защищённый чат)
 * @interface ChatUsersSetRoleRequest
 * @extends {BaseRequest}
 */
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

/**
 * Успешный ответ на изменение роли
 * @interface ChatUsersSetRoleSuccessResponse
 * @extends {BaseResponse}
 */
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

/**
 * Запрос на приглашение пользователя в чат
 * @interface ChatInviteRequest
 * @extends {BaseRequest}
 */
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

/**
 * Успешный ответ на приглашение
 * @interface ChatInviteSuccessResponse
 * @extends {BaseResponse}
 */
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
 * @interface UserInvitedNotification
 * @extends {BaseResponse}
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
 * @interface ChatLeaveRequest
 * @extends {BaseRequest}
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
 * @interface ChatLeaveSuccessResponse
 * @extends {BaseResponse}
 */
export interface ChatLeaveSuccessResponse extends BaseResponse {
  type: 'chat.leave.success'
  data: {
    /** ID чата */
    chatId: string
  }
}

/**
 * Запрос на исключение пользователя из чата
 * Только owner/moderator
 * @interface ChatRemoveRequest
 * @extends {BaseRequest}
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
 * @interface ChatRemoveSuccessResponse
 * @extends {BaseResponse}
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
 * @interface UserJoinedNotification
 * @extends {BaseResponse}
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
 * @interface UserLeftNotification
 * @extends {BaseResponse}
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
 * @interface UserRemovedNotification
 * @extends {BaseResponse}
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
