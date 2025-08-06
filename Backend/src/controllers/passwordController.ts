//KÜTÜPHANE
import { Response } from "express";
import { encrypt, decrypt } from "../utils/crypto";

//TYPES
import { AuthRequest } from "../types/types";

//MODELS
import PasswordItem from "../models/PasswordItem";

export const getPasswords = async (req: AuthRequest, res: Response) => {
  try {
    const passwords = await PasswordItem.find({ user: req.user?._id });
    const decryptedPasswords = passwords.map((item) => ({
      ...item.toObject(),
      password: decrypt(item.encryptedPassword),
    }));
    res.json(decryptedPasswords);
  } catch (error) {
    console.error("Şifreler getirilirken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası: Şifreler getirilemedi." });
  }
};

export const createPassword = async (req: AuthRequest, res: Response) => {
  const { service, username, password } = req.body;
  try {
    if (!service || !username || !password) {
      return res.status(400).json({
        message: "Lütfen tüm alanları doldurun (servis, kullanıcı adı, şifre).",
      });
    }

    const encryptedPassword = encrypt(password);
    const newPasswordItem = await PasswordItem.create({
      user: req.user?._id,
      service,
      username,
      encryptedPassword,
    });
    res.status(201).json(newPasswordItem);
  } catch (error) {
    console.error("Şifre kaydedilirken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası: Şifre kaydedilemedi." });
  }
};

export const updatePassword = async (req: AuthRequest, res: Response) => {
  const { service, username, password } = req.body;
  try {
    const item = await PasswordItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Şifre bulunamadı." });
    }

    if (item.user?.toString() !== req.user?._id?.toString()) {
      return res
        .status(403)
        .json({ message: "Bu şifreyi güncelleme yetkiniz yok." });
    }

    item.service = service || item.service;
    item.username = username || item.username;
    if (password) {
      item.encryptedPassword = encrypt(password);
    }
    await item.save();
    res.json(item);
  } catch (error) {
    console.error("Şifre güncellenirken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası: Şifre güncellenemedi." });
  }
};

export const deletePassword = async (req: AuthRequest, res: Response) => {
  try {
    const item = await PasswordItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Şifre bulunamadı." });
    }

    // Kullanıcının kendi şifresini sildiğinden emin ol
    if (item.user?.toString() !== req.user?._id?.toString()) {
      return res
        .status(403)
        .json({ message: "Bu şifreyi silme yetkiniz yok." });
    }

    await item.deleteOne();
    res.json({ message: "Şifre başarıyla silindi." });
  } catch (error) {
    console.error("Şifre silinirken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası: Şifre silinemedi." });
  }
};
