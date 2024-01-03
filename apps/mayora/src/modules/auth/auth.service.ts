import { HttpException, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
// import * as crypto from 'crypto';
import cryptoRandomString from 'crypto-random-string';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { NewUserRequest, SignInRequest, UserProperties } from '../user/user.contract';
import { EPlatform } from '../../core/constants';


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
    private readonly userService: UserService,

  ) {}

  async register(params: NewUserRequest): Promise<UserProperties> {
    Logger.log('INSIDE REGISTER SERVICE');
    console.log(params);
    const userPassword = params.password;
    const pwd = await bcrypt.hash(userPassword, 10);
    Logger.log(JSON.stringify(params));
    const id = uuidv4()

    if (params.email != null && params.name != null) {
      Logger.log('REGISTERING EMAIL');
      const currentDate = new Date();
      const result = await this.userService.create({
        id: id,
        name: params.email,
        email: params.email,
        password: pwd,
        roleId: params.roleId,
        identifier: params.identifier,
        status: params.status,
        createdAt: currentDate,
        updatedAt: currentDate,
        createdBy: id,
        updatedBy: id,
      });

      
      return result ? result : null;
    
    } else {
      return Promise.reject({
        statusCode: 401,
        code: 'unautorized',
        message: 'Email already registered',
      });
    }
  }

  async signIn(params: SignInRequest): Promise<{ token: string; expired: string; isSuccess: boolean }> {
    Logger.log('INSIDE SIGNIN AUTH SERVICE');
    Logger.log(JSON.stringify(params));

    let isUserValid = true;
    let user: UserProperties;
    if (params.email) {
      user = await this.userService.findOneUserByEmail(params.email);
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
          password: params.password,
        });

        if (passed) {
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

          return {
            token: token,
            expired: objData.expired.toString(),
            isSuccess: true,
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
    } 
  }



  // async sessionSignIn(
  //   token: string,
  //   guid: string,
  // ): Promise<{ token: string; expired: string; isSuccess: boolean }> {
  //   try {
  //     let decodedJwt;
  //     try {
  //       decodedJwt =  jwt.verify(
  //         token,
  //         process.env.SESSION_HASH_TOKEN || DEFAULT_HASH_TOKEN,
  //       );
        
  //     } catch (error) {
  //       Logger.error('--- error sessionSignIn --- ', 'auth.service');
  //       throw new HttpException("Token error", 400);
  //     }

  //     const user = await this.verifyToken({ token: decodedJwt.session });

  //     if (user != null) {
  //       // find the device guid
  //       const deviceList = user.user.jMobileGUID;
  //       let isValid = false;
  //       let deviceIndex = 0;
  //       deviceList.forEach(function (element, i) {
  //         if (element.vMobileGUID == guid) {
  //           isValid = true;
  //           deviceIndex = i;
  //         }
  //       });

  //       // if user attempting to use token on unknown device, return false
  //       if (isValid == false) {
  //         return {
  //           token: 'Failed to authenticate device GUID',
  //           expired: null,
  //           isSuccess: false,
  //         };
  //       } else {
  //         const today = new Date();
  //         const userTokenExpired = new Date(user.user.dTokenMobileExp);
  //         const isSuccess = await this.userService.updateGUIDLastLogin(
  //           deviceList,
  //           deviceIndex,
  //           guid,
  //           user.user.iUser,
  //         );

  //         if (!isSuccess) {
  //           throw new HttpException(
  //             "There's an error updating last login activity",
  //             500,
  //           );
  //         }

  //         if (userTokenExpired < today) {
  //           return {
  //             token: 'Failed to refresh token',
  //             expired: null,
  //             isSuccess: false,
  //           };
  //         } else {
  //           const objData = await this.userService.generateNewSession(
  //             user.user,
  //             'mobile',
  //           );
  //           const token = jwt.sign(
  //             objData,
  //             process.env.SESSION_HASH_TOKEN || DEFAULT_HASH_TOKEN,
  //             {
  //               expiresIn: '30d',
  //             },
  //           );
  //           Logger.log('JWT TOKEN: ' + token);

  //           const updateStatus = await this.userService.updateToken(
  //             user.user,
  //             objData.session,
  //             objData.expired,
  //             'mobile',
  //           );

  //           if (updateStatus) {
  //             Logger.log(objData.expired);
  //             Logger.log(new Date(objData.expired));
  //             return {
  //               token: token,
  //               expired: objData.expired.toString(),
  //               isSuccess: true,
  //             };
  //           } else
  //             return {
  //               token: 'Failed to update new token',
  //               expired: null,
  //               isSuccess: false,
  //             };
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     Logger.error('--- error sessionSignIn --- ', 'auth.service');
  //     Logger.error(error);
  //     throw new HttpException(error, 500);
  //   }
  // }

  // async signOut(
  //   session: string,
  //   user: UserData,
  // ): Promise<{ isSuccess: boolean }> {
  //   Logger.log('INSIDE SIGNOUT ASYNC');
  //   let platform = '';
  //   if (session == user.vTokenWeb) platform = 'web';
  //   else platform = 'mobile';

  //   const date = new Date();
  //   if (user !== null && platform === 'mobile') {
  //     await this.userService.updateToken(user, null, date, 'mobile');
  //     return { isSuccess: true };
  //   } else if (user !== null && platform === 'web') {
  //     await this.userService.updateToken(user, null, date, 'web');
  //   } else {
  //     Logger.error('--- error signOut --- ', 'auth.service');
  //     return { isSuccess: false };
  //   }
  // }

  async checkCredentials(params: {
    userData: UserProperties;
    password: string;
  }): Promise<boolean> {
    const match = await bcrypt.compare(
      params.password,
      params.userData.password,
    );
    return match;
  }

  // async verifyToken(params: {
  //   token: string;
  // }): Promise<{ user: UserData; platform: string }> {
  //   Logger.log('INSIDE AUTH SERVICE VERIFY TOKEN');
  //   const result = await this.userService.findOneByToken(params.token);
  //   return result;
  // }

  // async sendForgotEmailPassword(
  //   vEmail: string,
  // ): Promise<{ isSuccess: boolean; token: string }> {
  //   // starting email authentication for user
  //   Logger.log('STARTING SEND GRID FORGOT PASSWORD');
  //   const user = await this.userService.findOneByEmailOrUsername(vEmail);
  //   const tempSession = await bcrypt.hash(user.ipUser, 10);
  //   const generateOTP = await this.sendEmailOTP(vEmail, tempSession)
  //   const emailResult = await this.emailAuthService.sendForgotLink(
  //     vEmail,
  //     user.vUsername,
  //     generateOTP,
  //   );
  //   Logger.log('Email sent? ' + emailResult);

  //   if (emailResult === true) {
  //     Logger.log('Forgot password verification token: ' + generateOTP);
  //     return { isSuccess: true, token: generateOTP };
  //   }
  // }

  // async changeEmailPassword(
  //   vEmail: string,
  //   otp: string,
  //   newPassword: string,
  // ): Promise<boolean> {
  //   const match = await this.verifyOTP(otp, vEmail);
  //   Logger.log('is match? ', match)
  //   if (match) {
  //     const user = await this.userService.findOneByEmailOrUsername(vEmail);
  //     const pwd = await bcrypt.hash(newPassword, 10);
  //     await this.userService.changePassword(user, pwd);
  //     return true;
  //   } else return false;
  // }

  // async sendEmailOTP(vEmail: string, tempSession: string): Promise<string> {
  //   // starting email authentication for user
  //   Logger.log('STARTING EMAIL AUTH VERIFICATION');
  //   const user = await this.userService.findOneByEmailOrUsername(vEmail);
  //   const generateOTP = cryptoRandomString({
  //     length: 6,
  //     characters: '123456789',
  //   });
  //   const generateHashedOTP = await bcrypt.hash(generateOTP, 10);
  //   const generateIpOTP = cryptoRandomString({ length: 8 });

  //   const d = new Date();
  //   // convert to msec
  //   // subtract local time zone offset
  //   // get UTC time in msec
  //   const utc = d.getTime() + d.getTimezoneOffset() * 60000;

  //   // create new Date object for different city
  //   // using supplied offset
  //   const today = new Date(utc + 3600000 * +7.0);

  //   const otpExpired = new Date().setMinutes(new Date().getMinutes() + 5);

  //   const otpActivity = await this.otpRepositories.findAll({
  //     where: {
  //       vEmail: vEmail,
  //       iStatus: 0,
  //     },
  //     order: [['dOTPExpired', 'ASC']],
  //   });

  //   let isSpam = false;
  //   if (otpActivity.length != 0) {
  //     const lastOTPExpired = new Date(
  //       otpActivity[otpActivity.length - 1].dOTPExpired,
  //     );
  //     const createdTime = new Date(
  //       lastOTPExpired.setMinutes(lastOTPExpired.getMinutes() - 5),
  //     );
  //     Logger.log(today.getTime());
  //     Logger.log(createdTime.getTime());
  //     isSpam = today.getTime() - createdTime.getTime() < 60000;
  //   }

  //   if (!isSpam) {
  //     if (user != null) {
  //       const passed = await bcrypt.compare(user.ipUser, tempSession);
  //       // Handle otp spam request
  //       if (passed) {
  //         Logger.log('TEMP SESSION PASSED SUCCESSFULLY');
  //         // Creating OTP Activity for 2FA
  //         const createOTPActivity = await this.otpRepositories.create({
  //           ipOTP: generateIpOTP,
  //           jOTP: {
  //             email: vEmail,
  //           },
  //           vEmail: vEmail,
  //           iStatus: 0,
  //           iUser: user.iUser,
  //           hashOTP: generateHashedOTP,
  //           dOTPExpired: otpExpired,
  //         });

  //         if (createOTPActivity != null) {
  //           const emailResult =
  //             await this.emailAuthService.sendEmailVerification(
  //               vEmail,
  //               generateOTP,
  //             );

  //           if (process.env.NODE_ENV === 'development') {
  //             return generateOTP;
  //           } else {
  //             if (emailResult === true) {
  //               Logger.log('2FA Email OTP: ' + generateOTP);
  //               return generateOTP;
  //             }
  //           }
  //         }
  //       } else {
  //         Logger.log('FAILED TO BYPASS TEMP SESSION');
  //         return null;
  //       }
  //     } else {
  //       Logger.log('SENDING OTP FOR REGISTRATION');
  //       // Creating OTP Activity for registration
  //       const createOTPActivity = await this.otpRepositories.create({
  //         ipOTP: generateIpOTP,
  //         jOTP: {
  //           email: vEmail,
  //         },
  //         vEmail: vEmail,
  //         iStatus: 0,
  //         hashOTP: generateHashedOTP,
  //         dOTPExpired: otpExpired,
  //       });

  //       if (createOTPActivity != null) {
  //         const emailResult = await this.emailAuthService.sendEmailVerification(
  //           vEmail,
  //           generateOTP,
  //         );

  //         if (process.env.NODE_ENV === 'development') {
  //           return generateOTP;
  //         } else {
  //           if (emailResult === true) {
  //             Logger.log('2FA Email OTP: ' + generateOTP);
  //             return generateOTP;
  //           }
  //         }
  //       } else return null;
  //     }
  //   } else {
  //     Logger.log('OTP Request is categorized as SPAM');
  //   }
  // }

  // async resendEmailOTP(vEmail: string, tempSession: string): Promise<string> {
  //   const deleted = await this.otpRepositories.destroy({
  //     where: {
  //       vEmail: vEmail,
  //       iStatus: 0,
  //     },
  //   })

  //   const result = await this.sendEmailOTP(
  //     vEmail,
  //     tempSession,
  //   );
  
  //   return result
  // }

  // async updateUserPhone(user: UserData, vMobile: string): Promise<boolean> {
  //   const update = await this.userService.updatePhone(user, vMobile);
  //   if (update) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // async validityCheck(
  //   vUsername: string,
  //   vEmail: string,
  //   vMobile: string,
  // ): Promise<boolean[]> {
  //   let isUsernameAvailable = false;
  //   let isEmailAvailable = false;
  //   let isMobileAvailable = false;

  //   if (vUsername != undefined) {
  //     isUsernameAvailable =
  //       (await this.userService.findOneByEmailOrUsername(vUsername)) == null
  //         ? true
  //         : false;
  //   }

  //   if (vEmail != undefined) {
  //     isEmailAvailable =
  //       (await this.userService.findOneByEmailOrUsername(vEmail)) == null
  //         ? true
  //         : false;
  //   }

  //   if (vMobile != undefined) {
  //     isMobileAvailable =
  //       (await this.userService.findOneByPhone(vMobile)) == null ? true : false;
  //   }

  //   const result: boolean[] = [
  //     isMobileAvailable,
  //     isUsernameAvailable,
  //     isEmailAvailable,
  //   ];
  //   return result;
  // }
}

