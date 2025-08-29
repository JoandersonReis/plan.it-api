import { CONFIG } from './Config';
import { JWT } from './JWT';
import { TTokenPayload } from './types';

export class UserAuthenticate {
  constructor(private _JWT: JWT) {}

  public generateTokens(userId: string, sessionId: string) {
    const { secrets, accessTokenPayload, refreshTokenPayload } =
      this.tokensConfiguration(userId);

    const { accessToken, refreshToken } = this._JWT.generate(
      secrets,
      accessTokenPayload,
      refreshTokenPayload,
      sessionId,
    );

    return { accessToken, refreshToken };
  }

  public validateAccessToken(token: string) {
    const payload = this._JWT.validate(token, CONFIG.USER.SECRETS.ACCESS);

    return payload;
  }

  public validateRefreshToken(token: string) {
    const payload = this._JWT.validate(token, CONFIG.USER.SECRETS.REFRESH);

    return payload;
  }

  private tokensConfiguration(userId: string) {
    const secrets = {
      accessToken: CONFIG.USER.SECRETS.ACCESS,
      refreshToken: CONFIG.USER.SECRETS.REFRESH,
    };

    const accessTokenPayload: TTokenPayload = {
      subject: userId,
      expiresIn: CONFIG.USER.EXPIRES.ACCESS,
    };

    const refreshTokenPayload: TTokenPayload = {
      subject: userId,
      expiresIn: CONFIG.USER.EXPIRES.REFRESH,
    };

    return { secrets, accessTokenPayload, refreshTokenPayload };
  }
}
