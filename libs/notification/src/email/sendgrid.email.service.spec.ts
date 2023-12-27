import { Test, TestingModule } from '@nestjs/testing';
import { NotificationModule } from '../notification.module';
import { SendgridEmailService } from './sendgrid.email.service';

describe('SendgridEmailService', () => {
  let service: SendgridEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        NotificationModule.forRoot([
          {
            name: 'sendgrid',
            setting: {
              apiKey: process.env.SENDGRID_API_KEY,
              from: {
                email: process.env.SENDGRID_EMAIL_FROM,
                name: process.env.SENDGRID_EMAIL_FROM_NAME,
              },
            },
          },
        ]),
      ],
    }).compile();

    service = module.get<SendgridEmailService>(SendgridEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.sendRaw).toBeDefined();
    expect(service.sendTemplate).toBeDefined();
  });

  it('should send email', async () => {
    const status = await service.sendRaw({
      from: 'noreply@qbit.co.id',
      to: 'elr0nda@geene.io',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    });
    expect(true).toBeTruthy();
  });

  it('should send email using template', async () => {
    const status = await service.sendTemplate({
      from: 'noreply@qbit.co.id',
      to: 'elr0nda@geene.io',
      templateId: 'd-eda81866e037475989b5333a336b7062',
      dynamicTemplateData: {
        name: 'Anak Bawang',
        otp: '102938',
      },
    });
    expect(true).toBeTruthy();
  });
});
