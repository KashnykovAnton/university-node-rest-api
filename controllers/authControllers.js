import { nanoid } from "nanoid";
import authService from "../services/authServices.js";
import { HttpError } from "../helpers/errorHelpers.js";
import { compareHash } from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";
import controllerWrapper from "../decorators/controllerWrapper.js";
import authServices from "../services/authServices.js";
import {
  createLocalAvatarUrl,
  createRemoteAvatarUrl,
} from "../helpers/avatarHelpers.js";
import sendEmail from "../helpers/sendEmail.js";

const register = async (req, res) => {
  const { email } = req.body;
  const user = await authService.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const url = createRemoteAvatarUrl(email);
  const verificationToken = nanoid();
  const newUser = await authService.saveUser({
    ...req.body,
    avatarURL: url,
    verificationToken,
  });

  const verificationUrl = `http://localhost:3000/api/users/verify/${verificationToken}`;

  const emailMsg = {
    to: email,
    subject: "Please verify your email",
    text: `Click here to verify your email: ${verificationUrl}`,
    html: `<p>Please <a href="${verificationUrl}">click here</a> to verify your email.</p>`,
  };

  await sendEmail(emailMsg);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await compareHash(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const payload = { id };

  const token = createToken(payload);
  await authServices.updateUser({ _id: id }, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await authService.updateUser({ _id }, { token: null });
  res.status(204).json();
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const subscription = req.body;
  const result = await authService.updateUser({ _id }, subscription);
  if (!result) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(result);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = await createLocalAvatarUrl(req.file);
  const result = await authService.updateUser({ _id }, { avatarURL });
  if (!result) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ avatarURL });
};

export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  getCurrent: controllerWrapper(getCurrent),
  updateSubscription: controllerWrapper(updateSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
};
