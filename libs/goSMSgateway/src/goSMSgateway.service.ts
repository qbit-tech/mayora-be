import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { GOSMSGATEWAY_URL } from './config';
import * as qs from 'qs';
import {
  GoSMSGatewayAddGroupRequest,
  GoSMSGatewayAddPhonebookRequest,
  GoSMSGatewayDeleteGroupRequest,
  GoSMSGatewayDeletePhonebookRequest,
  GoSMSGatewayEditGroupRequest,
  GoSMSGatewayFindNamePhonebookRequest,
  GoSMSGatewayFindPhoneNumberPhonebookRequest,
  GoSMSGatewayListGroupRequest,
  GoSMSGatewayOptions,
  GoSMSGatewaySearchGroupRequest,
  GoSMSGatewaySendSMSGroupRequest,
  GoSMSGatewaySendSMSSecureRequest,
  GoSMSGatewaySendSMSSimpleRequest,
  GoSMSGatewayUpdatePhonebookRequest,
} from './types/goSMSgateway.type';
import { DataType } from 'sequelize-typescript';
import { query } from 'express';

// https://www.npmjs.com/package/js-md5
const md5 = require('js-md5');

@Injectable()
export class GoSMSGatewayService {
  /*
    ----------------SENDING MESSAGE SERVICES START----------------
  */

  async sendingMessagesSecured(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewaySendSMSSecureRequest,
  ): Promise<any> {
    Logger.log(
      'Send Messages Secured GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        username: goSMSsetup.username,
        auth: md5(goSMSsetup.username + goSMSsetup.password + dto.phoneNumber),
        mobile: dto.phoneNumber,
        message: dto.message,
        trxid: dto.trxId,
        type: 0, //default 0 for ASCII change to 3 for specialized character like chinese,japanese,arabic character
      });

