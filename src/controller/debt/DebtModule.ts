import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerContract } from 'src/contract/MailerContract';
import { MailerHelperContract } from 'src/contract/MailerHelperContract';
import { PrismaModule } from 'src/database/prisma/PrismaModule';
import { DefaultMailer } from 'src/mailer/DefaultMailer';
import { MailerHelper } from 'src/mailer/helper/MailerHelper';
import { CreateDebtService } from 'src/service/debt/CreateDebtService';
import { CreateDebtController } from './CreateDebtController';

@Module({
  imports: [
    PrismaModule,

    // Cron Jobs
    ScheduleModule.forRoot(),
  ],
  controllers: [CreateDebtController],
  providers: [
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
