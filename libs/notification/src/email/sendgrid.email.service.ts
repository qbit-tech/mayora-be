import { Inject, Injectable, Logger } from '@nestjs/common';
import Sendgrid from '@sendgrid/mail';
import {
  getNotificationSettingToken,
  SendgridOption,
} from '../notification.helper';

@Injectable()
export class SendgridEmailService {
  constructor(
    @Inject(getNotificationSettingToken('sendgrid'))
    private readonly sendgridOption: SendgridOption,
  ) {
    console.info('this.sendgridOption', this.sendgridOption);
    Sendgrid.setApiKey(this.sendgridOption.apiKey);
  }

  async sendRaw(params: {
    from?: string | { email: string; name: string };
    to: string;
    subject: string;
    text: string;
    html: string;
  }): Promise<boolean> {
    try {
      await Sendgrid.send({
        ...params,
        from: params.from || this.sendgridOption.from,
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  async sendTemplate(params: {
    from?: string | { email: string; name: string };
    to: string;
    subject?: string;
    templateId: string;
    dynamicTemplateData: { [key: string]: string };
  }): Promise<boolean> {
    try {
      console.info('params', params);
      console.info('this.sendgridOption', this.sendgridOption);
      if (params.from && typeof params.from === 'object' && params.from.name) {
        (params.dynamicTemplateData as any).appName = params.from.name;
      } else if (
        this.sendgridOption.from &&
        typeof this.sendgridOption.from === 'object' &&
        this.sendgridOption.from.name
      ) {
        (params.dynamicTemplateData as any).appName =
          this.sendgridOption.from.name;
      } else {
        (params.dynamicTemplateData as any).appName = '~';
      }
      console.info('params after', params);

      const res = await Sendgrid.send({
        ...params,
        from: params.from ? params.from : this.sendgridOption.from,
      });
      console.info('res sendTemplate', res);
      return true;
    } catch (err) {
      Logger.error('FALSE', err);
      return false;
    }
  }
}
