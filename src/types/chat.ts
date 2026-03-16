import type { UserStatus, UserProfile } from './user.js'
import type { ContentType } from './message.js'

/**
 * Тип чата
 * - public: открытый чат
 * - protected: защищённый чат с ролями
 */
export type ChatType = 'public' | 'protected'

/**
 * Роль пользователя в чате
 * - owner: владелец (полный контроль)
 * - moderator: модератор (управляет пользователями)
 * - member: участник (полный доступ)
 * - observer: наблюдатель (только чтение)
 */
export type UserRole = 'owner' | 'moderator' | 'member' | 'observer'

/**
 * Настройки чата
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
 * Чат (краткая информация)
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
 */
export interface ChatInfo extends Omit<Chat, 'userCount'> {
  /** Список пользователей (кратко) */
  users: ChatUserInfo[]
}

/**
 * Краткая информация о пользователе в чате
 */
export interface ChatUserInfo extends Pick<UserProfile, 'email' | 'nickname'> {
  /** Количество активных соединений */
  connections: number
  /** Роль в чате */
  role: UserRole
}

/**
 * Подробная информация о пользователе в чате
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
 */
export interface ConnectionInfo {
  /** ID соединения */
  connectionId: string
  /** Unix timestamp подключения */
  connectedAt: number
}
