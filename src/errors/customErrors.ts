export const customErrors = {
  //400
  BAD_REQUEST_NO_DATA: {
    message: "Data is not present"
  },

  BAD_REQUEST_NO_ROLE_ID: {
    message: "Role id is not present"
  },
  BAD_REQUEST_NO_TELEGRAM_ID: {
    message: "Telegram id is not present, in header"
  },
  //404
  NOT_FOUND: {
    message: "Record not found"
  },

  //403

  FORBIDDEN: {
    message: "user does not have access rights"
  }
};