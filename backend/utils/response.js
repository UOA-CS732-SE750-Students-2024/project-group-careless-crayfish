const CODE = {
  SUCCESS: 20000,
  NOT_FOUND: 40400,
  BAD_REQUEST: 40000,
  INTERNAL_SERVER_ERROR: 50000,
};
const getJSON = (code, messsage, data) => {
  return {
    code: code,
    message: messsage,
    data: data,
  };
};
class Responee {
  static success(data = null, message = "success") {
    return getJSON(CODE.SUCCESS, message, data);
  }
  static notFound(data = null, message = "not found") {
    return getJSON(CODE.NOT_FOUND, message, data);
  }
  static internalServerError(data = null, message = "internal server error") {
    return getJSON(CODE.INTERNAL_SERVER_ERROR, message, data);
  }
  static error(data = null, message = "error") {
    return getJSON(CODE.BAD_REQUEST, message, data);
  }
}

module.exports = Responee;
