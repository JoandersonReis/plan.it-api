import { Injectable } from '@nestjs/common';
import { DebtRepositoryContract } from 'src/core/contract/debt/DebtRepositoryContract';
import { TDebtCreateData } from 'src/core/contract/debt/types';
import { Exception } from 'src/utils/Exception';

@Injectable()
export class UpdateDebtService {
  constructor(private readonly repository: DebtRepositoryContract) {}

  public async execute(
    id: string,
    data: Partial<TDebtCreateData>,
    userId: string,
  ) {
    const debt = await this.repository.findById(id, userId);

    if (!debt) {
      throw Exception.execute('Dívida não encontrada!', 404);
    }

    const debtUpdated = await this.repository.update(id, data);

    return debtUpdated;
  }
}