      //url:'http://api.gosmsgateway.net/api/sendSMS.php'
      const res = await axios.post(
        GOSMSGATEWAY_URL[goSMSsetup.stage] + '/sendSMS.php?' + querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Send Message Secured GoSMSGateway:::ERROR:' +
          JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async sendingMessagesSimple(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewaySendSMSSimpleRequest,
  ): Promise<any> {
    Logger.log(
      'Send Messages Simple GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        username: goSMSsetup.username,
        password: goSMSsetup.password,
        mobile: dto.phoneNumber,
        message: dto.message,
      });

      //url:'http://api.gosmsgateway.net/api/Send.php'
      const res = await axios.post(
        GOSMSGATEWAY_URL[goSMSsetup.stage] + '/Send.php?' + querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Send Message Simple GoSMSGateway:::ERROR:' +
          JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async sendingMessagesGroup(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewaySendSMSGroupRequest,
  ): Promise<any> {
    Logger.log(
      'Send Messages Group GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        username: goSMSsetup.username,
        group: dto.groupName,
        auth: md5(goSMSsetup.username + goSMSsetup.password),
        message: dto.message,
      });

      //url:'http://api.gosmsgateway.net/api/SendSMSGroup.php'
      const res = await axios.post(
        GOSMSGATEWAY_URL[goSMSsetup.stage] + '/SendSMSGroup.php?' + querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Send Message Group GoSMSGateway:::ERROR:' +
          JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  /*
    ----------------SENDING MESSAGE SERVICES END----------------
  */

  /*
    ----------------GROUP SERVICES START----------------
  */
  async addGroup(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewayAddGroupRequest,
  ): Promise<any> {
    Logger.log(
      'Add Group GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        username: goSMSsetup.username,
        group: dto.groupName,
        auth: md5(dto.groupName + goSMSsetup.password),
      });

      //url:'http://api.gosmsgateway.net/api/groupAdd.php?'
      const res = await axios.post(
        GOSMSGATEWAY_URL[goSMSsetup.stage] + '/groupAdd.php?' + querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Add Group GoSMSGateway:::ERROR:' + JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async editGroup(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewayEditGroupRequest,
  ): Promise<any> {
    Logger.log(
      'Edit Group GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        id: dto.groupId,
        username: goSMSsetup.username,
        group: dto.groupName,
        auth: md5(dto.groupId + goSMSsetup.password),
      });

      //url:'http://api.gosmsgateway.net/api/groupEdit.php?'
      const res = await axios.post(
        GOSMSGATEWAY_URL[goSMSsetup.stage] + '/groupEdit.php?' + querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Edit Group GoSMSGateway:::ERROR:' + JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async deleteGroup(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewayDeleteGroupRequest,
  ): Promise<any> {
    Logger.log(
      'Delete Group GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        id: dto.groupId,
        username: goSMSsetup.username,
        auth: md5(dto.groupId + goSMSsetup.password),
      });

      //url:'http://api.gosmsgateway.net/api/groupDelete.php?'
      const res = await axios.delete(
        GOSMSGATEWAY_URL[goSMSsetup.stage] + '/groupDelete.php?' + querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Delete Group GoSMSGateway:::ERROR:' + JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async listGroup(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewayListGroupRequest,
  ): Promise<any> {
    Logger.log(
      'List Group GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        page: dto.page,
        size: dto.size,
        username: goSMSsetup.username,
        auth: md5(goSMSsetup.username + goSMSsetup.password),
      });

      //url:'http://api.gosmsgateway.net/api/groupGetList.php?'
      const res = await axios.get(
        GOSMSGATEWAY_URL[goSMSsetup.stage] + '/groupGetList.php?' + querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'List Group GoSMSGateway:::ERROR:' + JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async searchGroup(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewaySearchGroupRequest,
  ): Promise<any> {
    Logger.log(
      'Search Group GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        group: dto.groupName,
        username: goSMSsetup.username,
        auth: md5(goSMSsetup.username + goSMSsetup.password),
      });

      //url:'http://api.gosmsgateway.net/api/groupFindName.php?'
      const res = await axios.get(
        GOSMSGATEWAY_URL[goSMSsetup.stage] +
          '/groupFindName.php?' +
          querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Search Group GoSMSGateway:::ERROR:' + JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  /*
  ----------------GROUP SERVICES END----------------
  */

  /*
  ----------------PHONEBOOK SERVICES START----------------
  */

  async addPhonebook(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewayAddPhonebookRequest,
  ): Promise<any> {
    Logger.log(
      'Add Phonebook GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        name: dto.name,
        mobile: dto.phoneNumber,
        group: dto.group,
        address: dto.address,
        birth: dto.birth,
        desc: dto.desc,
        username: goSMSsetup.username,
        auth: md5(dto.phoneNumber + goSMSsetup.password),
      });

      //url:'http://api.gosmsgateway.net/api/phbkAdd.php'
      const res = await axios.post(
        GOSMSGATEWAY_URL[goSMSsetup.stage] + '/phbkAdd.php?' + querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Add Phonebook GoSMSGateway:::ERROR:' + JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async editPhonebook(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewayUpdatePhonebookRequest,
  ): Promise<any> {
    Logger.log(
      'Update Phonebook GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        id: dto.phonebookId,
        name: dto.name,
        mobile: dto.phoneNumber,
        group: dto.group,
        address: dto.address,
        birth: dto.birth,
        desc: dto.desc,
        username: goSMSsetup.username,
        auth: md5(dto.phonebookId + goSMSsetup.password),
      });

      //url:'http://api.gosmsgateway.net/api/phbkAdd.php'
      const res = await axios.post(
        GOSMSGATEWAY_URL[goSMSsetup.stage] + '/phbkAdd.php?' + querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Update Phonebook GoSMSGateway:::ERROR:' + JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async deletePhonebook(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewayDeletePhonebookRequest,
  ): Promise<any> {
    Logger.log(
      'Delete Phonebook GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        id: dto.phonebookId,
        username: goSMSsetup.username,
        auth: md5(dto.phonebookId + goSMSsetup.password),
      });

      //url:'http://api.gosmsgateway.net/api/phbkDelete.php'
      const res = await axios.delete(
        GOSMSGATEWAY_URL[goSMSsetup.stage] + '/phbkDelete.php?' + querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Delete Phonebook GoSMSGateway:::ERROR:' + JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async listPhonebook(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewayListGroupRequest,
  ): Promise<any> {
    Logger.log(
      'List Phonebook GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      let querystring;

      if (dto.groupName) {
        querystring = qs.stringify({
          page: dto.page,
          size: dto.size,
          group: dto.groupName,
          username: goSMSsetup.username,
          auth: md5(goSMSsetup.username + goSMSsetup.password),
        });

        //url:'http://api.gosmsgateway.net/api/phbkGetListbyGroup.php'
        const res = await axios.get(
          GOSMSGATEWAY_URL[goSMSsetup.stage] +
            '/phbkGetListbyGroup.php?' +
            querystring,
        );
        return res;
      } else {
        querystring = qs.stringify({
          page: dto.page,
          size: dto.size,
          username: goSMSsetup.username,
          auth: md5(goSMSsetup.username + goSMSsetup.password),
        });

        //url:'http://api.gosmsgateway.net/api/phbkGetList.php'
        const res = await axios.get(
          GOSMSGATEWAY_URL[goSMSsetup.stage] +
            '/phbkGetList.php?' +
            querystring,
        );
        return res;
      }
    } catch (err) {
      Logger.error(
        'List Phonebook GoSMSGateway:::ERROR:' + JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async getCompleteData(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewayDeletePhonebookRequest,
  ): Promise<any> {
    Logger.log(
      'Complete Data Phonebook GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        id: dto.phonebookId,
        username: goSMSsetup.username,
        auth: md5(goSMSsetup.username + goSMSsetup.password),
      });

      //url:'http://api.gosmsgateway.net/api/phbkGetCompleteData.php'
      const res = await axios.get(
        GOSMSGATEWAY_URL[goSMSsetup.stage] +
          '/phbkGetCompleteData.php?' +
          querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Complete Data Phonebook GoSMSGateway:::ERROR:' +
          JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async phonebookFindName(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewayFindNamePhonebookRequest,
  ): Promise<any> {
    Logger.log(
      'Phonebook Find Name GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        name: dto.name,
        username: goSMSsetup.username,
        auth: md5(goSMSsetup.username + goSMSsetup.password),
      });

      //url:'http://api.gosmsgateway.net/api/phbkFindName.php'
      const res = await axios.get(
        GOSMSGATEWAY_URL[goSMSsetup.stage] + '/phbkFindName.php?' + querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Phonebook Find Name GoSMSGateway:::ERROR:' +
          JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }

  async phonebookFindPhoneNumber(
    goSMSsetup: GoSMSGatewayOptions,
    dto: GoSMSGatewayFindPhoneNumberPhonebookRequest,
  ): Promise<any> {
    Logger.log(
      'Phonebook Find PhoneNumber GoSMSGateway::: dto: ' + JSON.stringify(dto),
      'goSMSgateways.service',
    );

    try {
      const querystring = qs.stringify({
        number: dto.phoneNumber,
        username: goSMSsetup.username,
        auth: md5(goSMSsetup.username + goSMSsetup.password),
      });

      //url:'http://api.gosmsgateway.net/api/phbkFindPhNumber.php'
      const res: {
        data;
      } = await axios.get(
        GOSMSGATEWAY_URL[goSMSsetup.stage] +
          '/phbkFindPhNumber.php?' +
          querystring,
      );

      return res;
    } catch (err) {
      Logger.error(
        'Phonebook Find Phone Number GoSMSGateway:::ERROR:' +
          JSON.stringify(err.response),
        'GoSMSGateway.service',
      );
      return Promise.reject({ ...err, service: 'GOSMSGATEWAY' });
    }
  }
  /*
  ----------------PHONEBOOK SERVICES END----------------
  */
}
