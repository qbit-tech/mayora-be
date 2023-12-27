import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UserData, UserService } from './../user/user.service';
import * as bcrypt from 'bcrypt';
// import * as crypto from 'crypto';
import { EmailAuthService } from './email.auth.service';
// import { PhoneAuthService } from './phone/phone.auth.service';
import { InjectModel } from '@nestjs/sequelize';
import { OTPModel } from './otp.repositories';
import cryptoRandomString from 'crypto-random-string';
import { Gender } from '../user/user.entity';
import * as jwt from 'jsonwebtoken';

export const DEFAULT_HASH_TOKEN = '58n4984u0n98ur3';

export type AuthData = {
  vFirstName?: string;
  vLastName?: string;
  vUsername?: string;
  vPassword?: string;
  vEmail?: string;
  vMobile?: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(OTPModel)
    private readonly otpRepositories: typeof OTPModel,
    private readonly userService: UserService,
    private readonly emailAuthService: EmailAuthService,
  ) {}

  async register(params: {
    vFirstName: string;
    vLastName: string;
    vUsername: string;
    vPassword: string;
    vEmail?: string;
    vMobile?: string;
    verifiedEmailSessionId: string;
    verifiedPhoneSessionId: string;
    iGender: number;
    vNickName: string;
    birthdate: Date;
  }): Promise<{ expired: Date; session: string }> {
    Logger.log('INSIDE REGISTER SERVICE');
    let match = false;
    console.log(params);
    if (params.vEmail && params.vMobile) {
      // console.log('=============================1');
      const emailMatch = await bcrypt.compare(
        params.vEmail,
        params.verifiedEmailSessionId,
      );
      const mobileMatch = await bcrypt.compare(
        params.vMobile,
        params.verifiedPhoneSessionId,
      );

      if (emailMatch == true && mobileMatch == true) match = true;
    } else if (params.vEmail) {
      match = await bcrypt.compare(
        params.vEmail,
        params.verifiedEmailSessionId,
      );
      // console.log('=============================2');
      // console.log(match);
    } else {
      // console.log('=============================3');
      match = await bcrypt.compare(
        params.vMobile,
        params.verifiedPhoneSessionId,
      );
    }

    const userPassword = params.vPassword;
    const pwd = await bcrypt.hash(userPassword, 10);

    Logger.log(JSON.stringify(params));

    if (match && params.vEmail != null && params.vMobile != null) {
      Logger.log('REGISTERING BOTH EMAIL AND PHONE');
      const userBirthdate = new Date(params.birthdate);
      const result = await this.userService.create({
        vFirstName: params.vFirstName,
        vLastName: params.vLastName,
        vFullName: `${params.vFirstName} ${params.vLastName}`,
        vEmail: params.vEmail,
        vMobile: params.vMobile,
        vUsername: params.vUsername,
        vNickName: params.vNickName,
        iGender: params.iGender,
        vPassword: pwd,
        dEmailVerified: new Date(),
        dMobileVerified: new Date(),
        jUserDetails: {
          birthdate: userBirthdate,
        },
        iStatus: 1,
      });

      if (result) {
        const session = await this.userService.generateNewSession(
          result,
          'mobile',
        );
        return session ? session : null;
      }
    } else if (match && params.vEmail != null) {
      Logger.log('MATCHED AND INSIDE REGISTER WITH EMAIL ONLY');
      const userBirthdate = new Date(params.birthdate);
      const result = await this.userService.create({
        vFirstName: params.vFirstName,
        vLastName: params.vLastName,
        vFullName: `${params.vFirstName} ${params.vLastName}`,
        vEmail: params.vEmail,
        vUsername: params.vUsername,
        vPassword: pwd,
        vNickName: params.vNickName,
        iGender: params.iGender,
        dEmailVerified: new Date(),
        jUserDetails: {
          birthdate: userBirthdate,
        },
        iStatus: 1,
      });

      if (result) {
        const session = await this.userService.generateNewSession(
          result,
          'mobile',
        );
        return session ? session : null;
      }
    } else if (match && params.vMobile != null) {
      Logger.log('MATCHED AND INSIDE REGISTER WITH PHONE NUMBER ONLY');
      const userBirthdate = new Date(params.birthdate);
      const result = await this.userService.create({
        vFirstName: params.vFirstName,
        vLastName: params.vLastName,
        vFullName: `${params.vFirstName} ${params.vLastName}`,
        vMobile: params.vMobile,
        vUsername: params.vUsername,
        vPassword: pwd,
        iGender: params.iGender,
        vNickName: params.vNickName,
        dMobileVerified: new Date(),
        jUserDetails: {
          birthdate: userBirthdate,
        },
        iStatus: 1,
      });

      if (result) {
        const session = await this.userService.generateNewSession(
          result,
          'mobile',
        );
        return session ? session : null;
      }
    } else {
      return Promise.reject({
        statusCode: 401,
        code: 'unautorized',
        message: 'Email already registered',
      });
    }
  }

  async signIn(params: {
    vPassword: string;
    platform: string;
    vMobile?: string;
    vEmail?: string;
    vMobileGUID?: string;
  }): Promise<{
    tempSession: string;
    status: string;
    available2FA: string[];
  }> {
    Logger.log('INSIDE SIGNIN AUTH SERVICE');
    Logger.log(JSON.stringify(params));

    let isUserValid = true;
    if (params.platform == 'mobile') {
      let user: UserData;
      if (params.vEmail) {
        user = await this.userService.findOneByEmailOrUsername(params.vEmail);
      } else if (params.vMobile) {
        user = await this.userService.findOneByPhone(params.vMobile);
      } else {
        user = null;
      }

      if (user == null) {
        isUserValid = false;
        return Promise.reject({
          statusCode: 401,
          code: 'unathorized',
          message: 'Invalid Credentials',
        });
      }

      if (isUserValid) {
        const passed = await this.checkCredentials({
          userData: user,
          vPassword: params.vPassword,
          platform: params.platform,
        });

        if (passed) {
          const tempSession = await bcrypt.hash(user.ipUser, 10);
          const boolResult = await this.userService.updateGUID(
            user,
            params.vMobileGUID,
          );
          console.log(boolResult)
          if (!boolResult.isSuccess) {
            // return {
            //   tempSession: 'SUSPICIOUS',
            //   status: boolResult.message,
            //   available2FA: [],
            // };
            return Promise.reject({
              statusCode: 401,
              code: 'suspicious',
              message: 'Suspicious login',
            });
          }

          let options = [];
          if (user.dEmailVerified != null && user.dMobileVerified != null) {
            options = ['Phone', 'Email'];
          } else if (user.dEmailVerified != null) {
            options = ['Email'];
          } else {
            options = ['Phone'];
          }

          return {
            tempSession: tempSession,
            status: 'Waiting for 2 Factor Authentication...',
            available2FA: options,
          };
        } else {
          return Promise.reject({
            statusCode: 401,
            code: 'unauthorized',
            message: 'Failed to authenticate user',
          });
          // return {
          //   tempSession: '',
          //   status: '',
          //   available2FA: [],
          // };
        }
      } else {
        return Promise.reject({
          statusCode: 401,
          code: 'unauthorized',
          message: 'User invalid',
        });
      }
    } else if (params.platform == 'web') {
    }
  }

  async sessionSignIn(
    token: string,
    guid: string,
  ): Promise<{ token: string; expired: string; isSuccess: boolean }> {
    try {
      let decodedJwt;
      try {
        decodedJwt =  jwt.verify(
          token,
          process.env.SESSION_HASH_TOKEN || DEFAULT_HASH_TOKEN,
        );
        
      } catch (error) {
        Logger.error('--- error sessionSignIn --- ', 'auth.service');
        throw new HttpException("Token error", 400);
      }

      const user = await this.verifyToken({ token: decodedJwt.session });

      if (user != null) {
        // find the device guid
        const deviceList = user.user.jMobileGUID;
        let isValid = false;
        let deviceIndex = 0;
        deviceList.forEach(function (element, i) {
          if (element.vMobileGUID == guid) {
            isValid = true;
            deviceIndex = i;
          }
        });

        // if user attempting to use token on unknown device, return false
        if (isValid == false) {
          return {
            token: 'Failed to authenticate device GUID',
            expired: null,
            isSuccess: false,
          };
        } else {
          const today = new Date();
          const userTokenExpired = new Date(user.user.dTokenMobileExp);
          const isSuccess = await this.userService.updateGUIDLastLogin(
            deviceList,
            deviceIndex,
            guid,
            user.user.iUser,
          );

          if (!isSuccess) {
            throw new HttpException(
              "There's an error updating last login activity",
              500,
            );
          }

          if (userTokenExpired < today) {
            return {
              token: 'Failed to refresh token',
              expired: null,
              isSuccess: false,
            };
          } else {
            const objData = await this.userService.generateNewSession(
              user.user,
              'mobile',
            );
            const token = jwt.sign(
              objData,
              process.env.SESSION_HASH_TOKEN || DEFAULT_HASH_TOKEN,
              {
                expiresIn: '30d',
              },
            );
            Logger.log('JWT TOKEN: ' + token);

            const updateStatus = await this.userService.updateToken(
              user.user,
              objData.session,
              objData.expired,
              'mobile',
            );

            if (updateStatus) {
              Logger.log(objData.expired);
              Logger.log(new Date(objData.expired));
              return {
                token: token,
                expired: objData.expired.toString(),
                isSuccess: true,
              };
            } else
              return {
                token: 'Failed to update new token',
                expired: null,
                isSuccess: false,
              };
          }
        }
      }
    } catch (error) {
      Logger.error('--- error sessionSignIn --- ', 'auth.service');
      Logger.error(error);
      throw new HttpException(error, 500);
    }
  }

  async signOut(
    session: string,
    user: UserData,
  ): Promise<{ isSuccess: boolean }> {
    Logger.log('INSIDE SIGNOUT ASYNC');
    let platform = '';
    if (session == user.vTokenWeb) platform = 'web';
    else platform = 'mobile';

    const date = new Date();
    if (user !== null && platform === 'mobile') {
      await this.userService.updateToken(user, null, date, 'mobile');
      return { isSuccess: true };
    } else if (user !== null && platform === 'web') {
      await this.userService.updateToken(user, null, date, 'web');
    } else {
      Logger.error('--- error signOut --- ', 'auth.service');
      return { isSuccess: false };
    }
  }

  async checkCredentials(params: {
    userData: UserData;
    vPassword: string;
    platform: string;
  }): Promise<boolean> {
    const match = await bcrypt.compare(
      params.vPassword,
      params.userData.vPassword,
    );
    return match;
  }

  async verifyToken(params: {
    token: string;
  }): Promise<{ user: UserData; platform: string }> {
    Logger.log('INSIDE AUTH SERVICE VERIFY TOKEN');
    const result = await this.userService.findOneByToken(params.token);
    return result;
  }

  async verifyOTP(
    otp: string,
    vEmail: string,
  ): Promise<boolean> {
    try {
      console.log(otp)
      const otpActivity = await this.otpRepositories.findAll({
        where: {
          vEmail: vEmail,
          iStatus: 0,
        },
      });
      Logger.log('INSIDE VERIFIY EMAIL TOKEN AUTH SERVICE');
      Logger.log(JSON.stringify(otpActivity), otp)

      let isVerified = false;
  
      for (const element of otpActivity) {
        const match = await bcrypt.compareSync(otp, element.hashOTP);
        const otpExpired = new Date(element.dOTPExpired);
        const currentTime = new Date();
        const isExpired =
          new Date(otpExpired.valueOf() + 1000 * (60 * 1)) < currentTime; //false
        Logger.log('is it matched? ' + match);
        if (match && !isExpired) {
          Logger.log('updating isVerified..');
          isVerified = true;
        } else {
          Logger.log(
            "It's either the otp compare is not successful or it is expired",
          );
        }
      }
    

      Logger.log('isMatch? ' + isVerified);

      if (isVerified || process.env.BYPASS_EMAIL_OTP === 'true') {
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
       return true
      }
      return false
    } catch (error) {
      Logger.error('--- error verifyEmailToken --- ', 'email.service');
      Logger.error(error);
      throw new HttpException(error, 504);
    }
  }

  async verifyEmailToken(
    otp: string,
    vEmail: string,
  ): Promise<{ token: string }> {
    try {
      const otpActivity = await this.otpRepositories.findAll({
        where: {
          vEmail: vEmail,
          iStatus: 0,
        },
      });
      Logger.log('INSIDE VERIFIY EMAIL TOKEN AUTH SERVICE');

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
          } else {
            Logger.log(
              "It's either the otp compare is not successful or it is expired",
            );
          }
        }
      }

      process.env.BYPASS_EMAIL_OTP !== 'true' && (await checkOTP());
      Logger.log('isMatch? ' + isVerified);

      if (isVerified || process.env.BYPASS_EMAIL_OTP === 'true') {
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

        const user = await this.userService.findOneByEmailOrUsername(vEmail);
        if (user != null) {
          const objData = await this.userService.generateNewSession(
            user,
            'mobile',
          );
          const token = jwt.sign(
            objData,
            process.env.SESSION_HASH_TOKEN || DEFAULT_HASH_TOKEN,
            {
              expiresIn: '30d',
            },
          );

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
          const tempSession = await bcrypt.hash(vEmail, 10);
          return { token: tempSession };
        }
      } else return null;
    } catch (error) {
      Logger.error('--- error verifyEmailToken --- ', 'email.service');
      Logger.error(error);
      throw new HttpException(error, 504);
    }
  }

  async sendForgotEmailPassword(
    vEmail: string,
  ): Promise<{ isSuccess: boolean; token: string }> {
    // starting email authentication for user
    Logger.log('STARTING SEND GRID FORGOT PASSWORD');
    const user = await this.userService.findOneByEmailOrUsername(vEmail);
    const tempSession = await bcrypt.hash(user.ipUser, 10);
    const generateOTP = await this.sendEmailOTP(vEmail, tempSession)
    const emailResult = await this.emailAuthService.sendForgotLink(
      vEmail,
      user.vUsername,
      generateOTP,
    );
    Logger.log('Email sent? ' + emailResult);

    if (emailResult === true) {
      Logger.log('Forgot password verification token: ' + generateOTP);
      return { isSuccess: true, token: generateOTP };
    }
  }

  async changeEmailPassword(
    vEmail: string,
    otp: string,
    newPassword: string,
  ): Promise<boolean> {
    const match = await this.verifyOTP(otp, vEmail);
    Logger.log('is match? ', match)
    if (match) {
      const user = await this.userService.findOneByEmailOrUsername(vEmail);
      const pwd = await bcrypt.hash(newPassword, 10);
      await this.userService.changePassword(user, pwd);
      return true;
    } else return false;
  }

  async sendEmailOTP(vEmail: string, tempSession: string): Promise<string> {
    // starting email authentication for user
    Logger.log('STARTING EMAIL AUTH VERIFICATION');
    const user = await this.userService.findOneByEmailOrUsername(vEmail);
    const generateOTP = cryptoRandomString({
      length: 6,
      characters: '123456789',
    });
    const generateHashedOTP = await bcrypt.hash(generateOTP, 10);
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
        vEmail: vEmail,
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
      if (user != null) {
        const passed = await bcrypt.compare(user.ipUser, tempSession);
        // Handle otp spam request
        if (passed) {
          Logger.log('TEMP SESSION PASSED SUCCESSFULLY');
          // Creating OTP Activity for 2FA
          const createOTPActivity = await this.otpRepositories.create({
            ipOTP: generateIpOTP,
            jOTP: {
              email: vEmail,
            },
            vEmail: vEmail,
            iStatus: 0,
            iUser: user.iUser,
            hashOTP: generateHashedOTP,
            dOTPExpired: otpExpired,
          });

          if (createOTPActivity != null) {
            const emailResult =
              await this.emailAuthService.sendEmailVerification(
                vEmail,
                generateOTP,
              );

            if (process.env.NODE_ENV === 'development') {
              return generateOTP;
            } else {
              if (emailResult === true) {
                Logger.log('2FA Email OTP: ' + generateOTP);
                return generateOTP;
              }
            }
          }
        } else {
          Logger.log('FAILED TO BYPASS TEMP SESSION');
          return null;
        }
      } else {
        Logger.log('SENDING OTP FOR REGISTRATION');
        // Creating OTP Activity for registration
        const createOTPActivity = await this.otpRepositories.create({
          ipOTP: generateIpOTP,
          jOTP: {
            email: vEmail,
          },
          vEmail: vEmail,
          iStatus: 0,
          hashOTP: generateHashedOTP,
          dOTPExpired: otpExpired,
        });

        if (createOTPActivity != null) {
          const emailResult = await this.emailAuthService.sendEmailVerification(
            vEmail,
            generateOTP,
          );

          if (process.env.NODE_ENV === 'development') {
            return generateOTP;
          } else {
            if (emailResult === true) {
              Logger.log('2FA Email OTP: ' + generateOTP);
              return generateOTP;
            }
          }
        } else return null;
      }
    } else {
      Logger.log('OTP Request is categorized as SPAM');
    }
  }

  async resendEmailOTP(vEmail: string, tempSession: string): Promise<string> {
    const deleted = await this.otpRepositories.destroy({
      where: {
        vEmail: vEmail,
        iStatus: 0,
      },
    })

    const result = await this.sendEmailOTP(
      vEmail,
      tempSession,
    );
  
    return result
  }

  async updateUserPhone(user: UserData, vMobile: string): Promise<boolean> {
    const update = await this.userService.updatePhone(user, vMobile);
    if (update) {
      return true;
    } else {
      return false;
    }
  }

  async validityCheck(
    vUsername: string,
    vEmail: string,
    vMobile: string,
  ): Promise<boolean[]> {
    let isUsernameAvailable = false;
    let isEmailAvailable = false;
    let isMobileAvailable = false;

    if (vUsername != undefined) {
      isUsernameAvailable =
        (await this.userService.findOneByEmailOrUsername(vUsername)) == null
          ? true
          : false;
    }

    if (vEmail != undefined) {
      isEmailAvailable =
        (await this.userService.findOneByEmailOrUsername(vEmail)) == null
          ? true
          : false;
    }

    if (vMobile != undefined) {
      isMobileAvailable =
        (await this.userService.findOneByPhone(vMobile)) == null ? true : false;
    }

    const result: boolean[] = [
      isMobileAvailable,
      isUsernameAvailable,
      isEmailAvailable,
    ];
    return result;
  }
}

// export function isExpiredEqual(jwtToken: string, vTokenMobile: Date) {
//     let decodedJwt;
//     jwt.verify(jwtToken, process.env.SESSION_HASH_TOKEN || DEFAULT_HASH_TOKEN, function(err, decoded) {
//         decodedJwt = decoded
//     });

//     const jwtDate = new Date(new Date(decodedJwt.expired).toLocaleString('en-us', {
//         timeZone: "Asia/Jakarta"
//     }))

//     // avoid milliseconds with floor div

//     if (Math.floor(jwtDate.getTime()/1000) == Math.floor(vTokenMobile.getTime()/1000)) {
//         return true;
//     }

//     return false;
// }
