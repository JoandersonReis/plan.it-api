import { InjectQueue } from '@nestjs/bull';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Queue } from 'bull';
import { CronJob } from 'cron';
import { TMailerInfo } from 'src/contract/types';
import UserRepositoryContract from 'src/contract/user/UserRepositoryContract';
import { CONFIG } from 'src/utils/Config';
import { TDebtTemplate } from './types';

@Injectable()
export class DebtReportJob implements OnModuleInit {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly repository: UserRepositoryContract,
    @InjectQueue('mail') private mailQueue: Queue,
  ) {}

  async onModuleInit() {
    const cron = `0 39 0 * * *`;
    const job = new CronJob(
      cron,
      async () => {
        const users = await this.repository.findByCommit(new Date(), false);

        const promises = users.map((user) => {
          if (user.Debt.length == 0) {
            return;
          }

          const mailerConfig: TMailerInfo = {
            from: CONFIG.NODEMAILER.TRANSPORTER_OPTIONS.auth.user,
            to: user.email,
            subject: 'Aviso de Dívida',
            text: 'Dividas para pagar hoje! Veja mais detalhes',
          };

          const mailerTemplate: TDebtTemplate = {
            username: user.fullname,
            debt: user.Debt,
          };

          return this.mailQueue.add({
            transporter: CONFIG.NODEMAILER.TRANSPORTER_OPTIONS,
            template: mailerTemplate,
            sourceTemplate: 'DebtPaidDayNotification.html',
            config: mailerConfig,
          });
        });

        await Promise.all(promises);
      },
      null,
      true,
      'America/Sao_Paulo',
    );

    this.schedulerRegistry.addCronJob(`one-time-debt`, job);
    job.start();
  }
}
