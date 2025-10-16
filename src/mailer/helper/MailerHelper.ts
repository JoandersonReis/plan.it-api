import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import { MailerHelperContract } from 'src/core/contract/MailerHelperContract';
import { TMailerInfo } from 'src/core/contract/types';
import { TDebtTemplate } from 'src/job/types';
import { CONFIG } from 'src/utils/Config';
import { Utils } from 'src/utils/Utils';

@Injectable()
export class MailerHelper implements MailerHelperContract {
  public getMailerConfig(
    templateData: TDebtTemplate,
    templateSourceName: string,
    config: TMailerInfo,
  ) {
    const templatePath = Utils.getTemplatePath(templateSourceName);
    const source = fs.readFileSync(templatePath, 'utf-8');
    const template = Handlebars.compile(source);

    Handlebars.registerHelper('formatDate', (value) =>
      Utils.convertDate(value),
    );
    Handlebars.registerHelper('centsToReal', (value) =>
      Utils.convertCentsToReal(value),
    );
    Handlebars.registerHelper('uppercase', (value: string) =>
      value.toLocaleUpperCase(),
    );

    const htmlToSend = template(templateData);

    return {
      ...config,
      from: CONFIG.NODEMAILER.TRANSPORTER_OPTIONS.auth.user,
      html: htmlToSend,
    };
  }
}
