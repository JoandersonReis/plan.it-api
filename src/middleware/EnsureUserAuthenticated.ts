import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { SessionRepositoryPrisma } from 'src/database/prisma/session/SessionRepositoryPrisma';
import { JWT } from 'src/utils/JWT';
import { UserAuthenticate } from 'src/utils/UserAuthenticate';

@Injectable()
export class EnsureUserAuthenticated implements NestMiddleware {
  async use(request: Request, response: Response, next: () => void) {
    try {
      const [bearer, token] = request.headers.authorization.split(' ');
      const ip =
        request.headers['x-forwarded-for'] || request.socket.remoteAddress;

      if (!ip) {
        return response
          .status(401)
          .json({ message: 'IP do cliente não encontrado!' });
      }

      if (!token || bearer !== 'Bearer' || !bearer) {
        return response.status(401).json({ message: 'Erro no token!' });
      }

      const userAuthenticate = new UserAuthenticate(new JWT());

      const payload = userAuthenticate.validateAccessToken(token);

      if (!payload || payload.type !== 'access') {
        return response.status(401).json({ message: 'Token inválido!' });
      }

      const sessionRepo = new SessionRepositoryPrisma(new PrismaService());
      const session = await sessionRepo.getByAccess(token, ip as string);

      if (!session) {
        return response.status(401).json({ message: 'Sessão inválida!' });
      }

      request.userId = payload.sub;
      request.sessionId = session.id;
      request.userIp = ip as string;

      next();
    } catch (err) {
      return response
        .status(401)
        .json({ message: 'Token inválido ou faltando!' });
    }
  }
}
