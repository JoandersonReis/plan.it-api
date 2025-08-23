import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TUserCreateData, TUserDatabase } from 'src/contract/user/types';
import UserRepositoryContract from 'src/contract/user/UserRepositoryContract';

@Injectable()
export default class UserRepositoryPrisma implements UserRepositoryContract {
  constructor(private prisma: PrismaService) {}

  public async create(data: TUserCreateData): Promise<TUserDatabase> {
    const userCreated = await this.prisma.user.create({ data });

    return userCreated;
  }

  public async getOne(id: string): Promise<TUserDatabase | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return user;
  }

  public getByEmail(email: string): Promise<TUserDatabase | null> {
    const user = this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return user;
  }
}
