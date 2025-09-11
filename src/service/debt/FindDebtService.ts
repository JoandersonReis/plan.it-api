import { Injectable } from '@nestjs/common';
import { DebtRepositoryContract } from 'src/contract/debt/DebtRepositoryContract';
import { TPaginationData } from 'src/contract/types';

@Injectable()
export class FindDebtService {
  constructor(private readonly repository: DebtRepositoryContract) {}

  public async execute(pagination: TPaginationData, userId: string) {
    const debts = await this.repository.find(userId, pagination);

    return debts;
  }
}
