import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';
import { MailerContract } from 'src/contract/MailerContract';
import { MailerHelperContract } from 'src/contract/MailerHelperContract';
import { TMailerProcessorData } from 'src/contract/types';

@Injectable()
@Processor('mail')
export class DefaultMailer implements MailerContract {
  constructor(private readonly helper: MailerHelperContract) {}

  @Process()
  public async send(job: Job<TMailerProcessorData>): Promise<void> {
    const mailerConfig = this.helper.getMailerConfig(
      job.data.template,
      job.data.sourceTemplate,
      job.data.config,
    );
    const transporter = nodemailer.createTransport(job.data.transporter);

    await transporter.sendMail(mailerConfig);
  }
}
