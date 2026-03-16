export interface ErrorResponse {
  type: 'error';
  data: {
    code: ErrorCode;
    message: string;
  };
}

export type ErrorCode =
  | 'AUTH_REQUIRED'
  | 'INVALID_EMAIL'
  | 'INVALID_CODE'
  | 'CHAT_NOT_FOUND'
  | 'CHAT_FULL'
  | 'PERMISSION_DENIED'
  | 'RATE_LIMIT'
  | 'INVALID_MESSAGE'
  | 'CONTENT_TYPE_NOT_ALLOWED'
  | 'CALL_NOT_FOUND'
  | 'CALL_BUSY'
  | 'CALL_TIMEOUT'
  | 'UNSUPPORTED_FORMAT'
  | 'INVITE_DENIED'
  | 'USER_ALREADY_IN_CHAT'
  | 'JOIN_CLOSED'
  | 'USER_HIDDEN'
  | 'CHAT_HIDDEN'
  | 'REGISTRATION_CLOSED'
  | 'ALREADY_IN_CHAT'
  | 'INVITE_PERMISSION_DENIED';

export function createError(code: ErrorCode, message: string): ErrorResponse {
  return { type: 'error', data: { code, message } };
}
