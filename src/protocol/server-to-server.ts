export interface ServerUserCheckRequest {
  type: 'server.user_check';
  data: {
    email: string;
    requestingServer: string;
  };
}

export interface ServerUserCheckResponse {
  type: 'server.user_check.success';
  data: {
    exists: boolean;
    publicKeys: string[];
  };
}

export interface ServerChallengeRequest {
  type: 'server.challenge';
  data: {
    email: string;
    challenge: string;
  };
}

export interface ServerChallengeResponse {
  type: 'server.challenge.response';
  data: {
    email: string;
    challenge: string;
    signature: string;
  };
}
