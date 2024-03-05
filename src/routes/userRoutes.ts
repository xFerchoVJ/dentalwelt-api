import { Request, Response, Router } from "express";
import prismadb from "../lib/prismadb";
const router: Router = Router();

router.get('/', async (_, res: Response) => {
  const users = await prismadb.user.findMany();
  res.json({ users })
});

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    const user = await prismadb.user.findFirst({
      where: {
        email
      }
    });

    if (user) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const newUser = await prismadb.user.create({
      data: {
        email,
        password
      }
    })

    res.json({ msg: "Usuario creado.", newUser })
  } catch (error) {
    console.log(error);
    const errors = new Error('Error al crear usuario.');
    return res.status(500).json({ errors })
  }

});


export default router;