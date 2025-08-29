import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import UserRepositoryContract from 'src/contract/user/UserRepositoryContract';
import { SessionRepositoryPrisma } from 'src/database/prisma/session/SessionRepositoryPrisma';
import { Encode } from 'src/utils/Encode';
import { Exception } from 'src/utils/Exception';
import { JWT } from 'src/utils/JWT';
import { UserAuthenticate } from 'src/utils/UserAuthenticate';
import { TLoginCreateData } from './types';

@Injectable()
export default class LoginUserService {
  constructor(private repository: UserRepositoryContract) {}

  public async execute({ email, password, ip }: TLoginCreateData) {
    const user = await this.repository.getByEmail(email.getValue());

    if (!user) {
      throw Exception.execute('Usuário ou senha inválidos', 401);
    }

    const isPasswordValid = Encode.verify(password.getValue(), user.password);

    if (!isPasswordValid) {
      throw Exception.execute('Usuário ou senha inválidos', 401);
    }

    const userAuthenticate = new UserAuthenticate(new JWT());

    const sessionRepo = new SessionRepositoryPrisma(new PrismaService());

    const [sessionExists] = await sessionRepo.getByUserId(user.id, ip);
    const sessionId = crypto.randomUUID();

    const { accessToken, refreshToken } = userAuthenticate.generateTokens(
      user.id,
      sessionExists ? sessionExists.id : sessionId,
    );

    if (!sessionExists) {
      const session = await sessionRepo.create({
        id: sessionId,
        accessToken,
        refreshToken,
        userId: user.id,
        ip,
      });

      if (!session) {
        throw Exception.execute('Erro ao criar sessão', 500);
      }
    } else {
      await sessionRepo.update(sessionExists.id, {
        active: true,
        accessToken,
        refreshToken,
      });
    }

    return { user: { fullname: user.fullname }, accessToken, refreshToken };
  }
}
