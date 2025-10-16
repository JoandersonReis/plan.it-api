import { Injectable } from '@nestjs/common';
import { DebtRepositoryContract } from 'src/core/contract/debt/DebtRepositoryContract';
import { TPaginationData } from 'src/core/contract/types';

@Injectable()
export class FindDebtService {
  constructor(private readonly repository: DebtRepositoryContract) {}

  public async execute(pagination: TPaginationData, userId: string) {
    const debts = await this.repository.find(userId, pagination);

    return debts;
  }
}
