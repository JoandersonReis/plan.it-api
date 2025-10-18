import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { DebtRepositoryContract } from 'src/core/contract/debt/DebtRepositoryContract';
import {
  TDebtCreateData,
  TDebtDatabase,
  TDebtFind,
} from 'src/core/contract/debt/types';
import { TPaginationData } from 'src/core/contract/types';

@Injectable()
export class DebtRepositoryPrisma implements DebtRepositoryContract {
  constructor(private prisma: PrismaService) {}

  public async find(
    userId: string,
    pagination?: TPaginationData,
  ): Promise<TDebtFind> {
    const page = pagination.page || pagination.page > 0 ? pagination.page : 1;
    const limit = pagination.limit || 10;
    const skip = limit * page - limit;

    const debts = await this.prisma.debt.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const count = await this.prisma.debt.count({
      where: {
        userId,
      },
    });

    return {
      debts,
      pages: Math.ceil(count / limit),
    };
  }

  public async findById(id: string, userId: string): Promise<TDebtDatabase> {
    const debt = await this.prisma.debt.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        user: true,
      },
    });

    return debt;
  }

  public async findByMonth(
    month: number,
    userId: string,
  ): Promise<TDebtDatabase[]> {
    const startOfMonth = new Date();
    startOfMonth.setMonth(month);
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(month);
    endOfMonth.setDate(31);
    endOfMonth.setHours(23, 59, 59, 999);

    const debts = await this.prisma.debt.findMany({
      where: {
        userId,
        OR: [
          {
            commit: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
          {
            repeat: true,
          },
        ],
      },
    });

    return debts;
  }

  public async create(data: TDebtCreateData): Promise<TDebtDatabase> {
    const debtCreated = await this.prisma.debt.create({
      data,
      include: {
        user: true,
      },
    });

    return debtCreated;
  }

  public async update(
    userId: string,
    id: string,
    data: Partial<TDebtCreateData>,
  ): Promise<TDebtDatabase> {
    const debtUpdated = await this.prisma.debt.update({
      where: {
        id,
        userId,
      },
      include: {
        user: true,
      },
      data,
    });

    return debtUpdated;
  }

  public async delete(id: string, userId: string): Promise<TDebtDatabase> {
    const debtDeleted = await this.prisma.debt.delete({
      where: {
        id,
        userId,
      },
      include: {
        user: true,
      },
    });

    return debtDeleted;
  }
}
