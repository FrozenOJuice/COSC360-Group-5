import express from "express";
import { login, logout, me, refresh, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateBody } from "../middleware/validateBody.js";
import { loginSchema, registerSchema } from "../validators/authSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", requireAuth, logout);
authRouter.get("/me", requireAuth, me);

export default authRouter;
