export const customErrors = {
  //400
  BAD_REQUEST_NO_DATA: {
    message: "Data is not present"
  },

  BAD_REQUEST_NO_ROLE_ID: {
    message: "Role ID is not present"
  },
  BAD_REQUEST_NO_TELEGRAM_ID: {
    messageHeader: "Telegram ID is not present, in header (X-User-id)",
    messageParams: "Telegram ID is not present"
  },
  BAD_REQUEST_TYPE_ID_NO_NUMBER: {
    message: "id type must be a number"
  },
  //404
  NOT_FOUND: {
    message: "Record not found"
  },

  //403

  FORBIDDEN: {
    message: "user does not have access rights"
  },


};