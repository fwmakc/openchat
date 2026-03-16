/**
 * Статус присутствия пользователя
 */
export type UserStatus = 'online' | 'offline' | 'away'

/**
 * Профиль пользователя
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
 */
export type UserProfileUpdateData = Partial<Omit<UserProfile, 'email'>>
