export type ContentType = 'text' | 'media' | 'poll';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  messageId: string;
  chatId: string;
  senderEmail: string;
  senderConnectionId: string;
  contentType: ContentType;
  content: string;
  timestamp: number;
}

export interface MessageWithStatus extends Message {
  status: MessageStatus;
}
