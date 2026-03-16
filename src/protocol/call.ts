export interface CallStartRequest {
  type: 'call.start';
  connectionId: string;
  data: {
    chatId: string;
    callType: 'audio' | 'video';
    targetEmails: string[];
  };
}

export interface CallStartSuccessResponse {
  type: 'call.start.success';
  data: {
    callId: string;
  };
}

export interface CallIncomingNotification {
  type: 'call.incoming';
  data: {
    callId: string;
    chatId: string;
    callerEmail: string;
    callType: 'audio' | 'video';
  };
}

export interface CallAnswerRequest {
  type: 'call.answer';
  connectionId: string;
  data: {
    callId: string;
    accept: boolean;
  };
}

export interface CallSdpOfferRequest {
  type: 'call.sdp_offer';
  connectionId: string;
  data: {
    callId: string;
    targetEmail: string;
    sdp: string;
  };
}

export interface CallSdpAnswerRequest {
  type: 'call.sdp_answer';
  connectionId: string;
  data: {
    callId: string;
    targetEmail: string;
    sdp: string;
  };
}

export interface CallIceCandidateRequest {
  type: 'call.ice_candidate';
  connectionId: string;
  data: {
    callId: string;
    targetEmail: string;
    candidate: string;
  };
}

export interface CallEndRequest {
  type: 'call.end';
  connectionId: string;
  data: {
    callId: string;
  };
}

export interface CallEndedNotification {
  type: 'call.ended';
  data: {
    callId: string;
    reason: 'hangup' | 'rejected' | 'timeout' | 'error';
  };
}
