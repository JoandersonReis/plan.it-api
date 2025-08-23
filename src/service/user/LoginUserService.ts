import { Injectable } from '@nestjs/common';
import UserRepositoryContract from 'src/contract/user/UserRepositoryContract';
import { CONFIG } from 'src/utils/Config';
import { Encode } from 'src/utils/Encode';
import { Exception } from 'src/utils/Exception';
import { JWT } from 'src/utils/JWT';
import { TTokenPayload } from 'src/utils/types';
import { TLoginCreateData } from './types';

@Injectable()
export default class LoginUserService {
  constructor(private repository: UserRepositoryContract) {}

  public async execute({ email, password }: TLoginCreateData) {
    const user = await this.repository.getByEmail(email.getValue());

    if (!user) {
      throw Exception.execute('Usuário ou senha inválidos', 401);
    }

    const isPasswordValid = Encode.verify(password.getValue(), user.password);

    if (!isPasswordValid) {
      throw Exception.execute('Usuário ou senha inválidos', 401);
    }

    const { secrets, accessTokenPayload, refreshTokenPayload } =
      this.tokensConfiguration(user.id);

    const { accessToken, refreshToken } = JWT.generate(
      secrets,
      accessTokenPayload,
      refreshTokenPayload,
    );

    return { user: { fullname: user.fullname }, accessToken, refreshToken };
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
