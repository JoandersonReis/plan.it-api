import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SessionRepositoryContract } from 'src/core/contract/session/SessionRepositoryContract';
import {
  TSessionCreateData,
  TSessionDatabase,
} from 'src/core/contract/session/types';

@Injectable()
export class SessionRepositoryPrisma implements SessionRepositoryContract {
  constructor(private prisma: PrismaService) {}

  public async create(data: TSessionCreateData): Promise<TSessionDatabase> {
    const session = await this.prisma.session.create({
      data,
    });

    return session;
  }

  public async getById(
    id: string,
    ip: string,
  ): Promise<TSessionDatabase | null> {
    const session = await this.prisma.session.findUnique({
      where: { id, ip },
    });

    return session;
  }

  public async getByUserId(
    userId: string,
    ip: string,
  ): Promise<TSessionDatabase[] | null> {
    const sessions = await this.prisma.session.findMany({
      where: { userId, ip },
    });

    return sessions;
  }

  public async getByRefresh(
    token: string,
    ip: string,
  ): Promise<TSessionDatabase | null> {
    const session = await this.prisma.session.findUnique({
      where: { refreshToken: token, ip },
    });

    return session;
  }

  public async getByAccess(
    token: string,
    ip: string,
  ): Promise<TSessionDatabase | null> {
    const session = await this.prisma.session.findUnique({
      where: { accessToken: token, ip },
    });

    return session;
  }

  public update(
    sessionId: string,
    data: Partial<TSessionCreateData>,
  ): Promise<TSessionDatabase | null> {
    const sessionUpdated = this.prisma.session.update({
      where: { id: sessionId },
      data,
    });

    return sessionUpdated;
  }

  public active(sessionId: string, active: boolean): Promise<TSessionDatabase> {
    const sessionUpdated = this.prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        active,
      },
    });

    return sessionUpdated;
  }

  public async delete(
    id: string,
    ip: string,
  ): Promise<TSessionDatabase | null> {
    const sessionDeleted = await this.prisma.session.delete({
      where: { id, ip },
    });

    return sessionDeleted;
  }
}
