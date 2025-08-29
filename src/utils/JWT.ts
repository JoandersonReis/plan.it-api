import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { TTokenPayload, TTokenSecrets } from './types';

export class JWT {
  public generate(
    secrets: TTokenSecrets,
    accessPayload: TTokenPayload,
    refreshPayload: TTokenPayload,
    sessionId?: string,
  ): TTokenSecrets {
    const accessToken = sign(
      {
        type: 'access',
        sessionId,
      },
      secrets.accessToken,
      accessPayload,
    );

    const refreshToken = sign(
      {
        type: 'refresh',
        sessionId,
      },
      secrets.refreshToken,
      refreshPayload,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  public validate(token: string, secret: string): JwtPayload | null {
    const payload = verify(token, secret) as JwtPayload;

    if (!payload) {
      return null;
    }

    return payload;
  }
}
