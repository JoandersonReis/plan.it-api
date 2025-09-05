import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { DebtRepositoryContract } from 'src/contract/debt/DebtRepositoryContract';
import {
  TDebtCreateData,
  TDebtDatabase,
  TDebtFind,
} from 'src/contract/debt/types';
import { TPaginationData } from 'src/contract/types';

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
    });

    return debt;
  }

  public async create(data: TDebtCreateData): Promise<TDebtDatabase> {
    const debtCreated = await this.prisma.debt.create({
      data,
    });

    return debtCreated;
  }

  public async update(
    id: string,
    data: Partial<TDebtCreateData>,
  ): Promise<TDebtDatabase> {
    const debtUpdated = await this.prisma.debt.update({
      where: {
        id,
        userId: data.userId,
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
    });

    return debtDeleted;
  }
}
