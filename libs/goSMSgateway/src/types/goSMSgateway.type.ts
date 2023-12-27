export type GoSMSGatewayOptions = {
  stage: 'development' | 'staging' | 'production' | string;
  username: string; //our username
  password: string; //our password
};

//-----------------SEND SMS TYPE-----------------

export type GoSMSGatewaySendSMSSecureRequest = {
  /*
    Destination mobile number ,
    Indonesian (08xxxxx) or
    international (628xxxx) format.
  */
  phoneNumber: string;
  /*
    Text Message (encoded, max 5000 chars)
  */
  message: string;
  /*
    Client TrxID, used to avoid duplicate sms (Optional, max 50 char, type string)
    example: sms0000000001
  */
  trxId: string;
};

export type GoSMSGatewaySendSMSSimpleRequest = {
  /*
    Destination mobile number ,
    Indonesian (08xxxxx) or
    international (628xxxx) format.
  */
  phoneNumber: string;
  /*
    Text Message (encoded, max 5000 chars)
  */
  message: string;
};

export type GoSMSGatewaySendSMSGroupRequest = {
  /*
    Group name (encoded)
    example: GROUPA
  */
  groupName: string;
  /*
    Text Message (encoded, max 5000 chars)
  */
  message: string;
};

//-----------------GROUP TYPE-----------------

export type GoSMSGatewayAddGroupRequest = {
  /*
    Group name (encoded)
    example: GROUPA
  */
  groupName: string;
};

export type GoSMSGatewayEditGroupRequest = {
  /*
    Group ID
    di dapatkan dari list of group
  */
  groupId: string;
  /*
    new Group name (encoded)
    example: GROUPA
  */
  groupName: string;
};

export type GoSMSGatewayDeleteGroupRequest = {
  /*
    Group ID
    di dapatkan dari list of group
  */
  groupId: string;
};

export type GoSMSGatewayListGroupRequest = {
  /*
    Page Page number
  */
  page: number;
  /*
    size / limit per Page
  */
  size: number;

  /*
    group is optional if you want to search by group name
  */
  groupName: string;
};

export type GoSMSGatewaySearchGroupRequest = {
  /*
    group name to be search
  */
  groupName: string;
};

//-----------------PHONEBOOK TYPE-----------------

export type GoSMSGatewayAddPhonebookRequest = {
  /*
    contact name
  */
  name: string;

  /*
    contact phone number
  */
  phoneNumber: string;

  /*
    contact group
  */
  group: string;

  address?: string;

  birth?: string; //YYYYMMDD

  desc?: string;
};

export type GoSMSGatewayUpdatePhonebookRequest = {
  /*
    phonebook Id
  */
  phonebookId: string;

  /*
    contact name
  */
  name?: string;

  /*
    contact phone number
  */
  phoneNumber?: string;

  /*
    contact group
  */
  group?: string;

  address?: string;

  birth?: string; //YYYYMMDD

  desc?: string;
};

export type GoSMSGatewayDeletePhonebookRequest = {
  /*
    phonebook Id
  */
  phonebookId: string;
};

export type GoSMSGatewayFindNamePhonebookRequest = {
  /*
    name to be search
  */
  name: string;
};

export type GoSMSGatewayFindPhoneNumberPhonebookRequest = {
  /*
    number to be search
  */
  phoneNumber: string;
};
