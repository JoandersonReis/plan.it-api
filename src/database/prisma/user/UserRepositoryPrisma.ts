import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  TDebtWithoutUser,
  TUserCreateData,
  TUserDatabase,
  TUserWithDebt,
} from 'src/contract/user/types';
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

  public async findByCommit(commit: Date): Promise<TUserWithDebt[]> {
    const startOfDay = new Date(commit);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(commit);
    endOfDay.setHours(23, 59, 59, 999);

    const users = await this.prisma.user.findMany({
      include: {
        Debt: {
          where: {
            commit: {
              gte: startOfDay,
              lte: endOfDay,
            },
            repeat: false,
          },
        },
      },
    });

    const debtsWithRepeat: TDebtWithoutUser[] = await this.prisma.$queryRaw`
      SELECT * FROM "Debt" as D
      WHERE EXTRACT(DAY FROM "commit") = ${commit.getDate()} AND D.repeat = true;
    `;

    const usersFiltered = users.map((user) => {
      if (user)
        return {
          ...user,
          Debt: [
            ...user.Debt,
            ...debtsWithRepeat.filter((debt) => debt.userId == user.id),
          ],
        };
    });

    return usersFiltered;
  }

  public getByEmail(email: string): Promise<TUserDatabase | null> {
    const user = this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return user;
  }
}
