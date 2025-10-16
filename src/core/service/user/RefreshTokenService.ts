import { Injectable } from '@nestjs/common';
import { SessionRepositoryContract } from 'src/core/contract/session/SessionRepositoryContract';
import { Exception } from 'src/utils/Exception';
import { JWT } from 'src/utils/JWT';
import { UserAuthenticate } from 'src/utils/UserAuthenticate';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly repository: SessionRepositoryContract) {}

  async execute(sessionId: string, userId: string) {
    const userAuthenticate = new UserAuthenticate(new JWT());

    const { refreshToken, accessToken } = userAuthenticate.generateTokens(
      userId,
      sessionId,
    );

    const updatedSession = await this.repository.update(sessionId, {
      accessToken,
      refreshToken,
    });

    if (!updatedSession) {
      throw Exception.execute('Erro ao atualizar sessão!', 500);
    }

    return { refreshToken, accessToken };
  }
}
