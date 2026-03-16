import type { BaseRequest, BaseResponse } from './handshake.js'
import type {
  ServerInfo,
  Chat,
  UserProfile,
  UserProfileUpdateData,
  UserStatus,
} from '../types/index.js'

/**
 * Запрос информации о сервере
 */
export interface ServerInfoRequest extends BaseRequest {
  type: 'server.info'
}

/**
 * Ответ с информацией о сервере
 */
export interface ServerInfoResponse extends BaseResponse {
  type: 'server.info.success'
  data: ServerInfo
}

/**
 * Запрос списка чатов на сервере
 */
export interface ServerChatsRequest extends BaseRequest {
  type: 'server.chats'
}

/**
 * Ответ со списком чатов
 */
export interface ServerChatsResponse extends BaseResponse {
  type: 'server.chats.success'
  data: {
    /** Список чатов */
    chats: Chat[]
  }
}

/**
 * Запрос проверки существования пользователя
 */
export interface UserCheckRequest extends BaseRequest {
  type: 'user.check'
  data: {
    /** Email пользователя */
    email: string
  }
}

/**
 * Ответ на проверку пользователя
 */
export interface UserCheckResponse extends BaseResponse {
  type: 'user.check.success'
  data: {
    /** Существует ли пользователь */
    exists: boolean
    /** Профиль (если существует и доступен) */
    profile?: UserProfile
    /** ID чатов, в которых состоит пользователь */
    chats?: string[]
  }
}

/**
 * Запрос профиля пользователя
 */
export interface UserProfileRequest extends BaseRequest {
  type: 'user.profile'
  data: {
    /** Email пользователя */
    email: string
  }
}

/**
 * Ответ с профилем пользователя
 */
export interface UserProfileResponse extends BaseResponse {
  type: 'user.profile.success'
  data: UserProfile
}

/**
 * Запрос на обновление своего профиля
 */
export interface UserProfileUpdateRequest extends BaseRequest {
  type: 'user.profile.update'
  connectionId: string
  data: UserProfileUpdateData
}

/**
 * Успешный ответ на обновление профиля
 */
export interface UserProfileUpdateSuccessResponse extends BaseResponse {
  type: 'user.profile.update.success'
  data: UserProfile
}

/**
 * Запрос списка чатов пользователя
 */
export interface UserChatsRequest extends BaseRequest {
  type: 'user.chats'
  data: {
    /** Email пользователя */
    email: string
  }
}

/**
 * Ответ со списком чатов пользователя
 */
export interface UserChatsResponse extends BaseResponse {
  type: 'user.chats.success'
  data: {
    /** Чаты с количеством непрочитанных */
    chats: (Chat & { unreadCount: number })[]
  }
}

/**
 * Уведомление об изменении статуса пользователя (server push)
 */
export interface UserStatusChangedNotification extends BaseResponse {
  type: 'user.status.changed'
  data: {
    /** Email пользователя */
    email: string
    /** Новый статус */
    status: UserStatus
    /** ID чатов, в которых состоит пользователь */
    chatIds: string[]
  }
}
