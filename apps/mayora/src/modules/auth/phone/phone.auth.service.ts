import { HttpException, Injectable, Logger } from '@nestjs/common';
import cryptoRandomString from 'crypto-random-string';
import {
  DEFAULT_HASH_TOKEN,
  UserData,
  UserService,
} from '../../user/user.service';
import { OTPActivityProperties, OTPModel } from '../otp.repositories';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PhoneAuthService {
  constructor(
    @InjectModel(OTPModel)
    private readonly otpRepositories: typeof OTPModel,
    private readonly userService: UserService, // private readonly goSMSGateway: GoSMSGatewayService,
  ) {}

  async sendOtp(vMobile: string, tempSession: string): Promise<string> {
    const user = await this.userService.findOneByPhone(vMobile);
    const generateOTP = cryptoRandomString({
      length: 6,
      characters: '123456789',
    });
    const newHashedOTP = await bcrypt.hash(generateOTP, 10);
    const generateIpOTP = cryptoRandomString({ length: 8 });

    const d = new Date();
    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;

    // create new Date object for different city
    // using supplied offset
    const today = new Date(utc + 3600000 * +7.0);

    const otpExpired = new Date().setMinutes(new Date().getMinutes() + 5);

    const otpActivity = await this.otpRepositories.findAll({
      where: {
        vMobile: vMobile,
        iStatus: 0,
      },
      order: [['dOTPExpired', 'ASC']],
    });

    let isSpam = false;
    if (otpActivity.length != 0) {
      const lastOTPExpired = new Date(
        otpActivity[otpActivity.length - 1].dOTPExpired,
      );
      const createdTime = new Date(
        lastOTPExpired.setMinutes(lastOTPExpired.getMinutes() - 5),
      );
      Logger.log(today.getTime());
      Logger.log(createdTime.getTime());
      isSpam = today.getTime() - createdTime.getTime() < 60000;
    }

    if (!isSpam) {
      if (user) {
        const passed = await bcrypt.compare(user.ipUser, tempSession);

        if (passed) {
          Logger.log('TEMP SESSION PASSED SUCCESSFULLY');
          const createOTPActivity = await this.otpRepositories.create({
            ipOTP: generateIpOTP,
            jOTP: {
              phoneNumber: vMobile,
            },
            vMobile: vMobile,
            hashOTP: newHashedOTP,
            iStatus: 0,
            iUser: user.iUser,
            dOTPExpired: otpExpired,
          });

          Logger.log('2FA Phone OTP: ' + generateOTP);
          return createOTPActivity ? generateOTP : null;
        } else {
          Logger.log('FAILED TO BYPASS TEMP SESSION');
          return null;
        }
      } else {
        const createOTPActivity = await this.otpRepositories.create({
          ipOTP: generateIpOTP,
          jOTP: {
            phoneNumber: vMobile,
          },
          vMobile: vMobile,
          hashOTP: newHashedOTP,
          iStatus: 0,
          dOTPExpired: otpExpired,
        });

        Logger.log('Phone Registration OTP: ' + generateOTP);
        return createOTPActivity ? generateOTP : null;
      }
    } else {
      Logger.log('OTP Request is categorized as SPAM');
      return null;
    }
  }

  async reSendOtp(vMobile: string, tempSession: string): Promise<string> {

    const deleted = await this.otpRepositories.destroy({
      where: {
        vMobile: vMobile,
        iStatus: 0,
      },
    })

    const result = await this.sendOtp(
      vMobile,
      tempSession,
    );

    return result
  }

  async verifyOTP(
    phoneNumber: string,
    otp: string,
  ): Promise<{ token: string }> {
    try {
      Logger.log('INSIDE VERIFY OTP PHONE AUTH SERVICE');
      Logger.log('FIND: ' + phoneNumber + ' token: ' + otp);
      const otpActivity = await this.otpRepositories.findAll({
        where: {
          vMobile: phoneNumber,
          iStatus: 0,
        },
      });

      Logger.log('INSIDE OTPACTIVITY');
      Logger.log(JSON.stringify(otpActivity));

      let isVerified = false;
      async function checkOTP() {
        for (const element of otpActivity) {
          const match = await bcrypt.compare(otp, element.hashOTP);
          const otpExpired = new Date(element.dOTPExpired);
          const currentTime = new Date();
          const isExpired =
            new Date(otpExpired.valueOf() + 1000 * (60 * 1)) < currentTime; //false
          Logger.log('is it matched? ' + match);
          if (match && !isExpired) {
            Logger.log('updating isVerified..');
            isVerified = true;
          }
        }
      }

      await checkOTP();
      Logger.log('isMatch? ' + isVerified);

      if (isVerified) {
        const user = await this.userService.findOneByPhone(phoneNumber);
        otpActivity.forEach(async (element) => {
          await this.otpRepositories.update(
            {
              iStatus: 1,
            },
            {
              where: {
                iOTP: element.iOTP,
              },
            },
          );
        });

        if (user != null) {
          const objData = await this.userService.generateNewSession(
            user,
            'mobile',
          );

          const token = jwt.sign(
            objData,
            process.env.SESSION_HASH_TOKEN || DEFAULT_HASH_TOKEN,
            {
              expiresIn: '30d', // expires in 1 year
            },
          );
          Logger.log('JWT TOKEN: ' + token);

          // JWT and vTokenMobile expiration date must equal
          const updateStatus = await this.userService.updateToken(
            user,
            objData.session,
            objData.expired,
            'mobile',
          );
          if (updateStatus) {
            return { token: token };
          }

          // if (isExpiredEqual(token, objData.expired)) {
          // } else {
          //     Logger.error("Expiration Date between JWT and vTokenMobile doesn't matched!")
          // }
        } else {
          const tempSession = await bcrypt.hash(phoneNumber, 10);
          return { token: tempSession };
        }
      } else return null;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, 504);
    }
  }


  async findOne(phoneNumber: string): Promise<OTPActivityProperties> {
    const result = await this.otpRepositories.findOne({
      where: {
        vMobile: phoneNumber,
      },
    });
    return result;
  }

  async sendForgotPhonePassword(vMobile: string): Promise<any> {

    Logger.log('STARTING PHONE FORGOT PASSWORD');
    const user = await this.userService.findOneByPhone(vMobile);
    const tempSession = await bcrypt.hash(user.ipUser, 10);

    const phoneResult = await this.sendOtp(vMobile, tempSession);

      return phoneResult;
    // if (process.env.BYPASS_PHONE_MESSAGE==='true') {
    // } else{
    //   return null
    // }
  }

  async changePhonePassword(
    vMobile: string,
    otp: string,
    newPassword: string,
  ): Promise<boolean> {
    const match = await this.verifyOTP(vMobile, otp);
    if (match) {
      Logger.log('CHANGE PASSWORD MATCHED!');
      const user = await this.userService.findOneByPhone(vMobile);
      const pwd = await bcrypt.hash(newPassword, 10);
      await this.userService.changePassword(user, pwd);
      return true;
    } else return false;
  }

  async updateUserEmail(user: UserData, vEmail: string): Promise<boolean> {
    const update = await this.userService.updateEmail(user, vEmail);

    if (update) {
      return true;
    } else {
      return false;
    }
  }
}
