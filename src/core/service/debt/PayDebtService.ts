import { Injectable } from '@nestjs/common';
import { DebtRepositoryContract } from 'src/core/contract/debt/DebtRepositoryContract';

@Injectable()
export default class PayDebtService {
  constructor(private readonly repository: DebtRepositoryContract) {}

  async execute(paid: boolean, debtId: string, userId: string) {
    this.repository.update(userId, debtId, { paid });
  }
}
