const messageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
}

export const HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

export const checkResult = (result) => {
    if (!result) {
      throw HttpError(404, `Not found`);
    }
  };
