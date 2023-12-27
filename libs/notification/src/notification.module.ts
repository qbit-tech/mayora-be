import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { SendgridEmailService } from './email/sendgrid.email.service';
import {
  getNotificationSettingToken,
  NotificationOption,
  NotificationType,
} from './notification.helper';

const TokenOptionClassMap = {
  sendgrid: SendgridEmailService,
};

@Global()
@Module({})
export class NotificationModule {
  static forRoot(options: NotificationOption[]): DynamicModule {
    console.log('NotificationModule.forRoot -- run');
    const optionProviders = options.map(
      (option): Provider => ({
        provide: getNotificationSettingToken(option.name),
        useValue: option.setting,
      }),
    );
    const providers = options.map(
      (option): Provider => TokenOptionClassMap[option.name],
    );

    return {
      global: true,
      module: NotificationModule,
      providers: [...optionProviders, ...providers],
      exports: [...providers],
    };
  }

  static forFeature(providerName: NotificationType[]): DynamicModule {
    console.log('NotificationModule.forFeature: -- start');
    const providers = providerName.map(
      (name): Provider => ({
        provide: TokenOptionClassMap[name],
        useFactory: () => TokenOptionClassMap[name],
        inject: [getNotificationSettingToken(name)],
      }),
    );

    return {
      global: true,
      module: NotificationModule,
      providers: [...providers],
      exports: [...providers],
    };
  }
}
