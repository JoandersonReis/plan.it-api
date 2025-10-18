import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerContract } from 'src/core/contract/MailerContract';
import { MailerHelperContract } from 'src/core/contract/MailerHelperContract';
import { CreateDebtService } from 'src/core/service/debt/CreateDebtService';
import PayDebtService from 'src/core/service/debt/PayDebtService';
import { PrismaModule } from 'src/database/prisma/PrismaModule';
import { DefaultMailer } from 'src/mailer/DefaultMailer';
import { MailerHelper } from 'src/mailer/helper/MailerHelper';
import { CreateDebtController } from './CreateDebtController';
import { PayDebtController } from './PayDebtController';

@Module({
  imports: [
    PrismaModule,

    // Cron Jobs
    ScheduleModule.forRoot(),
  ],
  controllers: [CreateDebtController, PayDebtController],
  providers: [
    PayDebtService,
    CreateDebtService,
    {
      provide: MailerHelperContract,
      useClass: MailerHelper,
    },

    {
      provide: MailerContract,
      useClass: DefaultMailer,
    },
  ],
  exports: [MailerHelperContract, MailerContract],
})
export class DebtModule {}
