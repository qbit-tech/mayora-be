import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import * as FirebaseAdmin from 'firebase-admin';

export type FirebaseOptions = FirebaseAdmin.AppOptions;
export const FIREBASE_MESSAGING = 'FIREBASE_MESSAGING';
export type FirebaseMessaging = FirebaseAdmin.messaging.Messaging;

@Global()
@Module({})
export class FirebaseModule {
  static forRoot(options: FirebaseOptions): DynamicModule {
    FirebaseAdmin.initializeApp(options);
    const sharedProviders: Provider[] = [
      {
        provide: FIREBASE_MESSAGING,
        useValue: FirebaseAdmin.messaging(),
      },
    ];
    return {
      global: true,
      module: FirebaseModule,
      providers: [...sharedProviders],
      exports: [...sharedProviders],
    };
  }
}
