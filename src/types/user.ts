export type UserStatus = 'online' | 'offline' | 'away'

export interface UserProfile {
  email: string
  nickname?: string
  firstName?: string
  lastName?: string
  avatar?: string
  status: UserStatus
  discoverable: boolean
}

export type UserProfileUpdateData = Partial<Omit<UserProfile, 'email'>>
