export type NotificationType = 'sendgrid';

export type SendgridOption = {
  apiKey: string;
  from: {
    email: string;
    name: string;
  };
};

export type NotificationOption = {
  name: NotificationType;
  setting: SendgridOption;
};

export function getNotificationSettingToken(name: NotificationType): string {
  return `notification_setting_${name}`;
}

export function getNotificationToken(name: NotificationType): string {
  return `notification_provider_${name}`;
}
