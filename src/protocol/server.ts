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
export interface ServerInfoRequest {
  type: 'server.info'
}

/**
 * Ответ с информацией о сервере
 */
export interface ServerInfoResponse {
  type: 'server.info.success'
  data: ServerInfo
}

/**
 * Запрос списка чатов на сервере
 */
export interface ServerChatsRequest {
  type: 'server.chats'
}

/**
 * Ответ со списком чатов
 */
export interface ServerChatsResponse {
  type: 'server.chats.success'
  data: {
    /** Список чатов */
    chats: Chat[]
  }
}

/**
 * Запрос проверки существования пользователя
 */
export interface UserCheckRequest {
  type: 'user.check'
  data: {
    /** Email пользователя */
    email: string
  }
}

/**
 * Ответ на проверку пользователя
 */
export interface UserCheckResponse {
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
export interface UserProfileRequest {
  type: 'user.profile'
  data: {
    /** Email пользователя */
    email: string
  }
}

/**
 * Ответ с профилем пользователя
 */
export interface UserProfileResponse {
  type: 'user.profile.success'
  data: UserProfile
}

/**
 * Запрос на обновление своего профиля
 */
export interface UserProfileUpdateRequest {
  type: 'user.profile.update'
  connectionId: string
  data: UserProfileUpdateData
}

/**
 * Успешный ответ на обновление профиля
 */
export interface UserProfileUpdateSuccessResponse {
  type: 'user.profile.update.success'
  data: UserProfile
}

/**
 * Запрос списка чатов пользователя
 */
export interface UserChatsRequest {
  type: 'user.chats'
  data: {
    /** Email пользователя */
    email: string
  }
}

/**
 * Ответ со списком чатов пользователя
 */
export interface UserChatsResponse {
  type: 'user.chats.success'
  data: {
    /** Чаты с количеством непрочитанных */
    chats: (Chat & { unreadCount: number })[]
  }
}

/**
 * Уведомление об изменении статуса пользователя (server push)
 */
export interface UserStatusChangedNotification {
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
