//KÜTÜPHANELER
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//MODELS
import User from "../models/User";

const generateToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ message: "Şifreniz en az 6 karakter olmalıdır." });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res
        .status(400)
        .json({ message: "Lütfen geçerli bir e-posta adresi girin." });
      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res
        .status(400)
        .json({ message: "Bu e-posta adresi zaten kullanılıyor." });
      return;
    }

    const user = await User.create({ email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id as mongoose.Types.ObjectId),
      });
    } else {
      res.status(400).json({ message: "Geçersiz kullanıcı verisi." });
    }
  } catch (error) {
    console.error("Kayıt işlemi hatası:", error);
    res.status(500).json({ message: "Sunucu hatası: Kayıt işlemi başarısız." });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id as mongoose.Types.ObjectId),
      });
    } else {
      res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }
  } catch (error) {
    console.error("Giriş işlemi hatası:", error);
    res.status(500).json({ message: "Sunucu hatası: Giriş işlemi başarısız." });
  }
};
