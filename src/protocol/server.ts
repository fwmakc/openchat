import type { ServerInfo, Chat, UserProfile, ChatInfo } from '../types/index.js';

export interface ServerInfoRequest {
  type: 'server.info';
}

export interface ServerInfoResponse {
  type: 'server.info.success';
  data: ServerInfo;
}

export interface ServerChatsRequest {
  type: 'server.chats';
}

export interface ServerChatsResponse {
  type: 'server.chats.success';
  data: {
    chats: Chat[];
  };
}

export interface UserCheckRequest {
  type: 'user.check';
  data: {
    email: string;
  };
}

export interface UserCheckResponse {
  type: 'user.check.success';
  data: {
    exists: boolean;
    profile?: UserProfile;
    chats?: string[];
  };
}

export interface UserProfileRequest {
  type: 'user.profile';
  data: {
    email: string;
  };
}

export interface UserProfileResponse {
  type: 'user.profile.success';
  data: UserProfile;
}

export interface UserProfileUpdateRequest {
  type: 'user.profile.update';
  connectionId: string;
  data: Partial<UserProfile>;
}

export interface UserChatsRequest {
  type: 'user.chats';
  data: {
    email: string;
  };
}

export interface UserChatsResponse {
  type: 'user.chats.success';
  data: {
    chats: (Chat & { unreadCount: number })[];
  };
}
