import type { BaseRequest, BaseResponse } from './handshake.js'
import type { CallType, CallEndReason } from '../types/index.js'

/**
 * Запрос на начало звонка
 */
export interface CallStartRequest extends BaseRequest {
  type: 'call.start'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** Тип звонка */
    callType: CallType
    /** Email адресатов */
    targetEmails: string[]
  }
}

/**
 * Успешный ответ на начало звонка
 */
export interface CallStartSuccessResponse extends BaseResponse {
  type: 'call.start.success'
  data: {
    /** ID звонка */
    callId: string
  }
}

/**
 * Уведомление о входящем звонке (server push)
 */
export interface CallIncomingNotification extends BaseResponse {
  type: 'call.incoming'
  data: {
    /** ID звонка */
    callId: string
    /** ID чата */
    chatId: string
    /** Email звонящего */
    callerEmail: string
    /** Тип звонка */
    callType: CallType
  }
}

/**
 * Запрос на ответ на звонок
 */
export interface CallAnswerRequest extends BaseRequest {
  type: 'call.answer'
  connectionId: string
  data: {
    /** ID звонка */
    callId: string
    /** Принять или отклонить */
    accept: boolean
  }
}

/**
 * Успешный ответ на ответ звонка
 */
export interface CallAnswerSuccessResponse extends BaseResponse {
  type: 'call.answer.success'
  data: {
    /** ID звонка */
    callId: string
    /** Был ли принят звонок */
    accepted: boolean
  }
}

/**
 * Запрос на передачу SDP offer
 */
export interface CallSdpOfferRequest extends BaseRequest {
  type: 'call.sdp_offer'
  connectionId: string
  data: {
    /** ID звонка */
    callId: string
    /** Email адресата */
    targetEmail: string
    /** SDP offer (base64) */
    sdp: string
  }
}

/**
 * Запрос на передачу SDP answer
 */
export interface CallSdpAnswerRequest extends BaseRequest {
  type: 'call.sdp_answer'
  connectionId: string
  data: {
    /** ID звонка */
    callId: string
    /** Email адресата */
    targetEmail: string
    /** SDP answer (base64) */
    sdp: string
  }
}

/**
 * Запрос на передачу ICE candidate
 */
export interface CallIceCandidateRequest extends BaseRequest {
  type: 'call.ice_candidate'
  connectionId: string
  data: {
    /** ID звонка */
    callId: string
    /** Email адресата */
    targetEmail: string
    /** ICE candidate (base64) */
    candidate: string
  }
}

/**
 * Запрос на завершение звонка
 */
export interface CallEndRequest extends BaseRequest {
  type: 'call.end'
  connectionId: string
  data: {
    /** ID звонка */
    callId: string
  }
}

/**
 * Уведомление о завершении звонка (server push)
 */
export interface CallEndedNotification extends BaseResponse {
  type: 'call.ended'
  data: {
    /** ID звонка */
    callId: string
    /** Причина завершения */
    reason: CallEndReason
  }
}
