import { Injectable } from '@nestjs/common';
import { DebtRepositoryContract } from 'src/core/contract/debt/DebtRepositoryContract';
import { Debt } from 'src/core/entity/Debt';
import { Exception } from 'src/utils/Exception';

@Injectable()
export class CreateDebtService {
  constructor(private readonly repository: DebtRepositoryContract) {}

  public async execute(debt: Debt) {
    const debtCreated = await this.repository.create(debt.getValues());

    if (!debtCreated) {
      throw Exception.execute('Erro na criação da dívida!', 400);
    }

    return { debt: debtCreated };
  }
}
