import authService from "../services/authServices.js";
import { HttpError, checkResult } from "../helpers/helpers.js";
import { compareHash } from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";
import controllerWrapper from "../decorators/controllerWrapper.js";

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await authService.findUser({ email });
  if (user) {
    throw HttpError(409, "Email already exists");
  }
  const newUser = await authService.saveUser(req.body);

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is invalid");
  }
  const comparePassword = await compareHash(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is invalid");
  }

  const { _id: id } = user;
  const payload = { id };

  const token = createToken(payload);
  res.json({ token });
};

export default {
  signup: controllerWrapper(signup),
  signin: controllerWrapper(signin),
};
