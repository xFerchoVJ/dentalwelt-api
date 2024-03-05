import { Router } from "express";
import { createUser, deleteUser, getUsers } from "../controllers/userController";
import { validateUserFields } from "../middlewares/usersMiddleware";
const router: Router = Router();

router
  .get('/', getUsers)
  .post('/', validateUserFields, createUser);

router
  .delete('/:id', deleteUser)

export default router;