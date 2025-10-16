import { Injectable } from '@nestjs/common';
import { DebtRepositoryContract } from 'src/core/contract/debt/DebtRepositoryContract';

@Injectable()
export default class FindStatisticsService {
  constructor(private readonly debtRepository: DebtRepositoryContract) {}

  async execute(month: number, userId: string) {
    const debts = await this.debtRepository.findByMonth(month, userId);

    var debtsDays = [];

    if (debts.length > 0) {
      debts.forEach((item) => {
        var debtsDay = {
          date: new Date(item.commit),
          debts: [],
        };

        debts.forEach((debt) => {
          if (debt.commit.getDate() === item.commit.getDate()) {
            debtsDay.debts.push(debt);
          }
        });

        if (debtsDay.debts.length > 0) {
          debtsDays.push(debtsDay);
        }
      });
    }

    return {
      debts: debtsDays,
    };
  }
}
