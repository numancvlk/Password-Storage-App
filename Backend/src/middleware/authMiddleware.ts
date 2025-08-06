//KÜTÜPHANE
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//MODELS
import User from "../models/User";

//TYPES
import { AuthRequest } from "../types/types";

interface DecodedToken {
  id: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken;

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "Kullanıcı bulunamadı." });
      }
      req.user = user;
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Geçersiz token. Lütfen tekrar giriş yapın." });
    }
  }

  if (!token) {
    res
      .status(401)
      .json({ message: "Yetkilendirme tokenı yok. Lütfen giriş yapın." });
  }
};
