import { isValidObjectId } from "mongoose";

import { HttpError } from "../helpers/errorHelpers.js";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `${id} is not valid id`));
  }
  next();
};

export default isValidId;
