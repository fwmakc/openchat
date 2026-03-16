/**
 * @fileoverview Протокол WebRTC звонков
 * Сервер используется только для сигнализации. Медиа-трафик идёт P2P.
 * @module protocol/call
 */

import type { BaseRequest, BaseResponse } from './handshake.js'
import type { CallType, CallEndReason } from '../types/index.js'

/**
 * Запрос на начало звонка
 * @interface CallStartRequest
 * @extends {BaseRequest}
 */
export interface CallStartRequest extends BaseRequest {
  type: 'call.start'
  connectionId: string
  data: {
    /** ID чата */
    chatId: string
    /** Тип звонка: audio или video */
    callType: CallType
    /** Email адресатов звонка */
    targetEmails: string[]
  }
}

/**
 * Успешный ответ на начало звонка
 * @interface CallStartSuccessResponse
 * @extends {BaseResponse}
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
 * @interface CallIncomingNotification
 * @extends {BaseResponse}
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
 * Запрос на ответ на звонок (принять/отклонить)
 * @interface CallAnswerRequest
 * @extends {BaseRequest}
 */
export interface CallAnswerRequest extends BaseRequest {
  type: 'call.answer'
  connectionId: string
  data: {
    /** ID звонка */
    callId: string
    /** Принять (true) или отклонить (false) */
    accept: boolean
  }
}

/**
 * Успешный ответ на ответ звонка
 * @interface CallAnswerSuccessResponse
 * @extends {BaseResponse}
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
 * Запрос на передачу SDP offer (WebRTC сигнализация)
 * @interface CallSdpOfferRequest
 * @extends {BaseRequest}
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
 * Запрос на передачу SDP answer (WebRTC сигнализация)
 * @interface CallSdpAnswerRequest
 * @extends {BaseRequest}
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
 * Запрос на передачу ICE candidate (WebRTC сигнализация)
 * @interface CallIceCandidateRequest
 * @extends {BaseRequest}
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
 * @interface CallEndRequest
 * @extends {BaseRequest}
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
 * @interface CallEndedNotification
 * @extends {BaseResponse}
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
