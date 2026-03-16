/**
 * @fileoverview Типы данных пользователя
 * @module types/user
 */

/**
 * Статус присутствия пользователя
 * @typedef {'online' | 'offline' | 'away'} UserStatus
 */
export type UserStatus = 'online' | 'offline' | 'away'

/**
 * Профиль пользователя
 * @interface UserProfile
 */
export interface UserProfile {
  /** Email пользователя (идентификатор) */
  email: string
  /** Отображаемое имя */
  nickname?: string
  /** Имя */
  firstName?: string
  /** Фамилия */
  lastName?: string
  /** Отчество */
  middleName?: string
  /** День рождения (ISO 8601) */
  birthday?: string
  /** Аватар (base64) */
  avatar?: string
  /** Статус присутствия */
  status: UserStatus
  /** Разрешить находить пользователя в поиске */
  allowFind: boolean
}

/**
 * Данные для обновления профиля (email нельзя изменить)
 * @typedef {Partial<Omit<UserProfile, 'email'>>} UserProfileUpdateData
 */
export type UserProfileUpdateData = Partial<Omit<UserProfile, 'email'>>
