//KÜTÜPHANE
import express from "express";

//MIDDLEWARE
import { authMiddleware } from "../middleware/authMiddleware";

//CONTROLLER
import {
  getPasswords,
  createPassword,
  updatePassword,
  deletePassword,
} from "../controllers/passwordController";

const router = express.Router();

router.get("/", authMiddleware, getPasswords);

router.post("/", authMiddleware, createPassword);

router.put("/:id", authMiddleware, updatePassword);

router.delete("/:id", authMiddleware, deletePassword);

export default router;
