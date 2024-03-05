import { Response, Router } from "express";
const router: Router = Router();

router.get('/', (_, res: Response) => {
  res.json({ msg: "Getting data.." })
});


export default router;