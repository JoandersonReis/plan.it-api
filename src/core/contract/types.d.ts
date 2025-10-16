import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type TPaginationData = {
  page: number;
  limit: number;
};

export type TMailerHelperConfig = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};

export type TMailerInfo = {
  from;
  to;
  subject;
  text;
};

export type TMailerProcessorData = {
  template: DebtTemplate;
  config: TMailerInfo;
  transporter: SMTPTransport.Options;
  sourceTemplate: string;
};
