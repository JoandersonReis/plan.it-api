import { Job } from 'bull';
import { TMailerProcessorData } from './types';

export abstract class MailerContract {
  public abstract send(job: Job<TMailerProcessorData>): Promise<void>;
}
