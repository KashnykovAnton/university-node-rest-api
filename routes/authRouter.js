import express from "express";
import authControllers from "../controllers/authControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import {
  authSchema,
  updateSubscriptionSchema,
  authEmailSchema,
} from "../schemas/authShemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(authSchema),
  authControllers.register
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authSchema),
  authControllers.login
);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  authControllers.updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

authRouter.get("/verify/:verificationToken", authControllers.verifyEmail);

authRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(authEmailSchema),
  authControllers.resendVerifyEmail
);

export default authRouter;
