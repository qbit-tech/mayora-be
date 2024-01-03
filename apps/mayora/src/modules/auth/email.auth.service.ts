import { Injectable, Logger } from '@nestjs/common';
// import { SendgridEmailService } from '@qbit/notification/email/sendgrid.email.service';
import { UserService } from '../user/user.service';
import { NotificationService } from "@qbit-tech/libs-notification"

@Injectable()
export class EmailAuthService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {}

  async register(params: {
    email: string;
    name: string;
    verificationToken: string;
  }): Promise<{
    sendEmail?: boolean;
  }> {
    try {
      Logger.log('ENTERING EMAIL SEND GRID');
      Logger.log(process.env.SENDGRID_EMAIL_FROM);
      Logger.log(typeof process.env.SENDGRID_EMAIL_FROM);
      const confirmationEmail = await this.notificationService.addToQueue({
        
      })
      // const confirmationEmail = await this.sendGridService.sendTemplate({
      //   from: process.env.SENDGRID_EMAIL_FROM,
      //   to: params.email,
      //   templateId: process.env.SENDGRID_TEMPLATE_ID_EMAIL_VERIFICATION,
      //   dynamicTemplateData: {
      //     name: params.name,
      //     email: params.email,
      //     verificationLink:
      //       process.env.BASE_URL_WEB +
      //       '/verify-email/' +
      //       params.verificationToken,
      //   },
      // });

      // Logger.log("Confirmation email value: " + confirmationEmail)
      // if (confirmationEmail) {
      //   Logger.log('Send email verification success');
      // } else {
      //   Logger.log('Send email verification failed :(');
      // }

      // return { sendEmail: confirmationEmail };
    } catch (error) {
      Logger.error('--- error register --- ', 'email.auth.service');
      Logger.error(error);
      return Promise.reject(error);
    }
  }

  // async confirmAuth(username: string): Promise<void> {
  //   try {
  //     const userData = await this.userService.findOneByEmailOrUsername(
  //       username,
  //     );
  //     if (userData !== null) {
  //       this.userService.updateEmailStatus(userData, new Date());
  //     }
  //   } catch (error) {
  //     Logger.error('--- error confirmAuth --- ', 'email.auth.service');
  //     Logger.error(error);
  //     return Promise.reject(error);
  //   }
  // }

  // async sendForgotLink(
  //   vEmail: string,
  //   vUsername: string,
  //   generateOTP: string,
  // ): Promise<boolean> {
  //   try {
  //     Logger.log('ENTERING EMAIL SEND GRID');
  //     Logger.log(process.env.BYPASS_EMAIL)
  //     // if (process.env.BYPASS_EMAIL === 'true') {
  //     //   return true
  //     // } 
  //     return true
       
      
  //   } catch (error) {
  //     Logger.error('--- error sendForgotLink --- ', 'email.auth.service');
  //     Logger.error(error);
  //     return Promise.reject(error);
  //   }
  // }

  // async sendEmailVerification(
  //   vEmail: string,
  //   verificationToken: string,
  // ): Promise<boolean> {
  //   try {
  //     Logger.log('ENTERING RESEND EMAIL VERIFICATION');
  //     // check whether this is for registration or not by finding the user
  //     const user = await this.userService.findOneByEmailOrUsername(vEmail);

  //     if (user) {
  //       Logger.log('user exist');
  //       // const confirmationEmail = await this.sendGridService.sendTemplate({
  //       //   from: process.env.SENDGRID_EMAIL_FROM,
  //       //   to: user.vEmail,
  //       //   templateId: process.env.SENDGRID_TEMPLATE_ID_EMAIL_VERIFICATION,
  //       //   dynamicTemplateData: {
  //       //     name: user.vUsername,
  //       //     email: user.vEmail,
  //       //     verificationLink:
  //       //       process.env.BASE_URL_WEB + '/verify-email/' + verificationToken,
  //       //   },
  //       // });

  //       // if (confirmationEmail) {
  //       //   Logger.log('Send email verification success');
  //       //   return true;
  //       // } else {
  //       //   Logger.log('Send email verification failed :(');
  //       //   return false;
  //       // }
  //     } else {
  //       Logger.log('user not exist');
  //       // const confirmationEmail = await this.sendGridService.sendTemplate({
  //       //   from: process.env.SENDGRID_EMAIL_FROM,
  //       //   to: vEmail,
  //       //   templateId: process.env.SENDGRID_TEMPLATE_ID_EMAIL_VERIFICATION,
  //       //   dynamicTemplateData: {
  //       //     name: vEmail,
  //       //     email: vEmail,
  //       //     verificationLink: process.env.BASE_URL_WEB + '/email/otp/verify/',
  //       //   },
  //       // });

  //       // if (confirmationEmail) {
  //       //   Logger.log('Send email verification success');
  //       //   return true;
  //       // } else {
  //       //   Logger.log('Send email verification failed :(');
  //       //   return false;
  //       // }
  //     }
  //   } catch (error) {
  //     Logger.error(
  //       '--- error sendEmailVerification --- ',
  //       'email.auth.service',
  //     );
  //     Logger.error(error);
  //     return Promise.reject(error);
  //   }
  // }
}
