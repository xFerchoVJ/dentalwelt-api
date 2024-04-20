import { Router } from "express";
import {
  createPromotion,
  deletePromotion,
  getPromotions,
  getPromotionsActive,
  updatePromotion,
} from "../controllers/promotionController";
import isAuthenticated from "../middlewares/authMiddleware";
import fileUpload from "express-fileupload";
const router: Router = Router();

router.get("/", getPromotions);
router.get("/show", getPromotionsActive);

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
router.put(
  "/:id",
  isAuthenticated,
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./storage",
  }),
  updatePromotion
);

export default router;
