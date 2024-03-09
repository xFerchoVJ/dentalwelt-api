import { Request, Response } from "express";
import prismadb from "../lib/prismadb";
import { handleServerError } from "../helpers/errorHelper";
import { PromotionInterface } from "../models/Promotion";
import { deleteImage, uploadImage } from "../libs/cloudinary";
import fs from "fs-extra";
const getPromotions = async (req: Request, res: Response): Promise<void> => {
  try {
    const promotions: PromotionInterface[] = await prismadb.promotion.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    res.json(promotions);
  } catch (error) {
    handleServerError(res, error);
  }
};

const createPromotion = async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || title == "") {
    res.status(400).json({ error: "El titulo es obligatorio." });
    return;
  }

  if (!req.files || !req.files.image) {
    res.status(400).json({ error: "La imagen es obligatoria." });
    return;
  }
  try {
    const tempFilePath = Array.isArray(req.files.image)
      ? req.files.image[0].tempFilePath
      : req.files.image.tempFilePath;
    const result = await uploadImage(tempFilePath);
    const promotion: PromotionInterface = await prismadb.promotion.create({
      data: {
        title,
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
    });
    await fs.unlink(tempFilePath);
    res.json(promotion);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deletePromotion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existsPromotion: PromotionInterface | null =
      await prismadb.promotion.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    if (!existsPromotion) {
      res.status(404).json({ error: "No existe la promoción." });
      return;
    }
    await deleteImage(existsPromotion.public_id);
    await prismadb.promotion.delete({
      where: {
        id: existsPromotion.id,
      },
    });
    res.status(200).json({ msg: "Promoción eliminada correctamente." });
  } catch (error) {
    handleServerError(res, error);
  }
};
export { getPromotions, createPromotion, deletePromotion };
