import express from "express";
import authControllers from "../controllers/authControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import { authSchema } from "../schemas/authShemas.js";
import authenticate from "../middlewares/authenticate.js";

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

export default authRouter;
