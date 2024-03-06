import jwt from "jsonwebtoken";
const JWT_SECRET: string = process.env.JWT_SECRET || "jwtsignsecret";
const generateJWT = (id: number) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default generateJWT;
