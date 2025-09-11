import { TDebtTemplate } from 'src/job/types';
import { TMailerHelperConfig, TMailerInfo } from './types';

export abstract class MailerHelperContract {
  public abstract getMailerConfig(
    template: TDebtTemplate,
    templateSourceName: string,
    config: TMailerInfo,
  ): TMailerHelperConfig;
}
