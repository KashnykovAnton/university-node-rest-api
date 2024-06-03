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
import { checkResult } from "../helpers/errorHelpers.js";
import sendEmail from "../helpers/sendEmail.js";
import createEmailBody from "../helpers/createEmailBody.js";

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

  createEmailBody(email, verificationToken);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await authService.findUser({ verificationToken });
  checkResult(user);
  await authService.updateUser(
    { _id: user._id },
    { verify: true, verificationToken: " " }
  );
  res.json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await authService.findUser({ email });
  checkResult(user);
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  createEmailBody(email, user.verificationToken);
  res.json({ message: "Verification email sent" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "You should verify your email before login");
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
  verifyEmail: controllerWrapper(verifyEmail),
  resendVerifyEmail: controllerWrapper(resendVerifyEmail),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  getCurrent: controllerWrapper(getCurrent),
  updateSubscription: controllerWrapper(updateSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
};
