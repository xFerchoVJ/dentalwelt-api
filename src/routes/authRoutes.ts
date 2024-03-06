import { Router } from "express";
import { login } from "../controllers/authController";
import { validateUserFields } from "../middlewares/usersMiddleware";
const router: Router = Router();

router.post("/login", validateUserFields, login);

export default router;
