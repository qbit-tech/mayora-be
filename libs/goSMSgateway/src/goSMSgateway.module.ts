import { HttpModule, Module } from '@nestjs/common';
import { GoSMSGatewayService } from './goSMSgateway.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
      maxRedirects: 5,
    }),
  ],
  exports: [GoSMSGatewayService],
  providers: [GoSMSGatewayService],
})
export class GoSMSGatewayModule {}
