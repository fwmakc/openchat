/**
 * @fileoverview Типы данных чата
 * @module types/chat
 */

import type { UserStatus, UserProfile } from './user.js'
import type { ContentType } from './message.js'

/**
 * Тип чата
 * - public: открытый чат, все участники равны
 * - protected: защищённый чат с ролями и E2E шифрованием
 * @typedef {'public' | 'protected'} ChatType
 */
export type ChatType = 'public' | 'protected'

/**
 * Роль пользователя в чате
 * - owner: владелец (полный контроль, управляет списком владельцев)
 * - moderator: модератор (управляет пользователями и сообщениями)
 * - member: участник (полный доступ к чтению и написанию)
 * - observer: наблюдатель (только чтение)
 * @typedef {'owner' | 'moderator' | 'member' | 'observer'} UserRole
 */
export type UserRole = 'owner' | 'moderator' | 'member' | 'observer'

/**
 * Настройки чата
 * @interface ChatSettings
 */
export interface ChatSettings {
  /** Максимальное количество пользователей */
  maxUsers: number
  /** Максимальный размер сообщения (байт) */
  messageSize: number
  /** Лимит истории сообщений */
  historyLimit: number
  /** Разрешённые типы контента */
  allowedContentTypes: ContentType[]
}

/**
 * Чат (краткая информация для списков)
 * @interface Chat
 */
export interface Chat {
  /** ID чата */
  chatId: string
  /** Название */
  name: string
  /** Описание */
  description?: string
  /** Иконка (base64) */
  icon?: string
  /** Тип чата */
  type: ChatType
  /** Виден ли чат в списке */
  visible: boolean
  /** Разрешено ли свободное присоединение */
  allowJoin: boolean
  /** Настройки чата */
  settings: ChatSettings
  /** Количество пользователей */
  userCount: number
}

/**
 * Полная информация о чате со списком пользователей
 * @interface ChatInfo
 * @extends {Omit<Chat, 'userCount'>}
 */
export interface ChatInfo extends Omit<Chat, 'userCount'> {
  /** Список пользователей (кратко) */
  users: ChatUserInfo[]
}

/**
 * Краткая информация о пользователе в чате
 * @interface ChatUserInfo
 */
export interface ChatUserInfo extends Pick<UserProfile, 'email' | 'nickname'> {
  /** Количество активных соединений */
  connections: number
  /** Роль в чате */
  role: UserRole
}

/**
 * Подробная информация о пользователе в чате
 * @interface ChatUserDetails
 * @extends {ChatUserInfo}
 */
export interface ChatUserDetails extends ChatUserInfo {
  /** Имя */
  firstName?: string
  /** Фамилия */
  lastName?: string
  /** Аватар (base64) */
  avatar?: string
  /** Статус присутствия */
  status: UserStatus
  /** Активные соединения */
  connectionIds: ConnectionInfo[]
}

/**
 * Информация о соединении
 * @interface ConnectionInfo
 */
export interface ConnectionInfo {
  /** ID соединения */
  connectionId: string
  /** Unix timestamp подключения */
  connectedAt: number
}
