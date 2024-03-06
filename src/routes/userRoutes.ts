import { Router } from "express";
import {
  createUser,
  deleteUser,
  getProfile,
  getUsers,
} from "../controllers/userController";
import { validateUserFields } from "../middlewares/usersMiddleware";
import isAuthenticated from "../middlewares/authMiddleware";
const router: Router = Router();

router.get("/", getUsers).post("/", validateUserFields, createUser);

router.delete("/:id", deleteUser);

router.get("/profile", isAuthenticated, getProfile);

export default router;
