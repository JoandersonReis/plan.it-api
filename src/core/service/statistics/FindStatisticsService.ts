import { Injectable } from '@nestjs/common';
import { DebtRepositoryContract } from 'src/core/contract/debt/DebtRepositoryContract';

@Injectable()
export default class FindStatisticsService {
  constructor(private readonly debtRepository: DebtRepositoryContract) {}

  async execute(month: number, userId: string) {
    const debts = await this.debtRepository.findByMonth(month - 1, userId);

    var debtsDays = [];
    var monthDebtsValueTotal = 0;
    var debtsPaidTotal = 0;

    if (debts.length > 0) {
      debts.forEach((item) => {
        if (
          debtsDays.findIndex(
            (debt) => debt.date.getDate() === item.commit.getDate(),
          ) != -1
        ) {
          return;
        }

        var debtsFiltered = debts.filter(
          (debt) => debt.commit.getDate() === item.commit.getDate(),
        );

        var debtsDay = {
          date: new Date(item.commit),
          debts: debtsFiltered,
        };

        monthDebtsValueTotal += Number(item.value);

        if (item.paid) {
          debtsPaidTotal += Number(item.value);
        }

        if (debtsDay.debts.length > 0) {
          debtsDays.push(debtsDay);
        }
      });
    }

    var debtsSection = {
      debtsDays,
      debtsTotal: monthDebtsValueTotal,
      debtsCount: debtsDays.length,
      debtsPaidTotal,
    };

    return {
      debts: debtsSection,
    };
  }
}
