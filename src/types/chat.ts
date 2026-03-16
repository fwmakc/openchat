import type { UserStatus } from './user.js';

export type ChatType = 'public' | 'protected';
export type ParticipantRole = 'owner' | 'moderator' | 'member' | 'observer';

export interface ChatSettings {
  maxParticipants: number;
  messageSize: number;
  historyLimit: number;
  allowedContentTypes: string[];
}

export interface Chat {
  chatId: string;
  name: string;
  description?: string;
  icon?: string;
  type: ChatType;
  visible: boolean;
  join: boolean;
  settings: ChatSettings;
  participantCount: number;
}

export interface ChatInfo extends Chat {
  participants: ParticipantInfo[];
}

export interface ParticipantInfo {
  email: string;
  nickname?: string;
  connections: number;
  role: ParticipantRole;
}

export interface ParticipantDetails extends ParticipantInfo {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  status: UserStatus;
  connectionIds: { connectionId: string; connectedAt: number }[];
}
