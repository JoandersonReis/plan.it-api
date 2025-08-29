export type TException = {
  message: string;
  statusCode: number;
  errors: ?any;
};

export type TTokenPayload = {
  subject: string;
  expiresIn: number | StringValue;
};

export type TTokenSecrets = {
  accessToken: string;
  refreshToken?: string;
};

export type TJWTValidadeResponse = {
  sub: string;
};
