export type UserStatus = 'online' | 'offline' | 'away';

export interface UserProfile {
  email: string;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  status: UserStatus;
  visible: boolean;
}

export interface Connection {
  connectionId: string;
  email: string;
  chatId: string;
  publicKey: string;
  createdAt: number;
}
