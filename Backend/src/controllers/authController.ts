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

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "Bu e-posta adresi zaten kullanılıyor." });
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
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id as mongoose.Types.ObjectId),
      });
    } else {
      res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
