import { describe, it, expect } from 'vitest'
import type {
  CallStartRequest,
  CallStartSuccessResponse,
  CallIncomingNotification,
  CallAnswerRequest,
  CallSdpOfferRequest,
  CallSdpAnswerRequest,
  CallIceCandidateRequest,
  CallEndRequest,
  CallEndedNotification,
} from './call.js'

describe('CallStartRequest', (): void => {
  it('creates valid audio call request', (): void => {
    const request: CallStartRequest = {
      type: 'call.start',
      connectionId: 'conn-1',
      data: {
        chatId: 'chat-1',
        callType: 'audio',
        targetEmails: ['user1@example.com', 'user2@example.com'],
      },
    }

    expect(request.data.callType).toBe('audio')
    expect(request.data.targetEmails).toHaveLength(2)
  })

  it('creates valid video call request', (): void => {
    const request: CallStartRequest = {
      type: 'call.start',
      connectionId: 'conn-1',
      data: {
        chatId: 'chat-1',
        callType: 'video',
        targetEmails: ['user@example.com'],
      },
    }

    expect(request.data.callType).toBe('video')
  })
})

describe('CallStartSuccessResponse', (): void => {
  it('creates valid response', (): void => {
    const response: CallStartSuccessResponse = {
      type: 'call.start.success',
      data: { callId: 'call-123' },
    }

    expect(response.data.callId).toBe('call-123')
  })
})

describe('CallIncomingNotification', (): void => {
  it('creates valid notification', (): void => {
    const notification: CallIncomingNotification = {
      type: 'call.incoming',
      data: {
        callId: 'call-123',
        chatId: 'chat-1',
        callerEmail: 'caller@example.com',
        callType: 'video',
      },
    }

    expect(notification.type).toBe('call.incoming')
    expect(notification.data.callerEmail).toBe('caller@example.com')
  })
})

describe('CallAnswerRequest', (): void => {
  it('creates accept answer', (): void => {
    const request: CallAnswerRequest = {
      type: 'call.answer',
      connectionId: 'conn-1',
      data: { callId: 'call-1', accept: true },
    }

    expect(request.data.accept).toBe(true)
  })

  it('creates reject answer', (): void => {
    const request: CallAnswerRequest = {
      type: 'call.answer',
      connectionId: 'conn-1',
      data: { callId: 'call-1', accept: false },
    }

    expect(request.data.accept).toBe(false)
  })
})

describe('CallSdpOfferRequest', (): void => {
  it('creates valid SDP offer', (): void => {
    const request: CallSdpOfferRequest = {
      type: 'call.sdp_offer',
      connectionId: 'conn-1',
      data: {
        callId: 'call-1',
        targetEmail: 'target@example.com',
        sdp: 'v=0\r\no=- 123 123 IN IP4 127.0.0.1',
      },
    }

    expect(request.data.targetEmail).toBe('target@example.com')
    expect(request.data.sdp).toContain('v=0')
  })
})

describe('CallSdpAnswerRequest', (): void => {
  it('creates valid SDP answer', (): void => {
    const request: CallSdpAnswerRequest = {
      type: 'call.sdp_answer',
      connectionId: 'conn-1',
      data: {
        callId: 'call-1',
        targetEmail: 'caller@example.com',
        sdp: 'v=0\r\no=- 456 456 IN IP4 127.0.0.1',
      },
    }

    expect(request.type).toBe('call.sdp_answer')
  })
})

describe('CallIceCandidateRequest', (): void => {
  it('creates valid ICE candidate', (): void => {
    const request: CallIceCandidateRequest = {
      type: 'call.ice_candidate',
      connectionId: 'conn-1',
      data: {
        callId: 'call-1',
        targetEmail: 'peer@example.com',
        candidate: 'candidate:1 1 UDP 2122260223 192.168.1.1 54321 typ host',
      },
    }

    expect(request.data.candidate).toContain('candidate:')
  })
})

describe('CallEndRequest', (): void => {
  it('creates valid end request', (): void => {
    const request: CallEndRequest = {
      type: 'call.end',
      connectionId: 'conn-1',
      data: { callId: 'call-1' },
    }

    expect(request.type).toBe('call.end')
  })
})

describe('CallEndedNotification', (): void => {
  it('creates hangup notification', (): void => {
    const notification: CallEndedNotification = {
      type: 'call.ended',
      data: { callId: 'call-1', reason: 'hangup' },
    }

    expect(notification.data.reason).toBe('hangup')
  })

  it('creates rejected notification', (): void => {
    const notification: CallEndedNotification = {
      type: 'call.ended',
      data: { callId: 'call-1', reason: 'rejected' },
    }

    expect(notification.data.reason).toBe('rejected')
  })

  it('creates timeout notification', (): void => {
    const notification: CallEndedNotification = {
      type: 'call.ended',
      data: { callId: 'call-1', reason: 'timeout' },
    }

    expect(notification.data.reason).toBe('timeout')
  })

  it('creates error notification', (): void => {
    const notification: CallEndedNotification = {
      type: 'call.ended',
      data: { callId: 'call-1', reason: 'error' },
    }

    expect(notification.data.reason).toBe('error')
  })
})
