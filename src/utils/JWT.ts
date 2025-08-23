import { sign } from 'jsonwebtoken';
import { TTokenPayload, TTokenSecrets } from './types';

export class JWT {
  public static generate(
    secrets: TTokenSecrets,
    accessPayload: TTokenPayload,
    refreshPayload: TTokenPayload,
  ): TTokenSecrets {
    const accessToken = sign(
      {
        type: 'access',
      },
      secrets.accessToken,
      accessPayload,
    );

    const refreshToken = sign(
      {
        type: 'refresh',
      },
      secrets.refreshToken,
      refreshPayload,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
