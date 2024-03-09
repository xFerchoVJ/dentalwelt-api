import { Router } from "express";
import {
  createPromotion,
  deletePromotion,
  getPromotions,
} from "../controllers/promotionController";
import isAuthenticated from "../middlewares/authMiddleware";
import fileUpload from "express-fileupload";
const router: Router = Router();

router.get("/", getPromotions);
router.post(
  "/",
  isAuthenticated,
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./storage",
  }),
  createPromotion
);

router.delete("/:id", isAuthenticated, deletePromotion);

export default router;
